import { Schema, model, models } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false, // افتراضي لم يُقرأ بعد
    },
  },
  { timestamps: true } // createdAt + updatedAt تلقائي
);

// 🔥 Index على email لو عايز تبحث بسهولة
contactSchema.index({ email: 1 });

export const contactModel =
  models.ContactMessage || model("ContactMessage", contactSchema);
