import { test, expect } from "@playwright/test"
import { log } from "node:console";


//https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-UpdateBooking
//generate token
test("Test Delete  API", async function ({ request }) {
    const userdata = {
        "firstname": "sagar",
        "lastname": "v",
        "totalprice": 222,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-01-01",
            "checkout": "2027-01-01"
        },
        "additionalneeds": "lunch"
    }
    const updateuserdata = {
        "firstname": "s",
        "lastname": "v",
        "totalprice": 878,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2015-01-01",
            "checkout": "2016-01-01"
        },
        "additionalneeds": "Dinner"
    }

    const authdata = { "username": "admin", "password": "password123" }


    const putresp = await request.post("https://restful-booker.herokuapp.com/auth", { headers: { "content-type": "application/json" }, data: authdata })

    const putjsonresp = await putresp.json()

    const jsontoken = putjsonresp.token
    console.log("token is " + jsontoken);
//=================================================================================================================================
    //booking post api 

    const respdata = await request.post("https://restful-booker.herokuapp.com/booking", { headers: { "content-type": "application/json" }, data: userdata })
    

        const respjsondata = await respdata.json()
        console.log(respjsondata);


        const bookingid = await respjsondata.bookingid

        console.log("my bookingid " + bookingid);
//============================================================================================================================
//Delete  api

        const deleteresp = await request.delete("https://restful-booker.herokuapp.com/booking/" + bookingid,{ headers: { "content-type": "application/json", "Cookie": "token=" + jsontoken }})

        console.log(deleteresp.status());

        expect(deleteresp.status()).toBe(201)

        expect(deleteresp.statusText()).toBe("Created")
        console.log(deleteresp.statusText());
        
        
        
    
})











