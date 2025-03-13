const express = require("express");
const {
  createProduct,
  getProducts,
  searchProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductCount,
  getTotalProductCountAdmin
} = require("../controllers/productController");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// Public product routes - no authentication required
router.get("/count", getProductCount);
router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);

// Admin-only product count route
router.get("/admin/count", authenticate, getTotalProductCountAdmin);

// Protected routes for products - require authentication
router.post("/", authenticate, createProduct);
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);

module.exports = router;
