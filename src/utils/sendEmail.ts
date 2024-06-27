import 'dotenv/config';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_TOKEN
});

const sentFrom = new Sender("MS_sHHyWw@trial-ynrw7gywmkk42k8e.mlsender.net", "Eventos Tech Floripa")



export const sendEmailWthSendGrid = async (data: { to: string, html: string, text: string, subject: string }): Promise<{success: boolean}> => {
    try {

        const destinataryList = [
            new Recipient(data.to, "")
        ];

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(destinataryList)
            .setSubject(data.subject)
            .setHtml(data.html)
            .setText(data.text);

        const response = await mailerSend.email.send(emailParams);

        console.log('\n sendEmailWthSendGrid response: ', response)

        return { success: true }
    } catch (error) {
        console.log('\n sendEmailWthSendGrid error: ', error)
        return { success: false }
    }
}


