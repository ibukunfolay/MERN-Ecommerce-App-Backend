import express from "express";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.status(200).send(products);
});

router.post("/", isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });

  const newProduct = await product.save();
  {
    newProduct
      ? res.status(201).send({ msg: "new product added", data: newProduct })
      : res.status(401).send({ msg: "product creation failed" });
  }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({ _id: productId });
  if (product) {
    product.name = req.body.name;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;

    const updatedProduct = await product.save();

    if (updatedProduct) {
      return res
        .status(201)
        .send({ msg: " product updated", data: updatedProduct });
    }
  }
  return res.status(500).send({ msg: "product update failed" });
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    await product.remove();
    res.status(200).send({ msg: "product deleted" });
  } else {
    res.send({ msg: "error deleting product" });
  }
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    res.status(200).send(product);
  } else {
    res.send({ msg: "product not founds" });
  }
});

export default router;
