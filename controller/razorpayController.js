import Razorpay from "razorpay";
import crypto from "crypto";
import { order } from "../model/orderModel.js";
import { ErrorHandler } from "../utils/Errorhandler.js";
import { Cart } from "../model/cartModel.js";
import { productDetails } from "../model/productModel.js";
import { user } from "../model/userModel.js";
import { notification } from "../model/notificationModel.js";
import { assignreward } from "./scratchCardController.js";

export const createRazorpayOrderAndVerify = async (req, res, next) => {
    try {
        let totalAmount = 0
        let discountedPrice = 0
        let walletamount = 0

        const userId = req.user._id;
        const usercart = await Cart.findOne({ userId })
        const { shippingAddress } = req.body

        if (!usercart || usercart.items.length == 0) {
            return next(new ErrorHandler("cart is empty !", 200))
        }

        const couponDiscount = usercart.couponDiscount

        if (!shippingAddress) {
            return next(new ErrorHandler("please fill all the fields", 400))
        }

        const finalOrderitem = []

        const userData = await user.findOne({ _id: userId })

        if (userData.isWalletApplied) {
            walletamount = userData.walletBalance
        }

        for (let item of usercart.items) {
            let product = await productDetails.findById(item.productId)
            if (!product) {
                return next(new ErrorHandler("product not found", 200))
            }

            totalAmount += product.price * item.quantity

            finalOrderitem.push({
                product: item.productId,
                quantity: item.quantity
            })
            discountedPrice = parseInt(totalAmount - (totalAmount * product.currentDiscount) / 100);
        }


        let finalAmount = discountedPrice - walletamount;

        if (couponDiscount != 0) {
            finalAmount = parseInt(finalAmount - finalAmount * couponDiscount / 100)
        }

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: finalAmount * 100, // amount in the smallest currency unit
            currency: "INR",
        };

        const razorpayOrder = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            order: razorpayOrder,
            finalOrderitem,
            shippingAddress,
            OrignalAmount: parseInt(totalAmount),
            productPrice: discountedPrice,
            finalAmount: parseInt(finalAmount),
            couponDiscount: couponDiscount,
            usedWalletAmount: walletamount,
        });

    }
    catch (err) {
        console.error(err)
        return next(new ErrorHandler(`${err._message}`, 500))
    }
}

export const verifyPaymentAndCreateOrder = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, finalOrderitem, shippingAddress, couponDiscount, usedWalletAmount } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            let totalAmount = 0;
            let discountedPrice = 0;

            for (let item of finalOrderitem) {
                let product = await productDetails.findById(item.product);
                if (!product) {
                    return next(new ErrorHandler(`Product not found: ${item.product}`, 404));
                }
                totalAmount += product.price * item.quantity;
                discountedPrice = parseInt(totalAmount - (totalAmount * product.currentDiscount) / 100);
            }

            let finalAmountRecalculated = discountedPrice - usedWalletAmount;

            if (couponDiscount != 0) {
                finalAmountRecalculated = parseInt(finalAmountRecalculated - finalAmountRecalculated * couponDiscount / 100);
            }

            const data = await order.create({
                user: req.user._id,
                orderItems: finalOrderitem,
                shippingAddress: shippingAddress,
                OrignalAmount: totalAmount, 
                productPrice: discountedPrice, 
                finalAmount: finalAmountRecalculated, 
                couponDiscount: couponDiscount,
                usedWalletAmount: usedWalletAmount,
                paymentStatus: "paid",
                shippingStatus: "processing",
                razorpayOrderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
            })

            console.log("Attempting to delete cart for user:", req.user._id);
            const cartDeletionResult = await Cart.findOneAndDelete({ userId: req.user._id });
            if (cartDeletionResult) {
                console.log("Cart deleted successfully for user:", req.user._id);
            } else {
                console.log("Cart not found or already deleted for user:", req.user._id);
            }

            await notification.create({
                user: req.user._id,
                title: "order created",
                message: "order confirmed !",
                type: "order"
            })

            if (usedWalletAmount != 0) {
                const userData = await user.findById(req.user._id);
                userData.walletBalance = 0
                userData.isWalletApplied = false
                await userData.save()
            }

            const scratch_card = await assignreward(req.user._id, data._id)

            res.status(201).json({
                success: true,
                message: "order confirmed !",
                data,
                scratch_card
            })
        } else {
            return next(new ErrorHandler("Payment verification failed", 400));
        }
    }
    catch (err) {
        console.error(err)
        return next(new ErrorHandler(`${err._message}`, 500))
    }
}