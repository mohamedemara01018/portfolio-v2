import { Schema, model } from "mongoose";
import slugify from "slugify";

const projectSchema = new Schema({
    title: {
        type: String,
        required: [true, "Project title is required"],
        trim: true,
        minlength: 3,
        maxlength: 100,
    },

    slug: {
        type: String,
        unique: true,
    },

    description: {
        type: String,
        required: true,
    },

    technologies: [
        {
            type: String,
            required: true,
        },
    ],

    category: {
        type: String,
        enum: ["frontend", "backend", "fullstack"],
        required: true,
    },

    coverImage: {
        type: String,
        required: true,
    },

    liveUrl: {
        type: String,
    },

    githubUrl: {
        type: String,
    },

    featured: {
        type: Boolean,
        default: false,
    },

    views: {
        type: Number,
        default: 0,
    },
}, { timestamps: true })


projectSchema.pre('save', function (next) {
    if (this.isModified("title")) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

export const projectModel = model('Projects', projectSchema);