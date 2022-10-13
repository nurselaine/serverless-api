const dynamoose = require('dynamoose');
    const peopleSchema = new dynamoose.Schema({
      id: String,
      name: String,
      age: Number,
      color: String,
    });

    const peopleModel = dynamoose.model('people-table', peopleSchema);

exports.handler = async (event) => {
    
    const { id } = event.pathParameters;
    let obj;
    
    try {
        const myUser = await peopleModel.get({id});
        obj = myUser;
    } catch (error) {
        console.error(error);
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(JSON.stringify(obj))
    }

    return response;
};