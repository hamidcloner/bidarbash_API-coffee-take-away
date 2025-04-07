const express = require("express");
require("module-alias/register");
require("dotenv").config();
const mongodbConnection = require("./app/config/mongoose.config");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("@config/swagger.config");
const allRoutesHandler = require("@modules/allRoutes.routes");
// import the middlewares 
const {commonMiddlewares} = require("@middlewares");
const exceptionHandler = require("./app/common/exceptions/exceptionHandler");
const pageNotFound = require("./app/common/exceptions/pageNotFoundHandler");


const app = express();

const {
    APP_PORT : port,
    APP_HOST : host
} = process.env;


function main(){
    mongodbConnection();
    commonMiddlewares(app);
    // create chain of middlewares
    app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(swaggerDocs));
    app.use("/api/v1",allRoutesHandler);
    app.use(exceptionHandler);
    app.use(pageNotFound)
    app.listen(port,() => {
        console.log(`server is running on http//${host}:${port}`)
    })
}

main();

