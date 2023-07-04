const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Category = require('./../models/Category');
const ProductImg = require('../models/ProductImg');
require('./../models');

const getAll = catchError(async (req, res) => {
  const { ...queryParams } = req.query;
  const where = {};
  if (Object.keys(queryParams).length > 0) {
    Object.keys(queryParams).forEach((key) => {
      where[key] = {
        [Op.like]: `%${queryParams[key]}%`,
      };
    });
  }
  const results = await Product.findAll({
    include: [Category, { model: ProductImg, order: [['id', 'DESC']] }],
    where,
    order: [['id', 'DESC']],
  });
  return res.json(results);
});
const create = catchError(async (req, res) => {
  const result = await Product.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByPk(id, {
    include: [Category, { model: ProductImg, order: [['id', 'DESC']] }],
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Product.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setImages = catchError(async (req, res) => {
  const { id } = req.params;
  const imagesBody = req.body;
  const product = await Product.findByPk(id);
  await product.setProductImgs(imagesBody);
  const images = await product.getProductImgs();
  return res.json(images);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setImages,
};
