const express = require("express");
const router = express.Router();
// import the all of the categories-handlers-route-handler
const coffesCategoriesRoutes = require("@modules/Categories/CoffeeCategories/caffeeCategories.routes");


// paths starts with "/categories"
router.use("/coffees",coffesCategoriesRoutes);




module.exports = router;