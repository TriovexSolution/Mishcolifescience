// controller/contactController.js
import Contact from "../model/contactModel.js";
import nodemailer from "nodemailer";

// Email transporter (optional)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const submitContact = async (req, res) => {
  try {
    const { fullName, email, queryType, message } = req.body;

    // Save to DB
    const contact = await Contact.create({
      fullName,
      email,
      queryType,
      message,
    });

    // Send email to admin
    try {
      await transporter.sendMail({
        from: `"Contact Form" <${process.env.EMAIL_USER}>`,
        to: "admin@yourcompany.com", // Change this
        replyTo: email,
        subject: `New Contact: ${queryType} from ${fullName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #d32f2f;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Query Type:</strong> ${queryType}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background:#f5f5f5; padding:12px; border-left:4px solid #d32f2f;">
              ${message.replace(/\n/g, "<br>")}
            </blockquote>
            <hr>
            <small>Sent on: ${new Date().toLocaleString()}</small>
          </div>
        `,
      });
    } catch (emailErr) {
      console.log("Email failed (form still saved):", emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been sent.",
      data: {
        id: contact._id,
        fullName: contact.fullName,
        email: contact.email,
      },
    });
  } catch (error) {
    console.error("Contact submit error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 }) // newest first
      .select("-__v"); // hide version field

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
    });
  }
};