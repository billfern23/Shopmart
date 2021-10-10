exports.endpoint = (req, res) => {
  let correctPoints = {
    newCustomer: `https://shopmart24.herokuapp.com/customer/register`,
    retrieveCustomer: `https://shopmart24.herokuapp.com/customer/:id/`,
    addProduct: `https://shopmart24.herokuapp.com/customer/:id`,
    retrieveProduct: `https://shopmart24.herokuapp.com/product/:id`,
    updateProduct: `https://shopmart24.herokuapp.com/product/:id`,
    deleteProduct: `https://shopmart24.herokuapp.com/product/:id`,
    Allproducts: `https://shopmart24.herokuapp.com/products`,
    Allcategories: `https://shopmart24.herokuapp.com/products/categories`,
    AllproductsFromcategory: `https://shopmart24.herokuapp.com/products?category=categoryname`,
    BestSellers: `https://shopmart24.herokuapp.com/products?bestseller=yes`,
  };
  res.status(404).json({
    message: `Wrong API endpoint, for more information read readme file`,
    hint: correctPoints,
  });
};
