const swaggerJSDOC = require("swagger-jsdoc");
// const swaggerDocs = swaggerJSDOC({config-objects})


const swaggerOptions = {
    swaggerDefinition : {
        openapi : "3.0.0",
        info : {
            title : "bidarbash api document",
            description : "bidarbash project API document",
            version : "1.0.0"
        }
    },
    apis : [process.cwd() + "/app/**/*.swagger.js"]
}

const swaggerDocs = swaggerJSDOC(swaggerOptions);

module.exports = swaggerDocs;