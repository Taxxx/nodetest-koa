# Node Test KOA
## Requirements:
* Node 8.9.3
* Postgres 9.6
## CREATE DB
* in a console run `psql`
* `CREATE DATABASE nodetest_api_test`;
* `CREATE DATABASE nodetest_api`;
## RUN DB MIGRATION
* `knex migrate:latest --env development`
## SEED DATABASE
* `knex seed:run --env development`
* verify that the db has tables and data
## Steps to run the project
* Clone the project
1. Fork/Clone
2. Install dependencies - `npm install`
3. Sanity check - `npm start`
4. To run test - `npm test` for this challenge restaurants endpoints are covered
## Testing Endpoints
Change `:id` accordingly in the next examples
### Restaurants
1. Get all restaurants -> <http://localhost:1337/api/v1/restaurants>
2. Get a restaurant -> <http://localhost:1337/api/v1/restaurants/:id>
3. Add a restaurant POST -> <http://localhost:1337/api/v1/restaurants>
```
{
    "commercialName": "Test 1",
    "legalName": "test1",
    "commercialEmail": "test@gmail.com",
    "adminNumber": "3333333",
    "address": "test address",
    "logo": "test.jpg",
    "rating": 4.5
}
```
4. Update a restaurant PUT -> <http://localhost:1337/api/v1/restaurants/:id>
```
{
    "commercialName": "Update Test 1",
    "legalName": "update test1",
    "commercialEmail": "testupdate@gmail.com",
    "adminNumber": "444444",
    "address": "test update address",
    "logo": "test.jpg",
    "rating": 4.5
}
```
5. Delete a restaurant DELETE -> <http://localhost:1337/api/v1/restaurants/:id>
6. Restaurant rating avg -> <http://localhost:1337/api/v1/restaurants/avgRestaurantRating/:id>