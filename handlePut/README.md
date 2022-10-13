# AWS, API, Dynamo, and Lambda

## Problem domain

  A simple REST API created using a people domain model to reflect a person's age and favorite color. Dynamo table is created as people-table and API gateway contains endpoints for /people and /people/:id

  Lambda is used to create each REST method's handler (GET, GET ONE, PUT, POST, and DELETE)

## Set-up 
  - npm i dynamoose 

## Questions
  1. What is the root URL to your API?
    https://vcf723xbx7.execute-api.us-west-2.amazonaws.com/prod/people
  2. What are the routes?
    a. /people
    b./people/:id
  3. What inputs do they require?
    a. GET: nothing
    b. GET ONE: id path parameter
    c. PUT: id path parameter
    c. PUT: id path parameter
    c. POST: body that includes {id, name, color, age}
  4. What output do they return?
    a. GET: Returns all data from dynamo database
    b. GET ONE: Returns one specified item from dynamo database (item number 1 has been deleted)
    c. POST: Returns the object that has just been created
    d. PUT: Returns the previous object that has just been updated
    e. DELETE: Returns a string that deletion has been successful and an empty object

![UML]('https://www.figma.com/file/MwgtqvhGUv38aeQcWk3vW7/Untitled?node-id=0%3A1')
- HERE IS THE LINK TO UML: https://www.figma.com/file/MwgtqvhGUv38aeQcWk3vW7/Untitled?node-id=0%3A1
 - WILL UPDATE TO README IMAGE SOON!