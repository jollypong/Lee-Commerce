const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getAllTag = await Tag.findall({
      attributes: ['id', 'tag_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        through: ProductTag
      }],
    });
    res.status(200).json(getAllTag);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getTag = await Tag.findByPk(req.params.id, {
      attributes: ['id', 'Tag_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        through: ProductTag
      }],
    });
    res.status(200).json(getTag);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(createTag);
    console.log('Tag Created Successfully!')
  } catch (err) {
    res.status(500).json(err);
  };
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const TagData = await Tag.update(
      {
        include: [{ model: Product }],
        attributes: ['id', 'product_name', 'price', 'stock', 'tag_id'],
      },
      {
        where: {
          id: req.params.id
        },
      },
    );
    res.status(200).json(TagData);
    console.log('Tag Updated Successfully!')
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {id: req.params.id}
    });
    res.json(deleteTag);
    console.log('Tag Deleted Successfully!')
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
