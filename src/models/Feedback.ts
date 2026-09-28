import mongoose, { Schema, Document, Model } from "mongoose";

export type FeedbackStatus = "NEW" | "REVIEWED" | "RESOLVED";

export interface IFeedback extends Document {
  name?: string;
  memberIdentifier?: string;
  feedbackType: string;
  rating: number;
  feedback: string;
  contactPermission: boolean;
  contactDetails?: string;
  status: FeedbackStatus;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    name: {
      type: String,
      trim: true,
      default: "Anonymous Member",
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    memberIdentifier: {
      type: String,
      trim: true,
      maxlength: [50, "Member ID cannot exceed 50 characters"],
    },
    feedbackType: {
      type: String,
      required: [true, "Feedback category is required"],
      enum: [
        "Training",
        "Equipment",
        "Cleanliness",
        "Staff",
        "Personal Training",
        "Classes",
        "Environment",
        "Membership Experience",
        "Other",
      ],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Minimum rating is 1"],
      max: [5, "Maximum rating is 5"],
    },
    feedback: {
      type: String,
      required: [true, "Feedback detail is required"],
      minlength: [5, "Feedback must be at least 5 characters"],
      maxlength: [2000, "Feedback cannot exceed 2000 characters"],
      trim: true,
    },
    contactPermission: {
      type: Boolean,
      default: false,
    },
    contactDetails: {
      type: String,
      trim: true,
      maxlength: [120, "Contact details cannot exceed 120 characters"],
    },
    status: {
      type: String,
      enum: ["NEW", "REVIEWED", "RESOLVED"],
      default: "NEW",
      index: true,
    },
    adminNotes: {
      type: String,
      maxlength: [2000, "Notes cannot exceed 2000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

FeedbackSchema.index({ createdAt: -1 });

export const Feedback: Model<IFeedback> =
  mongoose.models.Feedback || mongoose.model<IFeedback>("Feedback", FeedbackSchema);
