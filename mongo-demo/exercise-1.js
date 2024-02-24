const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

const getCourses = async () => {
  const findCourse = await Course.find()
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  console.log(findCourse);
};

getCourses();
