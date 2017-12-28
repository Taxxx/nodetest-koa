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
### Reviews
1. Get all reviews -> <http://localhost:1337/api/v1/reviews>
2. Get a reviews -> <http://localhost:1337/api/v1/reviews/:id>
3. Add a review POST -> <http://localhost:1337/api/v1/reviews>
```
{
    "name": "Pepe",
    "review": "Horrible place :(",
    "rating": 2,
    "restaurant_id": {id}
}
```
4. Update a review PUT -> <http://localhost:1337/api/v1/reviews/:id>
```
{
    "name": "Pepe 2",
    "review": "Horrible place 2 :(",
    "rating": 2
}
```
5. Delete a review DELETE -> <http://localhost:1337/api/v1/reviews/:id>
### Meals
1. Get all meals -> <http://localhost:1337/api/v1/meals>
2. Get a meals -> <http://localhost:1337/api/v1/meals/:id>
3. Add a meal POST -> <http://localhost:1337/api/v1/meals>
```
{
    "name": "Sushi Bowl",
    "description": "incredible pieces of sashimi with soja sauce",
    "price": 10,
    "restaurant_id": {id}
}
```
4. Update a meal PUT -> <http://localhost:1337/api/v1/meals/:id>
```
{
    "name": "Sushi Bowl 23232",
    "description": "bbb pieces of sashimi with soja sauce",
    "price": 10
}
```
5. Delete a meal DELETE -> <http://localhost:1337/api/v1/meals/:id>
### Orders
1. Get all orders -> <http://localhost:1337/api/v1/orders>
2. Get a orders -> <http://localhost:1337/api/v1/orders/:id>
3. Add a order POST -> <http://localhost:1337/api/v1/orders>
```
{
    "address": "Test",
    "totalPrice": 15,
    "restaurant_id": {id},
    "meal_id": {id}
}
```
4. Update a order PUT -> <http://localhost:1337/api/v1/orders/:id>
```
{
    "name": "Sushi Bowl 23232",
    "description": "bbb pieces of sashimi with soja sauce",
    "totalPrice": 10
}
```
5. Delete a order DELETE -> <http://localhost:1337/api/v1/orders/:id>