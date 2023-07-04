const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require('../utils/cloudinary');

const getAll = catchError(async (req, res) => {
  const result = await ProductImg.findAll();
  return res.json(result);
});

const create = catchError(async (req, res) => {
  const { path, filename } = req.file;
  const { url, public_id } = await uploadToCloudinary(path, filename);
  const body = { url, filename: public_id };
  const image = await ProductImg.create(body);
  return res.status(201).json(image);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const image = await ProductImg.findByPk(id);
  if (!image) return res.sendStatus(404);
  await deleteFromCloudinary(image.filename);
  await image.destroy();
  return res.sendStatus(204);
});
module.exports = {
  getAll,
  create,
  remove,
};
