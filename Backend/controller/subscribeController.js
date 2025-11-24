import Subscriber from '../model/subscribeModel.js';
import sendEmail from '../utiles/sendEmail.js';

// @desc    Subscribe a new email
// @route   POST /api/subscribe
// @access  Public
export const subscribeUser = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    try {
        const subscriber = await Subscriber.create({ email });

        // Send a welcome email confirmation
        await sendEmail({
            to: email,
            subject: 'Welcome to Mishco Lifescience Updates!',
            text: `Thank you for subscribing to new product updates from Mishco Lifescience.`,
            html: `
                <p><strong>Thank you for subscribing to new product updates from Mishco Lifescience!</strong></p>
                <p>You will now receive email updates whenever we launch a new product.</p>
                <p>Best regards,<br>The Mishco Lifescience Team</p>
            `,
        });

        res.status(201).json({ 
            success: true, 
            message: 'Successfully subscribed! Check your email for confirmation.'
        });
    } catch (error) {
        // Handle MongoDB duplicate key error (code 11000)
        // if (error.code === 11000) {
        //     return res.status(409).json({
        //         success: false,
        //         message: 'This email is already subscribed.',
        //     });
        // }
        console.error("Subscription error:", error);
        res.status(500).json({ success: false, message: 'Failed to subscribe.' });
    }
};