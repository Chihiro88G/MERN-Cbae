const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getSingleProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controller/ProductController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  // .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
  .get(getAdminProducts);

router
  .route("/product/new")
  // .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
  .post(createProduct);

router
  .route("/product/:id")
  // .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  // .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
  // .get(getSingleProduct);
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getSingleProduct);

router.route("/product/review").post(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getSingleProductReviews)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);

module.exports = router;
