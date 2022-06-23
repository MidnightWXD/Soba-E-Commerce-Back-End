const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
      },
    ],
  })
  .then((dbCategoryData) => {
    // We want to transform the raw data from the database into the format we want to
    // send to the client.
    const categories = dbCategoryData.map((category) => {
      return {
        id: category.id,
        category_name: category.category_name,
        products: category.products.map((product) => {
          return {
            id: product.id,
            product_name: product.product_name,
            price: product.price,
            stock: product.stock,
          };
        }),
      };
    }
    )})
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
      },
    ],
  })
  .then((dbCategoryData) => {
    // We want to transform the raw data from the database into the format we want to
    // send to the client.
    const category = {
      id: dbCategoryData.id,
      category_name: dbCategoryData.category_name,
      products: dbCategoryData.products.map((product) => {
        return {
          id: product.id,
          product_name: product.product_name,
          price: product.price,
          stock: product.stock,
        };
      }),
    };
  })})
  .then((category) => {
    res.json(category);
  })
  .catch((err) => {
  res.status(500).json(err);
  });



router.post('/', (req, res) => {
  // create new category
  Category.create({
    category_name: req.body.category_name,
  })
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
  res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name,
  }, {
    where: {
      id: req.params.id,
    },
  })
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
  res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
  res.status(400).json(err);
  });
});

module.exports = router;
