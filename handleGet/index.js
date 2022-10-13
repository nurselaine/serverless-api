const dynamoose = require('dynamoose');
    // Make a schema with .
    const peopleSchema = new dynamoose.Schema({
      id: String,
      name: String,
      age: Number,
      color: String,
    });

    const peopleModel = dynamoose.model('people-table', peopleSchema);

exports.handler = async (event) => {

    const response = {
        statusCode: null,
        body: null,
    };

    try {
        // scan and exec is the equivalent to a get all method
        let peopleRecord = await peopleModel.scan().exec();
        response.statusCode = 200;
        response.body = JSON.stringify(peopleRecord);
    } catch(e) {
        console.log(e);
        response.statusCode = 500;
        response.body = JSON.stringify(e.message);
    }

    return response;
};