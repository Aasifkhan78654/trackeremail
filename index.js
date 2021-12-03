const nodemailer = require('nodemailer');

async function main() {

    let transporter = nodemailer.createTransport({

        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'stikkum.i@gmail.com',
            pass: 'agami@123'
        },
        // tls: {
        //     rejectUnauthorized: true
        // }
    });

    console.log("Process Started To Send An Email");

    // send mail with defined transport object
    let info = await transporter.sendMail({
        to: 'aasif@getnada.com',
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: '<b>Hello world!</b>'
    });

    console.log('Message sent: ', info);
}

main().catch(console.error);