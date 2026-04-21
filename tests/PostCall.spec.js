import {test,expect} from "@playwright/test"
import { log } from "node:console";





test("Test Post API" , async function ({request}) 
{

    const user = {userEmail: "sagar@pw1.com", userPassword: "Sagar@123"};
    const postresp = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login", {headers:{"content-type":"application/json"}, data:user})

    const postrescode = postresp.status()
    console.log(postrescode);

    const respdata = await postresp.json();
    console.log(respdata)

    expect(respdata.token).not.toBeNull()
    
})

test("Test Post booking API" , async function ({request}) 
{

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWNlMWEyZGY4NmJhNTFhNjUzZmMzYTEiLCJ1c2VyRW1haWwiOiJzYWdhckBwdzEuY29tIiwidXNlck1vYmlsZSI6OTc5Nzk3OTc5NywidXNlclJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3NjY4MjM1MSwiZXhwIjoxODA4MjM5OTUxfQ.aqdESCNwP8RmMLNt8citXNqlZVGOeJa8eVjw7upAUx8";
    const orderdata = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
   
    const postbooking = await request.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
         {headers: 
        {
            "content-type": "application/json",
            "authorization": token
        },
            data: orderdata
        })

    const resstatus1 = postbooking.status()
    console.log(resstatus1)

    const resjsondata = await postbooking.json()
    console.log(resjsondata);

    const restext = await postbooking.statusText()
    console.log(restext)

    expect(postbooking.ok()).toBeTruthy()

    expect(resstatus1).toBe(201)

    expect(resjsondata.orders).not.toBeNull()

   


    
    
})