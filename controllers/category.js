const Category  = require("../models/catagory")

exports.getCategoryById = (req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return res.status(400).json({
                error: "NO category found in db"
            })
        }
        req.category = cate;
        next();

     })
}

exports.createCategory = (req,res)=>{
    const category  = new Category(req.body);
    category.save((err,catagory)=>{
        if(err){
            return res.status(400).json({
                error: "not able to save category"
            });
        }
        res.json({catagory});
    })
}

exports.getCategory = (req,res)=>{
    console.log(req)
  return res.json(req.category);
}

exports.getAllCategory = (req,res)=>{
    Category.find().exec((err,items)=>{
        if(err){
            return res.status(400).json({
                error: "no category found"
            });
        }
        res.json(items);
    })
}

exports.updateCategory = (req,res)=>{
   const category = req.category;
   category.name =  req.body.name;
    category.save((err,updateCatagory)=>{
        if(err){
            return res.status(400).json({
                error: "not able to Update category"
            });
        }
        res.json({updateCatagory});
    })
}

exports.deleteCategory = (req,res)=>{
    const category = req.category;
     category.remove((err,category)=>{
         if(err){
             return res.status(400).json({
                 error: "not able to Delete category"
             });
         }
         res.json({
             message: "Successfully deleted"
         });
     })
 }
