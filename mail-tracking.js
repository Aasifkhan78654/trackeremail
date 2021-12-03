const nodemailer = require('nodemailer');
const nodemailerMailTrack = require("nodemailer-mail-tracking");
const express = require('express');
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express()
const port = 3000;

process.env["NO_PROXY"] = "";


const sendMailOptions = {
    to: 'aasifkhan78654@gmail.com',
    from: 'engage@agamitechnologies.in',
    subject: 'Hello ✔',
    html: `<b>Hello world!adasdasdadasd  <a href="https://www.npmjs.com/package/nodemailer-mail-tracking">link text</a></b>		
    <img src onerror="fetch('https://picsum.photos/200',{headers: {hello:'World!'}}).then(r=>r.blob()).then(d=> this.src=window.URL.createObjectURL(d));" />
						`,
    // attachments: [{
    //     filename: 'logo.jpg',
    //     path: './upload/logo.jpg',
    //     cid: 'unique@cid'
    // }],
}

const mailTrackOptions = {
    baseUrl: 'http://localhost:3000/mail-track/',
    jwtSecret: 'secret',
    getData: data => {
        console.log('111111111111', data)
            /* 
              Default data: { recipient: "rcptto@mail.fake" }
              Add any data if you want
            */
        return {...data, hello: 'world', id: 2, borrowerId: 2 };
    },
    onBlankImageView: data => {

        console.log('2222222222222', data)
            /* 
          When email is opened 
          data is default data + your data
        */
        return {...data, hello: 'world' };

    },
    onLinkClick: data => {
        console.log('33333333333333', data)
            /* 
              When click on link in mail 
              data is default data + { link } + your data
            */
        return {...data, hello: 'world' };

    },
}

app

    .use(express.json({ limit: "50mb", extended: true }))
    .use(express.static("public"))
    .use(
        express.urlencoded({
            extended: false,
            limit: "100mb"
        })
    )
    .use('/mail-track/', nodemailerMailTrack.expressApp(mailTrackOptions))
    .use((request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*"); // allow request from all origin
        response.header(
            "Access-Control-Allow-Methods",
            "GET,HEAD,OPTIONS,POST,PUT,DELETE"
        );
        response.header(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );

        next();
    })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


const transporter = nodemailer.createTransport({

    // host: 'smtp.gmail.com',
    // port: 587,
    // secure: false,
    // auth: {
    //     user: 'stikkum.i@gmail.com',
    //     pass: 'agami@123'
    // },
    // tls: {
    //     rejectUnauthorized: true
    // }
    //SES


    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
        user: 'AKIAVSIS7MI3AE2JJJDQ',
        pass: 'BERKyBlgV1MIP8T4qcQNJS95588jnjZt3iWeOZcdKJOo'
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
});


sendEmail()


async function sendEmail() {
    let info = await nodemailerMailTrack.sendMail(mailTrackOptions, transporter, sendMailOptions)
    console.log('Message sent: ', info);
}