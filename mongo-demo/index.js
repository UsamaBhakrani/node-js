const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error(err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "C++ Course",
    author: "Usama",
    tags: ["backend", "frontend", "C++"],
    isPublished: false,
    // price: 20,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
};

createCourse();

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

// getCourses();

const getAllCourses = async () => {
  const course = await Course.find();
  console.log(course);
};

const updateCourse = async ({ id, status, authorName }) => {
  const course = await Course.findById(id);
  if (!course) return;
  course.set({
    isPublished: status,
    author: authorName,
  });

  const result = await course.save();
  console.log(result);
};

const updateFirst = async ({ id, status, authorName }) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: authorName,
        isPublished: status,
      },
    },
    { new: true }
  );
  console.log(result);
};

const newStatus = {
  id: "65d892f736d2f54e241ec8ab",
  status: true,
  authorName: "Usama",
};

// updateCourse(newStatus);
// updateFirst(newStatus);

const deleteCourse = async ({ id }) => {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
};

// deleteCourse(newStatus);
