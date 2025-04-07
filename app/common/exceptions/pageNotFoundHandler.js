module.exports = (req,res,next) => {
    res.status(404).send({
        success : false,
        statusCode : res.statusCode,
        message : "page not found!"
    })
}

