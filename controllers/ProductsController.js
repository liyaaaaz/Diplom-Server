import Products from "../models/Products.js";
import Product from "../models/Products.js";

export const getAllProducts = async (req, res) => {
  try {
    const prod = await Product.find({});
    res.status(200).json(prod);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editProducts = async (req, res) => {
  try {
    const {
      name,
      price,
      pictures,
      subcategory,
      description,
      manufacturer,
      discount,
    } = req.body;
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(productId, {
      name: name,
      price: price,
      pictures: pictures,
      subcategory: subcategory,
      description: description,
      manufacturer: manufacturer,
      discount: discount,
    });

    if (product) {
      return res.status(200).json({ message: "Товар изменен" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const newProducts = async (req, res) => {
  try {
    const {
      name,
      price,
      pictures,
      subcategory,
      description,
      manufacturer,
      discount,
    } = req.body;

    const prod = await Product.create({
      name,
      price,
      pictures,
      subcategory,
      description,
      manufacturer,
      discount,
    });

    if (prod) {
      res.status(201).json(req.body);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const { ids } = req.body;

    if (ids.length > 0) {
      const deleteResult = await Product.deleteMany({
        _id: { $in: ids.map((id) => id) },
      });
      console.log(`Удалено ${deleteResult.deletedCount} товара(-ов)`);
      res
        .status(200)
        .json({ message: `Удалено ${deleteResult.deletedCount} товара(-ов)` });
    } else {
      res.status(401).json({ message: "Нечего удалять" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const basketProduct = async (req, res) => {
  try {
    const user = req.user;
    const productId = req.params.id;

    const product = await Products.findById(productId);

    const isBasket = user.basketProduct.some((basketProduct) =>
      basketProduct.equals(product._id)
    );

    if (isBasket) {
      user.basketProduct.pull(product._id);
    } else {
      user.basketProduct.push(product._id);
    }

    await user.save();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
