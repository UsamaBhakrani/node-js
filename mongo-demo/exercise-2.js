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
  const course = await Course.find()
    .or({ tags: { $in: ["frontend", "backend"] } })
    .sort({ price: -1 })
    .select("name author");
  console.log(course);
};

getCourses();
