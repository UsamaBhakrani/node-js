const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error(err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "SQL Course",
    author: "Usama",
    tags: ["SQL", "backend"],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
};

const getCourses = async () => {
  const findDoc = await Course
    //   .find({ author: "Usama", isPublished: true })
    .find()
    .or([{ author: "Usama" }, { isPublished: true }])
    .skip()
    .limit(10)
    .sort({ name: 1 })
    // .select({ name: 1, tags: 1 });
    .countDocuments();
  console.log(findDoc);
};

getCourses();
