exports.endpoint = (req, res) =>{
    res.status(505).json({
        message: `not found, wrong API endpoint, use the proper link`
    })


};