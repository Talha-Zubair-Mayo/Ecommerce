const Products = require("../Models/ProductModel");

// Filter Sorting Pagination
class ApiFeatures {
  constructor(query, queryString) {
    (this.query = query), (this.queryString = queryString);
  }
  filtering() {
    const queryObj = { ...this.queryString }; //this.queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    this.query.find(JSON.parse(queryStr));
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const ProductCntrl = {
  getProduct: async (req, res) => {
    try {
      const features = new ApiFeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .pagination();

      const products = await features.query;
      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  },
  addProduct: async (req, res) => {
    const { product_Id, title, price, description, content, images, category } =
      req.body;
    try {
      if (
        !product_Id ||
        !title ||
        !price ||
        !description ||
        !content ||
        !category
      ) {
        return res.status(422).json({ error: "Please Fill all Feilds" });
      }
      if (!images) {
        return res.status(400).json({ error: "No image Were Uploaded" });
      }
      const productexist = await Products.findOne({ product_Id });
      if (productexist) {
        res.status(400).json({ error: "Product already Exist" });
      }
      const newProduct = await Products({
        product_Id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });

      await newProduct.save();
      return res.status(200).json({ msg: "Product added Successfully" });
    } catch (error) {}
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete({ _id: req.params.id });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  },
  updateProduct: async (req, res) => {
    const { product_Id, title, price, description, content, images, category } =
      req.body;
    try {
      if (!images) {
        res.status(400).json({ error: "No image Were Uploaded" });
      }
      await Products.findByIdAndUpdate(
        { _id: req.params.id },
        {
          product_Id,
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        },
        { new: true }
      );
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  },
  getsingleProduct: async (req, res) => {
    const product = await Products.findById(req.params.id);
    try {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ msg: "Product Not Found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ProductCntrl;
