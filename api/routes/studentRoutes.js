// const mongoose = require('mongoose')
const Students = require('../controllers/studentContoller')

module.exports = function(app) {
    app.route('/students')
        .get(Students.list_of_students)
        .post(Students.create_a_student)
        .put(Students.update_a_students)
    
    app.route('/student/avgmark')
        .get(Students.avg_mark_by_group);
    
    app.route('/student/:id')
        .delete(Students.delete_a_student)
        .put(Students.update_a_student);
}