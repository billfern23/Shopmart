<h1>SHOPMART API GUIDE </h1>
<p1>This API is built for Shopmart to perform operations with customers and inventory.<br />
It interacts with the ShopMartdatabase<br />


**DISCLAIMER: INORDER TO USE API, YOU HAVE TO USE THIS END POINT AND EXACT CASE, METHODS**
</p1>


<h2>QUICK LINKS</h2>
<b>Customer:<b> </br>
<ol>
<li>To Register a new Customer: https://shopmart24.herokuapp.com/customer/register</li>
<li>To Retrieve a customer using ID: https://shopmart24.herokuapp.com/customer/:id/</li>
</ol>

Product: <br />
<ol>
<li>Add new product to database: https://shopmart24.herokuapp.com/product/addproduct</li>
<li>Retrieve a product using ID:  https://shopmart24.herokuapp.com/product/:id</li>
<li>Update a product using ID: https://shopmart24.herokuapp.com/product/:id</li>
<li>Delete a product usingID: https://shopmart24.herokuapp.com/product/:id</li>
</ol>

Products:<br />
<ol>
<li>Retrieve all products from database: https://shopmart24.herokuapp.com/products</li>
<li>Retrieves All categories from Database: https://shopmart24.herokuapp.com/products/categories</li>
<li>Retrieves All products from a specific category: https://shopmart24.herokuapp.com/products?category=categoryname</li>
<li>Retrieve products that are Best sellers: https://shopmart24.herokuapp.com/products?bestseller=yes</li>
</ol>



**Miss-spell an endpoint or go to incorrect one, response will be send with appropriate links**


<b>CUSTOMER</b> </br>
<p2> 1) To Register a new Customer: 
  
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

2. To Retrieve a customer using ID:
    
    METHOD: GET

    https://shopmart24.herokuapp.com/customer/:id

    id is a required parameter, otherwise customer wont be retrieved.
    Replace ':id' with known customer ID. It has to be the same id, length, sequence all of it.
  <b>You would need the exact ID for this endpoint to retrieve a customer.</b>
</p2>
<b>Product</b> </br>
<p2>
1. To add a new Product to shopmart Database:
    
    METHOD: GET

    https://shopmart24.herokuapp.com/product/addproduct
  

    Required keys in the body:
    Reference guide:
    ```yaml
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

2. Retrieve a product using ID:
    
    METHOD: GET

    https://shopmart24.herokuapp.com/product/:id

    id is a required parameter, otherwise product wont be retrieved.
    Replace ':id' with known product ID.
    **You would need the exact ID for this endpoint to retrieve a product.**


3. Update one product using ID:
    
    METHOD: PUT

    https://shopmart24.herokuapp.com/product/:id </br>
    id is a required parameter, otherwise product wont be updated.
    Replace ':id' with known product ID. It has to be the same id, length, sequence all of it.
    <b>You would need the exact ID for this endpoint to update a product.
    you can update one at a time, you dont have to have all fields in your update body,
     if you do they will be subjected to validation. Do not use null here unless required for instance, quantity</b>


4. Delete one product using ID:</br>
     METHOD: DELETE</br>
        https://shopmart24.herokuapp.com/product/:id </br>
    idis a required parameter, otherwise product wont be deleted.
    Replace ':id' with known product ID. It has to be the same id, length, sequence all of it.
    <b>You would need the exact ID for this endpoint to DELETE a product.</b>
    </p2>

<b>Products</b> </br>
<p2>
1. Retrieve all products from database:</br>
    METHOD: GET</br>
    https://shopmart24.herokuapp.com/products
        
    
    
    This will give you a list of all products from the database



2. Retrieves All categories from Database:</br>
    METHOD: GET</br>

    https://shopmart24.herokuapp.com/products/categories</br>
    </br>
        This will give you a list of all categories in the database.



3. Retrieves All products from a specific category:</br>
    
    METHOD: GET</br>
        
    https://shopmart24.herokuapp.com/products?category=categoryname </br>

    Method uses a query field a query field called cateogry, replace categoryname with 
    the category of products you want to retrieve.
    <b>DISCLAIMER: The categoryname must be exactly the same way it is stored in the database ie, case 
     and is spelling sensitive</b>

        Example
     https://shopmart24.herokuapp.com/products?category=Table </br>

        not table, Table.

4. Retrieve products that are Best sellers
    METHOD: GET</br>
    
    https://shopmart24.herokuapp.com/products?bestseller=yes</br>


    This method uses a query field called bestseller, it takes parameters yes or | Yes.
    **Both are case sensitive and spelling sensitive**

</p2>

 

