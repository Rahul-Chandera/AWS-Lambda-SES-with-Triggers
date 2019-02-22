var aws = require('aws-sdk');
var nodemailer = require('nodemailer');
var s3 = new aws.S3();

exports.handler = function (event, context, callback) {
    // Init SES object
    var ses = new aws.SES({
        region: 'YOUR AWS REGION KEY'
    });

    // Get file from your S3 bucket which you want to attache with mail
    getS3File('S3 BUCKET NAME', 'FILE NAME')
        .then(function (fileData) {
            var mailOptions = {
                from: 'FROM EMAIL ADDRESS',
                subject: 'SUBJECT OF MAIL',
                html: 'EMAIL BODY WITH HTML TEXT',
                to: 'TO MAIL ADDRESS',
                attachments: [
                    {
                        filename: "ATTACHED FILE NAME",
                        content: fileData.Body
                    }
                ]
            };

            // Create Nodemailer SES transporter
            var transporter = nodemailer.createTransport({
                SES: ses
            });

            // Send Email
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    console.log('Email sent successfully');
                    callback();
                }
            });
        })
        .catch(function (err) {
            console.log(err);
            callback(err);
        });
};

function getS3File(bucket, key) {
    return new Promise(function (resolve, reject) {
        s3.getObject(
            {
                Bucket: bucket,
                Key: key
            },
            function (err, data) {
                if (err) return reject(err);
                else return resolve(data);
            }
        );
    })
}
