const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const Chance = require('chance');
const chance = new Chance();

AWS.config.update({region: 'us-west-2'});
const sqs = new AWS.SQS();
const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/363223802314/packages.fifo',
  handleMessage: (data) => {
    // do some work with `message`
    let body = JSON.parse(data.Body);
    console.log(body);

    let newMessage = JSON.parse(body.Message);
    // console.log('***************',newMessage.queueId)

    let params = {
      MessageBody: 'DRIVER: Your package was delivered!',
      QueueUrl: newMessage.queueId,
      // MessageGroupId: chance.guid(),
      // MessageDeduplicationId: chance.guid(),
    }

    sqs.sendMessage(params, (err, data) => {
      if(err){
        console.log(err);
      } else {
        console.log('data::::::::::::::',data);
        let parsedData = JSON.stringify(data.Body);
        console.log('data::::::::::::::::::::::', parsedData);
      }
    });

    console.log('sqs message sent');
  },
});



app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();