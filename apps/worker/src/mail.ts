require('dotenv').config()
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host:process.env.SMTP_ENDPOINT,
    port:465,
    secure:true,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASSWORD
    }
})


export async function sendEmail(to:string,body:string,subject="Congratulations! You Recieved the bounty"){
    await transport.sendMail({
        from:"hello@email.aadin.world",
        sender:"hello@email.aadin.world",
        to,
        subject,
        text:body
    })
    console.log('email has been sent')
}
