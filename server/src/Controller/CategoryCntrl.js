const Category = require("../Models/CategoryModel");

const CategoryCntrl = {
  addCategory: async (req, res) => {
    const { catname } = req.body;
    try {
      const catnamee = await catname.toLowerCase();

      // Category Existance check
      const Categoryexist = await Category.findOne({ catname: catnamee });
      // Category Name Can Not Be null
      if (!catname) {
        res.status(422).json({ error: "Category Name Required" });
      } else if (Categoryexist) {
        res.status(422).json({ error: "Category Already exists" });
      }
      const newCategor = new Category({ catname: catname });

      // Saving category
      const regUser = await newCategor.save();

      res.status(200).json(regUser);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getcategories: async (req, res) => {
    try {
      const categorie = await Category.find();
      res.status(200).json(categorie);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const Categ = await Category.findById(req.params.id);
      if (!Categ) {
        res.status(422).json({ error: "Category Not Found" });
      } else {
        await Categ.delete();
        res.status(200).json({ message: "Category Deleted Successfully" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateCategory: async(req, res)=> {
      try {
      const updateCategory = await Category.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      console.log(updateCategory);
      res.status(200).json({ message: "Category Updated Successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = CategoryCntrl;
