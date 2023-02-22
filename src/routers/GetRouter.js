import express from "express";
import Student from "../models/studentSchema.js";
import Mentor from "../models/mentorSchema.js";
import mongoose from "mongoose";


export const getRouter = express.Router();

// get mentors
getRouter.get("/mentors", async (request, response) => {

    try {
        let mentors = await Mentor.find({}, { students: 0 });
        response.status(200).send({ msg: "all mentors list", data: mentors });
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});

// get students
getRouter.get("/students", async (request, response) => {

    try {
        let students = await Student.find({});
        response.status(200).send({ msg: "all students list", data: students });
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});

// get unassigned mentors
getRouter.get("/unassignedMentors", async (request, response) => {

    try {
        let mentors = await Mentor.find({ students: { $in: [null, []] } });
        response.status(200).send({ msg: "all unassigned mentor list", data: mentors });
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});

// get students for mentor
getRouter.get("/getStudents/:mentor_id", async (request, response) => {

    try {

        let _id = request.params["mentor_id"];
        let isValid_id = mongoose.isValidObjectId(_id);

        if (isValid_id) {
            let details = await Mentor
                .findById(_id, { _id: 1, id: 1, name: 1, age: 1, gender: 1 })
                .populate("students", "_id id name age gender");
            response.status(200).send({ msg: "all unassigned students list", data: details });
        } else {
            response.status(400).send({ msg: "not a valid mentor id" });
        }

    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});