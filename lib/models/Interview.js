import mongoose, { Schema } from "mongoose";

const interviewSchema = new Schema(
  {
    role: { type: String, required: true },
    type: { type: String, required: true },
    level: { type: String, required: true },

    techstack: {
      type: [String],
      required: true,
    },

    questions: {
      type: [String],
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    finalized: {
      type: Boolean,
      default: false,
    },

    coverImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // this handles createdAt & updatedAt
  }
);

const Interview =
  mongoose.models.Interview ||
  mongoose.model("Interview", interviewSchema);

export default Interview;
