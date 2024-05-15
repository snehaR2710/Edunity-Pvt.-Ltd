import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper

const sendEmail = async function (email, subject, message) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, //true for 465, false for oter ports
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    console.log("transporter", transporter);
    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     auth: {
    //         user: 'katrina.kutch@ethereal.email',
    //         pass: 'D71QgNpmWZRbEVEAyj'
    //     }
    // });

    // send mail with defined transport object 
    const info = await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL, // sender address
        to: email, // user email
        subject: subject, // Subject line
        html: message, // html body
    });
    console.log("info", info);
}


export default sendEmail;