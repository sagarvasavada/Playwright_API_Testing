import {test,expect} from "@playwright/test"

test("Test Get API" , async function ({request}) 
{
    const resp = await request.get("https://jsonplaceholder.typicode.com/posts/1")

    const respbody = await resp.body()

    console.log(respbody);

    const respjson = await resp.json()

    console.log(respjson);

    const respstatus = await resp.status()

    console.log(respstatus);

    const resptext = await resp.statusText()

    console.log(resptext);

    const respheaderarray = resp.headersArray()

    console.log(respheaderarray);

    expect(respstatus).toBe(200)
    expect(resp.ok).toBeTruthy()
    expect(respjson).toHaveProperty("userId", 1)
    expect(respjson).toHaveProperty("title", "sunt aut facere repellat provident occaecati excepturi optio reprehenderit")
    expect(respjson.body).toContain("quia et suscipit")
    

    
})