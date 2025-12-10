import Subscriber from '../model/subscribeModel.js';
import sendEmail from '../utiles/sendEmail.js';

// @desc    Subscribe a new email
// @route   POST /api/subscribe
// @access  Public
export const subscribeUser = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email is required.',
        });
    }

    try {
        // Check if user already subscribed
        const alreadyExists = await Subscriber.findOne({ email });
        if (alreadyExists) {
            return res.status(200).json({
                success: false,
                message: 'You are already subscribed.',
            });
        }

        // Save new subscriber
        const subscriber = await Subscriber.create({ email });

        // Send Welcome email
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

        return res.status(201).json({
            success: true,
            message: 'Successfully subscribed! Check your email for confirmation.',
        });
    } catch (error) {

        // Handle Mongo duplicate key error if unique index is enabled
        if (error.code === 11000) {
            return res.status(200).json({
                success: false,
                message: 'You are already subscribed.',
            });
        }

        console.error("Subscription error:", error);

        return res.status(500).json({
            success: false,
            message: 'Failed to subscribe.',
        });
    }
};
