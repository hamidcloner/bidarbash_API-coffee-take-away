const express = require("express");
const router = express.Router();
// import the all of the category-route-handlers
const categoriesRoutes = require("@modules/Categories/categories.routes");
const authRoutes = require("@modules/Auth/auth.routes");


router.use("/categories",categoriesRoutes);
router.use("/auth",authRoutes);





module.exports = router;