const Category = require("../Models/CategoryModel");

const CategoryCntrl = {
  addCategory: async (req, res) => {
    const { name } = req.body;
    try {
      const namee = await name.toLowerCase();

      // Category Existance check
      const Categoryexist = await Category.findOne({ catname: namee });
      // Category Name Can Not Be null
      if (!name) {
        res.status(422).json({ error: "Category Name Required" });
      } else if (Categoryexist) {
        res.status(422).json({ error: "Category Already exists" });
      }
      const newCategor = new Category({ catname: namee });
      console.log(newCategor);

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
};
module.exports = CategoryCntrl;
