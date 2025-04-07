const express = require("express");


const commonMiddlewares = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({extended : true}))
}


module.exports = {
    commonMiddlewares
}