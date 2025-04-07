const {default : mongoose} = require("mongoose");


const {
    MONGO_PORT,
    MONGO_HOST,
    MONGO_DB_NAME
} = process.env;


// mongoose.connection new from "events.EventEmitter() class"
mongoose.connection.on("error",() => {
    console.log("==== MONGO CONNECTION ERROR EVENT =====")
})

module.exports = () => {
    mongoose.set({strictQuery : true})
    mongoose.connection.on("connected",() => console.log("-- connected --"))
    mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`)
        .then(() => console.log("connect to mongodb successfully"))
        .catch((err) => console.log("somethings was wrong while mongoDB connection"))
}