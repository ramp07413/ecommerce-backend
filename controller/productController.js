import { Category } from "../model/categories.js";
import { productDetails } from "../model/productModel.js";
import { ErrorHandler } from "../utils/Errorhandler.js";

export const addProduct = async (req, res, next) => {
  const userId = req.user._id
  const { name, shopName, price, category, itemTag, shippingTag } = req.body || {};
  try {
    if ((!name || !shopName || !price || !category || !itemTag || !shippingTag)) {
        return next(new ErrorHandler("please fill all the fields !", 400))
    }
    const data = await productDetails.create({
      name,
      shopName,
      price,
      category,
      itemTag,
      shippingTag,
      userId
    });

    res.status(201).send({
      success: true,
      message: "product added successfully ! ",
      data: data,
    });
  } catch (err) {
    return next(new ErrorHandler("internal server error !", 500));
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const data = await productDetails.find();
    if(!data){
      return next(new ErrorHandler("product not found !", 404))
    }
    res.status(200).send({
      success: true,
      results : data.length,
      data: data,
    });
  } catch (err) {
    return next(new ErrorHandler("internal server error !", 500));
  }
};


export const getProductByCategory = async (req, res, next) => {
  try {
    const {categoryId} = req.params;
    const data = await productDetails.find({category : categoryId}).populate("category")
    if(data.length === 0){
      return next(new ErrorHandler("no product available", 404))
    }
    res.status(200).send({
      success: true,
      data: data
    });
  } catch (err) {
    return next(new ErrorHandler("internal server error !", 500));
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
        return next(new ErrorHandler("product not found !", 404))
      }

      res.status(200).send({
        success : true,
        message : "product updated successfully !",
        data
      })

  }
  catch(err){
    return next(new ErrorHandler(`${err._message}`, 500))

  }
}

export const deleteProduct = async (req, res, next)=>{
  try{
      const {id} = req.params;
    
      const data = await productDetails.findByIdAndDelete(id)

      if(!data){
        return next(new ErrorHandler("product not found !", 404))
      }


      res.status(200).send({
        success : true,
        message : "product deleted successfully !",
 
      })

  }
  catch(err){
    return next(new ErrorHandler(`${err._message}`, 500))

  }
}

export const filterProduct = async (req, res, next)=>{
  try{

  const {name , shopName, category, price, min, max , itemTag, shippingTag, sort} = req.query;

  if( !name  && !shopName && !category && !price && !min && !max  && !itemTag && !shippingTag && !sort){
    return next(new ErrorHandler("user query to get data !", 400))
  }

  let filter = {}

  

  if(name?.trim()) filter.name = {$regex : name, $options : "i"}
  if(shopName?.trim()) filter.shopName = {$regex : shopName, $options : "i"}
  if(min?.trim() && max?.trim()) filter.price  = {$gte : min , $lte : max}
  if(category?.trim()){
    let catDoc = await Category.findOne({
      $or : [{type : category}, {name: category}]
    })
  
  if(catDoc){
    filter.category = catDoc._id
  }
}

  let query =  productDetails.find(filter).populate("category")
 
  if(sort?.trim() === "latest"){
    query = query.sort({createdAt : -1})
  }
  else if(sort?.trim() === "priceLowToHigh"){
    query = query.sort({price : 1})
  }
  else if(sort?.trim() === "priceHighToLow"){
    query = query.sort({price : -1})
  }

const products = await query

res.send({
  success : true,
  results : products.length,
  products
})
  }
catch(err){
    return next(new ErrorHandler(`${err._message}`, 500))

  }

}