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

export async function sendEmail(to:string,body:string,subject="Congratulations! You Recieved the bounty",purpose="welcome"){
    await transport.sendMail({
        from:`${purpose}@email.aadin.world`,
        to:"adinahmad003@gmail.com",
        subject,
        text:body
    })
    console.log('email has been sent to the ',to)
}
