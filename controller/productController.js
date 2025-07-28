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

    res.status(201).send({
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

export const updateProduct = async (req, res, next)=>{
  try{
      const {id} = req.params;
      const newdata = req.body
      const data = await productDetails.findByIdAndUpdate(id,newdata, {
        new : true
      } )

      if(!data){
        return next(new Error("product not found !"))
      }

      res.status(200).send({
        success : true,
        message : "product updated successfully !",
        data
      })

  }
  catch(err){
    return next(new Error("internal server error"))
  }
}

export const deleteProduct = async (req, res, next)=>{
  try{
      const {id} = req.params;
    
      const data = await productDetails.findByIdAndDelete(id)

      if(!data){
        return next(new Error("product not found !"))
      }


      res.status(200).send({
        success : true,
        message : "product deleted successfully !",
 
      })

  }
  catch(err){
    return next(new Error("internal server error"))
  }
}