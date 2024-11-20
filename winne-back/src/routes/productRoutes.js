const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const bestSellerController = require("../controllers/bestSellerController");

router.get("/best-sellers", bestSellerController.getBestSellers); 
router.post("/best-seller/create", bestSellerController.createBestSeller);
router.put("/best-seller/update/:id", bestSellerController.updateBestSeller);
router.delete("/best-seller/delete/:id", bestSellerController.deleteBestSeller);

router.get("/all", productController.getAllProducts);
router.post("/create", productController.createProduct);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.post("/update-stock/:id", productController.updateStock);
router.post("/increase-stock/:id", productController.increaseStock);
router.get("/paginated", productController.getPaginatedProducts);
router.get("/:slug", productController.getProductBySlug); 
router.get("/all/filter", productController.filterProducts);

module.exports = router;
