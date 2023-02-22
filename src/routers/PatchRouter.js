import express from "express";
import Student from "../models/studentSchema.js";
import Mentor from "../models/mentorSchema.js";


export const patchRouter = express.Router();

// assign mentor to spectfic student
patchRouter.use("/assignMentor", async (request, response) => {

    try {

        let { mentor_id, student_id } = request.body;

        let isValidMentor = await Mentor.findById(mentor_id, { _id: 1 });
        let isValidStudent = await Student.findById(student_id, { _id: 1 });

        if (isValidMentor && isValidStudent) {

            // removing stuent if assigned to other mentors
            await Mentor.updateMany(
                { students: { $in: student_id } },
                { $pull: { students: student_id } }
            );

            // adding student to mentor
            let result = await Mentor.findByIdAndUpdate(
                mentor_id,
                { students: student_id },
                { returnOriginal: false }
            );

            response.status(202).send({ msg: "mentor assigned/changed successfully", result })
        } else {
            response.status(400).send({ msg: "invalid student/mentor id" });
        }
    } catch (error) {
        response.status(500).send({ msg: error.message });
    }
})

// assign students to mentors
patchRouter.use("/assignStudents", async (request, response) => {

    try {

        let { mentor_id, student_ids } = request.body;
        let isValidMentor = await Mentor.findById(mentor_id, { _id: 1 });

        if (isValidMentor) {

            // removing students _ids from old mentors
            await Mentor.updateMany(
                { students: { $in: student_ids } },
                { $pull: { students: { $in: student_ids } } }
            );

            // assigning students to new mentors in request
            let result = await Mentor.findByIdAndUpdate(
                mentor_id,
                { $addToSet: { students: student_ids } },
                { returnOriginal: false }
            );

            response.status(202).send({ msg: "student assigned successfully", result });
        } else {
            response.status(400).send({ msg: "invalid mentor id" });
        }

    } catch (error) {
        response.status(500).send({ msg: error.message });
    }
});