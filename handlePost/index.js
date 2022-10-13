const dynamoose = require('dynamoose');
    const peopleSchema = new dynamoose.Schema({
      id: String,
      name: String,
      age: Number,
      color: String,
    });

    const peopleModel = dynamoose.model('people-table', peopleSchema);

exports.handler = async (event) => {

    const body = event.body;
    let parsedBody = JSON.parse(body);
    const { id } = event.pathParameters;
    let result;
    
    let newObj = {
        id,
        ...parsedBody
    };
    
    try {
        let user = await peopleModel.update(newObj); 
        result = user;
    } catch (e) {
        console.log('ERROR::::::::::::::',e.message);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };

    return response;
};