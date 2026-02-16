import { Schema, model, models } from "mongoose";
import slugify from "slugify";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      minlength: 3,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    content: {
      type: String,
      required: true,
    },

    excerpt: {
      type: String,
      maxlength: 300,
    },

    coverImage: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    published: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // createdAt + updatedAt
);

// 🔥 Auto-generate slug from title before saving
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// 🔥 Indexes for performance
blogSchema.index({ slug: 1 });
blogSchema.index({ published: 1 });
blogSchema.index({ tags: 1 });

export const blogModel = models.BlogPost || model("BlogPost", blogSchema);
