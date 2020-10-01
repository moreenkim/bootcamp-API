const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  //   updateBootcamp,
  //   deleteBootcamp,
  //   getBootcampsInRadius,
} = require('../controllers/courses');

const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(addCourse);
router.route('/:id').get(getCourse);

module.exports = router;
