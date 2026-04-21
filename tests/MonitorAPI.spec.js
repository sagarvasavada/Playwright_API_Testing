import { test, expect } from "@playwright/test"
import { error, log } from "console";

test("Test monitor API health", async function ({ request }) {
    test.setTimeout(0)

    while (true) {

        const start = Date.now()
        const response = await request.get("https://restful-booker.herokuapp.com/ping")
        const end = Date.now()

        const duration = end -start
        if (duration <2000)
        {
            throw new Error(`API respoance is very slow ${duration}`)
        }
        else
        {
            console.log(`API response duration is ${duration}`);
        }
        
        const status = response.status();
        console.log(`API resp code is ${status}`);
    }



})