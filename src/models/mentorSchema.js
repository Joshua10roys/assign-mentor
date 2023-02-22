import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true,
            min: 30,
            max: 60,
        },
        gender: {
            type: String,
            required: true,
        },
        experiance: {
            type: Number,
            required: true,
            default: 1,
        },
        students: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Student",
            },
        ],
        created: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
        updated: {
            type: Date,
            default: Date.now,
        }
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("Mentor", mentorSchema);