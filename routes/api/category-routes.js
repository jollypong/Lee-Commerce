const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const getAllCategory = await Category.findAll({
      include: [
        Product
      ],
    });
    res.status(200).json(getAllCategory);
  } catch (err) {
    res.status(500).json(err);
  };
});

//get one category
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const getCategory = await Category.findByPk(req.params.id, {
      include: [
        Product,
      ],
    });
    res.status(200).json(getCategory);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(createCategory);
    console.log('Category Created Successfully!')
  } catch (err) {
    res.status(500).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, 
      {
        where: {
          id: req.params.id
        },
      }
    );
    res.status(200).json(categoryData);
    console.log('Category Updated Successfully!')
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id }
    });
    res.json(deleteCategory);
    console.log('Category Deleted Successfully!')
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
