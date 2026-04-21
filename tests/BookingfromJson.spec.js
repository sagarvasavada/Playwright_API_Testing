import { test, expect } from "@playwright/test"
import fs from "fs"
import { json } from "stream/consumers"

test("Booking from external json file", async function ({ request }) 
{

    const file = fs.readFileSync("./testdata/booking.Json")

    const booking = JSON.parse(file)

    const response = await request.post("https://restful-booker.herokuapp.com/booking", 
        { 
            headers: { "Content-Type": "application/json" }, 
            data:booking
        })

        const json = await response.json() 
        console.log(json); 
        const status = await response.status()
        console.log(status);
        
        console.log("Booking id is " +json.bookingid)

        expect(json.bookingid).not.toBeNull()  // booking id should not null
        expect(json.booking.firstname).toBe("playwright") // verify the first name
        expect(status).toBe(200) // verify status code
        expect(json).toHaveProperty("booking") // to check property is exit or not
        expect(json).toHaveProperty("bookingid") //to check property is exit or not
        expect(json.booking).toHaveProperty("firstname"); //to verify json fileds
        expect(json.booking.firstname).toBe(booking.firstname); // to verify and compare resp with input json
        
        
})