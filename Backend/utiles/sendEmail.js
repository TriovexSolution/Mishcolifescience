import nodemailer from 'nodemailer';

// Use a variable to hold the transporter instance
let transporter;

const createTransporter = () => {
    // Only create the transporter once when needed
    if (!transporter) {
        
        // CRITICAL FIX: Ensure secure is set correctly based on the string value
        const isSecure = process.env.SMTP_PORT === '465'; 

        transporter = nodemailer.createTransport({
            // These variables are now guaranteed to be loaded from .env
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: isSecure, 
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            // Recommended for better reliability with external SMTP servers
            tls: {
                 rejectUnauthorized: false
            }
        });
    }
    return transporter;
};


const sendEmail = async (options) => {
    // Call the function to ensure transporter is initialized and process.env is ready
    const mailTransporter = createTransporter(); 
    
    // Uses the options object (to, subject, html, bcc) passed from the controller
    const mailOptions = {
        from: `${process.env.FROM_NAME || 'Mishco Lifescience'} <${process.env.FROM_EMAIL}>`,
        to: options.to,
        bcc: options.bcc, // Used for mass notifications
        subject: options.subject,
        html: options.html,
        text: options.text, 
    };

    try {
        // Use the lazily created transporter
        const info = await mailTransporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
};

export default sendEmail;