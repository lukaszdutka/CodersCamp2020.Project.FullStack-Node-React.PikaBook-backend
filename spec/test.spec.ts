import app from '../src/Server'; 
const supertest = require('supertest')
const request = supertest(app)

describe("GET / - a simple api endpoint", () => {
  it("gets the test endpoint", async done => {
    const response = await request.get("/hello");
  
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello");
    done();
  });
});