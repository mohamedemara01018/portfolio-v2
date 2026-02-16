import { Schema, model } from "mongoose";

const skillSchema = new Schema({
    name: {
        type: String,
        required: [true, "Skill name is required"],
        trim: true,
        minlength: 2,
        maxlength: 50,
    },

    level: {
        type: Number,
        required: true,
        min: [1, "Level must be at least 1"],
        max: [100, "Level cannot exceed 100"],
    },

    category: {
        type: String,
        enum: ["frontend", "backend", "database", "devops", "design"],
        required: true,
    },

    icon: {
        type: String, // ممكن يكون class name أو image url
    }
})

export const skillModel = model('Skills', skillSchema);