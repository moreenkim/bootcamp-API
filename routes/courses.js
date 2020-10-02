const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  //   getBootcampsInRadius,
} = require('../controllers/courses');

const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getCourses
  )
  .post(protect, authorize('publisher', 'admiin'), addCourse);
router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admiin'), updateCourse)
  .delete(protect, authorize('publisher', 'admiin'), deleteCourse);

module.exports = router;
