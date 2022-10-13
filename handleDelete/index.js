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
    let result;
    
    try {
        result = await peopleModel.delete(id);
        console.log("Successfully deleted item");
    } catch (error) {
        console.error(error);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };

    return response;
};
