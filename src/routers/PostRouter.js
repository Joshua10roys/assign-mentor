import express from "express";
import Student from "../models/studentSchema.js";
import Mentor from "../models/mentorSchema.js";


export const postRouter = express.Router();

// for creating student
postRouter.post("/student", async (request, response) => {

    try {
        await Student.create(request.body, (error, created) => {
            if (error) {
                response.status(409).send({ error: error.message });
            }
            if (created) {
                response.status(201).send({ msg: "new student created successfully", student: created });
            }
        });
    } catch (error) {
        response.status(500).send({ msg: error.message });
    }
});

// for creating mentor
postRouter.post("/mentor", async (request, response) => {

    try {
        await Mentor.create(request.body, (error, created) => {
            if (error) {
                response.status(409).send({ error: error.message });
            }
            if (created) {
                response.status(201).send({ msg: "new mentor created successfully", mentor: created });
            }
        });
    } catch (error) {
        response.status(500).send({ msg: error.message });
    }
});