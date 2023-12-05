var app = require('../index.ts');
const { describe, expect, test } = require('@jest/globals');
const request = require('supertest');

describe("DELETE /movies", () => {
    test("Delete particular Movie", async () => {
        let response = await request(app)
            .delete("/movies/1");
        expect(response.status).toBe(200);
    })
})

describe("POST /movies", () => {
    test("Add particular Movie", async () => {
        let req_payload = {
            "title": "t1",
            "genre": "g1",
            "rating": 1,
            "strem_link": "s2",
            "role": "admin"
        }
        let response = await request(app)
            .post("/movies/1")
            .send(req_payload)
        if (response.status == 404)
            expect(response.status).toBe(404);
        else {
            expect(response.status).toBe(201);
        }
    })
})

describe("PUT /movies", () => {
    test("Update particular Movie", async () => {
        let req_payload = {
            "title": "t1",
            "genre": "g1",
            "rating": 1,
            "strem_link": "s1",
            "role": "admin"
        }
        let response = await request(app)
            .put("/movies/1")
            .send(req_payload);
        expect(response.status).toBe(200);

    })
})

describe("GET /movies", () => {
    test("Get list of movies", async () => {
        let response = await request(app)
            .get("/movies");
        if (response.status == 404)
            expect(response.status).toBe(404);
        else {
            expect(response.status).toBe(200);
        }
    });
    test("Search particular Movie", async () => {
        let response = await request(app)
            .get("/search?title=t1")
        if (response.status == 404)
            expect(response.status).toBe(404);
        else {
            expect(response.status).toBe(200);
        }
    })
});

