# AWS-Lambda-SES-with-Triggers
Sample AWS Lambda function, which sends email using AWS SES service, on specific event trigger.

Dependancies:
- nodemailer

This sample demonstrates, 
- How to access file from S3 bucket
- How to send email with attachment using AWS SES
- How to set triggers on Lambda function

In "index.js" file, "getS3File()" function will fetch file from S3 bucket. Just pass your bucket name & file name which you want access.

For sending email from Lambda function, "nodemailer" library is a good option. You just have to create a transporter of "nodemailer" and you can send mail using that transporter. 
Just make sure to replace all the required values in "mailOptions" object.

In my Lambda function, I have set trigger when any specific kind of file has been created into S3 bucket. So here how to do it, open your Lambda function in AWS console. Here you will find "Add triggers" option in "Configuration" section. Select S3 from trigger list.

![alt text](https://github.com/Rahul-Chandera/AWS-Lambda-SES-with-Triggers/blob/master/img/1.png)




Once you select S3 trigger from that list, it will ask you to configure triggers.

![alt text](https://github.com/Rahul-Chandera/AWS-Lambda-SES-with-Triggers/blob/master/img/2.png)

In that configuration, you can select your S3 bucket which serves as the event source. For event type, you can select create, delete, put, post action of any file. Using prefix & suffix options, you can execute this trigger on specific kind of file only.

So in my case, if there is any pdf report file added into S3 bucket, my Lambda function will automatically send email with pdf report to specified person.

Reference:
-
- https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html
- https://medium.freecodecamp.org/sending-emails-with-amazon-ses-7617e83327b6
- https://n2ws.com/blog/aws-automation/lambda-function-s3-event-triggers
