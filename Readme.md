***SHOPMART API GUIDE**
This API is built for Shopmart to perform operations with customers and inventory.
It interacts with the shopMartdatabase
This is an API that does the following: 

DISCLAIMER: **Inorder to use the api, you have to use these endpoints with inputs the proper case**

CUSTOMERS
1) To Register a new Customer: 
    POST METHOD
    https://shopmart24.herokuapp.com/customer/register

    required Keys in body: 
    {
        fname : String datatype, 
        lname: String datatype,
        email: : String datatype, 
        password: String Datatype,
    }

    Optional keys in body: phone : [Numbers] (Array of numbers datatype) 

2) To Retrieve a customer using ID:
    GET METHOD
    https://shopmart24.herokuapp.com/customer/:id

    id is a required parameter, otherwise customer wont be retrieved.
    Replace ':id' with known customer ID.
    **You would need the exact ID for this endpoint to retrieve a customer.

Products

3)