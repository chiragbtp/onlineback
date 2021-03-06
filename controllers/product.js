const Product  = require("../models/product")
const formidable=  require("formidable")
const _ =require("lodash")
const fs = require("fs")
const { sortBy } = require("lodash")

exports.getProductById = (req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error: "NO product found in db"
            })
        }
        req.product = product;
        next();

     })
}

exports.createProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtension = true;

    form.parse(req, (err, fields, file)=>{

        if(err){
            return res.status(400).json({
                error: "problem with image"
            })
         }
         
        const {name,description,price,category,stock} =fields;
        if(!name || !description || !price || !category ||!stock){
            return res.status(400).json({
                error: "please include all fields"
            })
        }

         let product = new Product(fields)

         if(file.photo){
             if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "file size to big"
                })
             }

             product.photo.data = fs.readFileSync(file.photo.path);
             product.photo.contentType =file.photo.type
         }
         product.save((err, product)=>{
            if(err){
                return res.status(400).json({
                    error: "Saving product in db failed"
                })
             }
           res.json(product)  
         })
    })
}

exports.getProduct =(req,res)=>{
    req.product.photo = undefined

    return req.json(req.product)
}

exports.photo= (req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}


exports.updateProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtension = true;

    form.parse(req, (err, fields, file)=>{

        if(err){
            return res.status(400).json({
                error: "problem with image"
            })
         }
         

         let product = req.product
         product = _.extend(product,fields)

         if(file.photo){
             if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "file size to big"
                })
             }

             product.photo.data = fs.readFileSync(file.photo.path);
             product.photo.contentType =file.photo.type
         }
         product.save((err, product)=>{
            if(err){
                return res.status(400).json({
                    error: "updation product in db failed"
                })
             }
           res.json(product)  
         })
    })
 }
 
 exports.deleteProduct = (req,res)=>{
     const product = req.product;
     product.remove((err,product)=>{
          if(err){
              return res.status(400).json({
                  error: "not able to Delete product"
              });
          }
          res.json({
              message: "Successfully deleted"
          });
      })
  }
 

  exports.getAllproducts = (req,res)=>{
      let limit = req.query.limit ? parseInt( req.query.limit) : 8;
      let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error: "no category found"
            });
        }
        res.json(products);
    })
}

exports.updateStock = (req,res,next)=>{

    let myOperation = req.body.order.products.map(prod =>{
        return {
            updateOne:{
                filter:{_id:prod._id},
                update: {$inc:{stock:-prod.count,sold:+prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperation,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error: "bulk operation failed"
            })
        }
    })
    next();
}


exports.getAllUniqueCategory = (req,res)=>{
    Product.distinct("category",{},(err,cate)=>{
        if(err){
            return res.status(400).json({
                error: "NO category found"
            })
        }
        res.json(cate)
    })
}