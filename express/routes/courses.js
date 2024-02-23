const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "C++" },
  { id: 2, name: "C#" },
  { id: 3, name: "C$" },
];

// Get Request


router.get("/", (req, res) => {
  res.send(courses);
});
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Course not found");
  } else {
    res.send(course);
  }
});

// Post Request
router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// Put Request
router.put("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course does not exist");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

// Delete Request
router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course does not exist");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

const validateCourse = (course) => {
  const schema = { name: Joi.string().min(3) };
  return Joi.validate(course, schema);
};


module.exports = router;
