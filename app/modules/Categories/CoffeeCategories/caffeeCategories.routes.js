const express = require("express");
const router = express.Router();

// paths starts with "/categories/coffees"

router.get("/",(req,res,next) => {
    res.status(201).send({
        success : "OK",
        status : res.statusCode,
        message : "successFully!"
    })
})


module.exports = router;