const connect_db = require('./dbconnnect');
const debug = require('debug')('index');
const { Course } = require('./models/Courses');

connect_db();

const newCourse = new Course({
  _id: '5a6900fff467be65019a9001',
  tags: ['angular', 'frontend'],
  date: '2018-01-24T21:56:15.353Z',
  name: 'Angular Course',
  author: 'Mosh',
  isPublished: true,
  price: 15,
  __v: 0,
});

// CREATE
const save = async () => {
  try {
    const data = await newCourse.save();
    debug('Saved in data base');
    debug(data);
  } catch (error) {
    debug(error.message);
  }
};

// READ
const query = async () => {
  // eq(equal)
  // ne(not equal)
  // gt(greater than)
  // gte(greater than or equal to)
  // lt(less than)
  // lte(less than or equal to)
  // in
  // nin(not in)

  try {
    // !Exercise 1
    //  Get all the published backend courses
    // Sort them by their name
    // Pick only their name and author
    // Display them

    // const data = await Course.find({ isPublished: true, tags: 'backend' })
    //   .sort({ name: -1 })
    //   .select({ name: 1, author: 1 });

    // !Exercise 2
    // Get all the published frontend and backend courses
    // sort them by their price in a descending order,
    // pick only their name and author

    // ?Solution one way
    // const data = await Course.find({
    //   isPublished: true,
    //   tags: { $in: ['backend', 'frontend'] },
    // })
    //   .sort('-price')
    //   .select('name author price');

    // ?Solution another way

    // const data = await Course.find({
    //   isPublished: true,
    // })
    //   .or([{ tags: 'frontend' }, { tags: 'backend' }])
    //   .sort('-price')
    //   .select('name author price');

    // !Exercise 3
    // Get all the published courses
    // that are $15 or more
    // or have the word 'by' in their title

    const data = await Course.find({ published: true }).or([
      { price: { $gte: 15 } },
      { name: /.*by.*/i },
    ]);

    debug(data);
  } catch (error) {
    debug(error);
  }
};

// Calling save function
// save();

// Calling query function
// query();

// UPDATE
const updateCourse = async (id) => {
  // ?Approach:Query first
  // findById()
  // Modify its properties
  // save()

  // const course = await Course.findById(id);
  // if (!course) return;
  // One way of updating
  // course.isPublished = true;
  // course.author = 'Another author';

  // // Another way
  // course.set({
  //   isPublished: true,
  //   author: 'Another author',
  // });

  // const data = await course.save();
  // debug(data);

  // ?Second approach
  // Approach: Update first
  // Update directly
  // Optionally: get the updated document

  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: 'Arun',
        isPublished: false,
      },
    }
  );
  debug(result);
};

// Calling update function
// updateCourse('5a68fdc3615eda645bc6bdec');

// DELETE
const deleteCourse = async (id) => {
  const course = await Course.findByIdAndRemove(id);
  debug(course);
};

// deleteCourse('5a68fdc3615eda645bc6bdec');
