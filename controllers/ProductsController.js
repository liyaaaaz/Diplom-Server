import Product from "../models/Products.js";

export const getAllProducts = async (req, res) => {
  try {
    const prod = await Product.find({});
    res.status(200).json({ prod });
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
      category,
      description,
      manufacturer,
    } = req.body;
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(productId, {
      name: name,
      price: price,
      pictures: pictures,
      category: category,
      description: description,
      manufacturer: manufacturer,   
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
        category,
        description,
        manufacturer,
    } = req.body;

    const prod = await Product.create({
        name,
        price,
        pictures,
        category,
        description,
        manufacturer,
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

// export const likeCloth = async (req, res) => {
//   try {
//     const user = req.user;
//     const clothId = req.params.id;

//     const cloth = await Cloth.findById(clothId);

//     const isLiked = user.likedClothes.some((likedCloth) =>
//       likedCloth.equals(cloth._id)
//     );

//     if (isLiked) {
//       user.likedClothes.pull(cloth._id);
//     } else {
//       user.likedClothes.push(cloth._id);
//     }

//     await user.save();
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };