import { productDetails } from "../model/productModel.js";

export const addProduct = async (req, res, next) => {
  const { name, shopName, price, category, itemTag, shippingTag } = req.body;
  try {
    if ((!name || !shopName || !price || !category || !itemTag || !shippingTag)) {
        return next(new Error("please fill all the fields !"))
    }
    const data = await productDetails.create({
      name,
      shopName,
      price,
      category,
      itemTag,
      shippingTag,
    });

    res.status(200).send({
      success: true,
      message: "product added successfully ! ",
      data: data,
    });
  } catch (err) {
    return next(new Error("internal server error !"));
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const data = await productDetails.find();
    res.status(200).send({
      success: true,
      data: data,
    });
  } catch (err) {
    return next(new Error("internal server error !"));
  }
};
