const mongoose = require('mongoose');
const Student = require('../models/studentModel');

/**
 * @swagger
 * /students:
 *   post:
 *     summary: "Add a student"
 *     tags: [student]
 *     parameters:
 *       - name: "name"
 *         in: "formData"
 *         description: "Name of the student"
 *         required: true
 *         type: "string"
 *       - name: "group"
 *         in: "formData"
 *         description: "Group of the student"
 *         required: false
 *         type: "string"
 *       - name: "mark"
 *         in: "formData"
 *         description: "Mark of the student"
 *         required: false
 *         type: "integer"
 *       - name: "photo"
 *         in: "formData"
 *         description: "URL of the student's photo"
 *         required: false
 *         type: "string"
 *       - name: "isDonePr"
 *         in: "formData"
 *         description: "Flag indicating if student's practical work is done"
 *         required: false
 *         type: "boolean"
 *     responses:
 *       201:
 *         description: "Success"
 *         schema:
 *           type: "object"
 *           properties:
 *             name:
 *               type: "string"
 *               example: "Olya"
 *             group:
 *               type: "string"
 *               example: "RPZ 20 1/9"
 *             mark:
 *               type: "integer"
 *               example: 5
 *   put:
 *     summary: "Update all students based on conditions"
 *     tags: [students]
 *     responses:
 *       200:
 *         description: "Success"
 *         schema:
 *           type: "object"
 *           properties:
 *             message:
 *               type: "string"
 *               example: "Students updated successfully"
 *       400:
 *         description: "Bad Request"
 * /student/{id}:
 *   put:
 *     summary: "Update a student by ID"
 *     tags: 
 *      - "student"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the student to update"
 *         required: true
 *         type: "string"
 *       - name: "name"
 *         in: "formData"
 *         description: "Updated name of the student"
 *         required: false
 *         type: "string"
 *       - name: "group"
 *         in: "formData"
 *         description: "Updated group of the student"
 *         required: false
 *         type: "string"
 *       - name: "mark"
 *         in: "formData"
 *         description: "Updated mark of the student"
 *         required: false
 *         type: "integer"
 *       - name: "photo"
 *         in: "formData"
 *         description: "URL of the student's photo"
 *         required: false
 *         type: "string"
 *       - name: "isDonePr"
 *         in: "formData"
 *         description: "Flag indicating if student's practical work is done"
 *         required: false
 *         type: "boolean"
 *     responses:
 *       200:
 *         description: "Success"
 *         schema:
 *           type: "object"
 *           properties:
 *             message:
 *               type: "string"
 *               example: "Student updated successfully"
 *       400:
 *         description: "Bad Request"
 *       404:
 *         description: "Not Found"
 */

exports.list_of_students = async function(req, res) {
    const students = await Student.find({});
    res.json(students);
}

exports.create_a_student = function(req, res, next) {
    Student.create(req.body)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            next(err);
        });
}

exports.update_a_students = function(req, res) {


    Student.updateMany({ mark: { $exists: true }, isDonePr: false }, { isDonePr: true })
        .then((student) => {
            res.send(student);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
        .catch((err) => {
            res.status(404).send(err)
        })
}

exports.update_a_student = function(req, res) {
    Student.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then((result) => {
            if (!result) {
                res.status(404).send({ message: "Student not found" });
            } else {
                res.status(200).send(result);
            }
        })
        .catch((err) => {
            res.status(400).send(err);
        });
}



exports.delete_a_student = async (req, res) => {
    Student.findOneAndDelete({ _id: req.params.id })
        .then((student) => {
            res.send(student);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
}

exports.avg_mark_by_group = async function (req, res) {
    Student.aggregate([
        {
            $match: {
                group: {
                    $ne: null,
                },
            },
        },
        {
            $group: {
                _id: "$group",
                averageMark: { $avg: "$mark" }
            }
        },
        {
            $project: {
                _id: 0, 
              group: "$_id",
              averageMark: "$averageMark",
            },
        }
    ])
    .then((students) => {
        res.send(students);
    })
    .catch((error) => {
        res.send(400, "Bad Request");
    });
}
