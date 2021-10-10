<h1>SHOPMART API GUIDE </h1>
<p1>This API is built for Shopmart to perform operations with customers and inventory.<br />
It interacts with the shopMartdatabase<br />
This is an API that does the following: <br />

**DISCLAIMER: INORDER TO USE API, YOU HAVE TO USE THIS END POINT AND PROPER CASES, METHODS** </p1>


**QUICK LINKS**<br />
Customer:<br />
1)To Register a new Customer: https://shopmart24.herokuapp.com/customer/register<br />
2)To Retrieve a customer using ID: https://shopmart24.herokuapp.com/customer/:id<br />

Products:<br />
1)Add new product to database: https://shopmart24.herokuapp.com/products/addproduct<br />
2)Retrieve all products from database: https://shopmart24.herokuapp.com/products<br />
3)Retrieves All categories from Database: https://shopmart24.herokuapp.com/products/categories<br />
4)Retrieves All products from a specific category: https://shopmart24.herokuapp.com/products?category=categoryname<br />
5)Retrieve products that are Best sellers: https://shopmart24.herokuapp.com/products?bestseller=yes<br />
6)Retrieve a product using ID:  https://shopmart24.herokuapp.com/product/:id<br />
7)Update a product using ID: https://shopmart24.herokuapp.com/product/:id<br />
8)Delete a product usingID: https://shopmart24.herokuapp.com/product/:id<br />

Miss-spell an endpoint or go to incorrect one, you will be routed back


CUSTOMERS
1) To Register a new Customer: 
    
    METHOD: POST

    https://shopmart24.herokuapp.com/customer/register

    required Keys in body: 
      Reference guide:
                        {
                            fname : String datatype, 
                            lname: String datatype,
                            email: : String datatype, 
                            password: String Datatype,
                                                         }
            

    Optional keys in body:          phone : [Numbers] 
                                (Array of numbers datatype) 
    Example:
                {
                    fname : "test", 
                    lname: "test",
                    email: : "test",
                    password: "test",
                    number:  [12345678,1234567]
                                                  }

2) To Retrieve a customer using ID:
    
    METHOD: GET

    https://shopmart24.herokuapp.com/customer/:id

    id is a required parameter, otherwise customer wont be retrieved.
    Replace ':id' with known customer ID. It has to be the same id, length, sequence all of it.
    **You would need the exact ID for this endpoint to retrieve a customer.

Products

1) To add a new Product to shopmart Database:
    
    METHOD: GET

    https://shopmart24.herokuapp.com/products/addproduct
  

    Required keys in the body:
    Reference guide:
                        {
                            "name": String datatype,
                            "price": Number datatype,
                            "category" : String datatype,
                            "bestSeller": Boolean datatype 
                                                               }
    Optional paramters:
                {
                    description: String datatype,
                    quantity: Number Datatype,
                    url: String datatype

                                                }
                  

    Example
                {
                        "name": "test", 
                        "price": 0,
                        "description": "test", 
                        "category" :"test", 
                        "quantity": 9,
                        "bestSeller": true, 
                        "picurl":"test" 

                            }
                            Boolean values: true/false
2) Retrieve all products from database:
      
        METHOD: GET

        https://shopmart24.herokuapp.com/products
    
    
    This will give you a list of all products from the database



3) Retrieves All categories from Database:
        
        METHOD: GET

        https://shopmart24.herokuapp.com/products/categories

4) Retrieves All products from a specific category:
    
        METHOD: GET
        
        https://shopmart24.herokuapp.com/products?category=categoryname

        Method uses a query field a query field called cateogry, replace categoryname with the category of products you want to retrieve
        ****DISCLAIMER: The categoryname must be exactly the same way it is stored in the database ie, case and spelling sensitive****

        Example:
        https://shopmart24.herokuapp.com/products?category=Table

        not table, Table.

5) Retrieve products that are Best sellers
    METHOD: GET
    
    https://shopmart24.herokuapp.com/products?bestseller=yes


    This method uses a query field called bestseller, it takes parameters yes or | Yes.
    **Both are case sensitive and spelling sensitive**


6)Retrieve a product using ID:
    
    METHOD: GET

    https://shopmart24.herokuapp.com/product/:id

    id is a required parameter, otherwise product wont be retrieved.
    Replace ':id' with known product ID.
    **You would need the exact ID for this endpoint to retrieve a product.**


7) Update one product using ID:
    
    METHOD: PUT

    https://shopmart24.herokuapp.com/product/:id
    id is a required parameter, otherwise product wont be updated.
    Replace ':id' with known product ID. It has to be the same id, length, sequence all of it.
    **You would need the exact ID for this endpoint to update a product.**
    **you can update one at a time, you dont have to have all fields in your update body, if you do they will be subjected to validation.**


8) Delete one product using ID:
     METHOD: DELETE
        https://shopmart24.herokuapp.com/product/:id
 is a required parameter, otherwise product wont be deleted.
    Replace ':id' with known product ID. It has to be the same id, length, sequence all of it.
    **You would need the exact ID for this endpoint to DELETE a product.**
 

