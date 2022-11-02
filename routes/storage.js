const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { createItem, deleteItem, getItem, getItems } = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");
// TODO http://localhost:3000/api/storage

/**
 * Lista de items
 */
router.get('/', getItems);
/**
 * Obtener un item
 */
router.get('/:id', validatorGetItem, getItem);
/**
 * Crear un item
 */
router.post('/', uploadMiddleware.single("myfile"), createItem);

/**
 * Eliminar un item
 */
router.delete('/:id', validatorGetItem, deleteItem);

module.exports = router;