exports.endpoint = (req, res) =>{
    res.status(505).json({
        message: `Wrong API endpoint, use the proper link by using readme file`
    })


};