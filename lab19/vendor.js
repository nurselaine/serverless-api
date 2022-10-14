'use strict';

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const Chance = require('chance');
const chance = new Chance();

AWS.config.update({ region: 'us-west-2' });

const sns = new AWS.SNS();
const sqs = new AWS.SQS();
const CUSTOMER_ARN = 'arn:aws:sns:us-west-2:363223802314:pickup.fifo';
const VENDOR_URL = 'https://sqs.us-west-2.amazonaws.com/363223802314/flowervendor';

// const message = process.argv[2];

setInterval(() => {
    const message = {
        orderId: uuidv4(),
        customer: chance.name(),
        vendorId: CUSTOMER_ARN,
        queueId: VENDOR_URL,
    }

    const topic = CUSTOMER_ARN;

    const payload = {
        MessageGroupId: uuidv4(),
        MessageDeduplicationId: uuidv4(),
        Message: JSON.stringify(message),
        TopicArn: topic,
    };

    sns.publish(payload, (err, data) => {
        if (err) {
            console.log(err);
        }
        // console.log('payload', payload);
        console.log('Data:::::::::::::::', data);
    });

    let params = {
        QueueUrl: VENDOR_URL,
    }

    sqs.receiveMessage(params, function (err, data) {
        console.log('vendor sqs received');
        if (err) { console.log(err, err.stack); } // an error occurred
        else { console.log(data); }       // successful response
    });
}, 10000);