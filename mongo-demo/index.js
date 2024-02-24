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
  // starts with
  // regexp  .find({ author: /^Usama/ })

  // ends with
  // regexp  .find({ author: /Usama$/i })

  // contains
  // regexp  .find({ author: /.*Usama.*/i })

  //   .find({ author: "Usama", isPublished: true })

  const pageNumber = 2;
  const pageSize = 10;

  const findDoc = await Course.find()
    .or([{ author: "Usama" }, { isPublished: true }])
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 });
  // .select({ name: 1, tags: 1 });
  // .countDocuments();
  console.log(findDoc);
};

getCourses();
