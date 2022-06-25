const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    // include the associated products
    include: [{
      model: Product,
      as: 'products',
    }],
  })
  .then((categories) => res.json(categories))
  .catch((err) => res.status(500).json({ error: err.message }));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [{
      model: Product,
      as: 'products',
    }],
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    } else {
    res.json(dbCategoryData)
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
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
