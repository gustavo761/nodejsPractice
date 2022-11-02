const express = require("express");
const router = express.Router();
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
} = require("../controllers/tracks");
const checkRol = require("../middleware/rol");

const { validatorCreateItem, validatorGetItem } = require("../validators/tracks");
const authMiddleware = require("../middleware/session");

// http://localhost/tracks (GET, POST, DELETE, PUT, PATCH)

router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, validatorGetItem, getItem);
router.post("/", authMiddleware, checkRol(["admin"]) , validatorCreateItem, createItem);
router.put("/:id", authMiddleware, validatorCreateItem, validatorGetItem, updateItem);
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;