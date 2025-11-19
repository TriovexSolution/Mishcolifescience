// model/Contact.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  queryType: {
    type: String,
    required: [true, "Please select a query type"],
    enum: {
      values: [
        "General Inquiry",
        "Technical Support",
        "Partnership",
        "Feedback",
        "Other",
      ],
      message: "Invalid query type",
    },
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    minlength: [1, "Message must be at least 1 character"],
    maxlength: [1000, "Message cannot exceed 1000 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Contact", contactSchema);