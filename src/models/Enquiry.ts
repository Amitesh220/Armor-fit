import mongoose, { Schema, Document, Model } from "mongoose";

export type EnquiryStatus = "NEW" | "CONTACTED" | "CONVERTED" | "CLOSED";

export interface IEnquiry extends Document {
  fullName: string;
  phone: string;
  email?: string;
  age?: number;
  fitnessGoal: string;
  preferredTraining: string;
  preferredContactMethod: "Phone" | "WhatsApp" | "Email";
  message?: string;
  status: EnquiryStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [120, "Email cannot exceed 120 characters"],
    },
    age: {
      type: Number,
      min: [12, "Age must be at least 12"],
      max: [99, "Age must be under 100"],
    },
    fitnessGoal: {
      type: String,
      required: [true, "Fitness goal is required"],
      enum: [
        "Weight Loss",
        "Muscle Gain",
        "Strength",
        "General Fitness",
        "CrossFit / Functional Training",
        "Personal Training",
        "Other",
      ],
    },
    preferredTraining: {
      type: String,
      required: [true, "Preferred training format is required"],
      enum: ["Gym", "CrossFit", "Personal Training", "Not Sure Yet"],
    },
    preferredContactMethod: {
      type: String,
      enum: ["Phone", "WhatsApp", "Email"],
      default: "WhatsApp",
    },
    message: {
      type: String,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "CONVERTED", "CLOSED"],
      default: "NEW",
      index: true,
    },
    notes: {
      type: String,
      maxlength: [2000, "Notes cannot exceed 2000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

EnquirySchema.index({ createdAt: -1 });

export const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
