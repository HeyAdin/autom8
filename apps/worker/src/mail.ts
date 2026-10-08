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


export async function sendEmail(to:string,body:string){
    await transport.sendMail({
        from:"hello@email.aadin.world",
        sender:"hello@email.aadin.world",
        to,
        subject:"testing chal rhi bhai",
        text:body
    })
    console.log('email has been sent')
}
