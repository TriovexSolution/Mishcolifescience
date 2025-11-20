// // models/Product.js
// import mongoose from "mongoose";

// const compositionSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   strength: { type: String, required: true, trim: true }
// });

// const productSchema = new mongoose.Schema({
//   productName: { type: String, required: true, trim: true, unique: true },
//   genericName: { type: String, required: true, trim: true },
//   brandName: { type: String, trim: true },
//   strength: { type: String, required: true, trim: true },
//   dosageForm: {
//     type: String,
//     required: true,
//     enum: ["Tablet", "Capsule", "Injection", "Syrup", "Cream", "Ointment", "Powder"]
//   },
//   administrationRoute: { type: String, required: true, trim: true },
//   composition: [compositionSchema],
//   indications: { type: [String], required: true },
//   contraindications: [String],
//   packSize: { type: String, required: true, trim: true },
//   mrp: { type: Number, min: 0 },
//   storage: { type: String, trim: true },
//   prescriptionRequired: { type: Boolean, default: true },

//   // UPDATED: Reference to Category model
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category",
//     required: [true, "Category is required"]
//   },

//   isFeatured: { type: Boolean, default: false },
//   productImage: { type: String, default: "https://via.placeholder.com/600x600" },
//   color: { type: String, trim: true, default: null },
//   createdAt: { type: Date, default: Date.now }
// });

// // Index for performance
// productSchema.index({ category: 1 });

// export default mongoose.model("Product", productSchema);

// models/Product.js
import mongoose from "mongoose";

const compositionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  strength: { type: String, required: true, trim: true },
});

// NEW: Drug-wise MOA schema
const moaSchema = new mongoose.Schema(
  {
    drug: { type: String, required: true, trim: true },
    moa: { type: String, required: true, trim: true },
  },
  { _id: false }
); // No _id for sub-documents

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true, trim: true, unique: true },
  genericName: { type: String, required: true, trim: true },
  brandName: { type: String, trim: true },
  strength: { type: String, required: true, trim: true },
  dosageForm: {
    type: String,
    required: true,
    enum: [
      "Tablet",
      "Capsule",
      "Injection",
      "Syrup",
      "Cream",
      "Ointment",
      "Powder",
    ],
  },
  administrationRoute: { type: String, required: true, trim: true },
  composition: [compositionSchema],

  // === NEW FIELD 1: Uses ===
  uses: {
    type: [String],
    required: [true, "At least one use is required"],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: "Uses cannot be empty",
    },
  },

  // === NEW FIELD 2: Drug-wise MOA ===
  mechanismOfAction: {
    type: [moaSchema],
    default: [],
    validate: {
      validator: (v) => v.every((item) => item.drug && item.moa),
      message: "Each MOA entry must have 'drug' and 'moa'",
    },
  },

  indications: { type: [String], required: true },
  contraindications: [String],
  packSize: { type: String, required: true, trim: true },
  mrp: { type: Number, min: 0 },
  storage: { type: String, trim: true },
  prescriptionRequired: { type: Boolean, default: true },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },

  isFeatured: { type: Boolean, default: false },
  productImage: {
    type: [String], // Defines the field as an array of strings
    default: [], // 🚀 CHANGE: Set default to an EMPTY ARRAY
  },
  color: { type: String, trim: true, default: null },
  createdAt: { type: Date, default: Date.now },
});

// Index for performance
productSchema.index({ category: 1 });

export default mongoose.model("Product", productSchema);
