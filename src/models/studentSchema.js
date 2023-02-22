import mongoose, { Schema } from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
            min: 10,
            max: 40,
        },
        gender: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        }
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("Student", studentSchema);