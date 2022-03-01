const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getAllTag = await Tag.findAll({
      include: [
        { model: Product, through: ProductTag }
      ],
    });
    res.status(200).json(getAllTag);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getTag = await Tag.findByPk(req.params.id, {
      Product,
      through: ProductTag
    });
    res.status(200).json(getTag);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const TagData = await Tag.update(req.body,
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

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: { id: req.params.id }
    });
    res.json(deleteTag);
    console.log('Tag Deleted Successfully!')
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
