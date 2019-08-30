const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://appuser:appuser@cluster0-xbqqh.mongodb.net/mongo-exercises?retryWrites=true&w=majority', {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
  //validations for sub document
  // authors: {
  //   type:authorSchema,
  //   require: true 
  // }
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

//query the course by id and update the sub docunebt author name
async function updateAuthor(courseId){
 const course = await Course.findById(courseId);
 course.author.name = 'Manjula';
 course.save();
 console.log(course);
}
//update a sub document directly in the database without quering
async function updateAuthorDirectly(courseId){
  const course = await Course.updateOne( {_id: courseId}, {
    $set: {
      'author.name': 'Jimi Smith'
    }
    //to delete a sub document use 'unset'
    //$unset: { 'author': ''}
  });
  
  console.log(course);
 }

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

removeAuthor('5d6a4732c149403a9cc8549b', '5d6a4732c149403a9cc8549a');
//addAuthor('5d6a4732c149403a9cc8549b' , new Author({ name: 'Kim Jun Un' }))
// createCourse('DDD Course', [
//   new Author({ name: 'Petere Drucker' }),
//   new Author({ name: 'Martin Fowler' })
// ]);
//updateAuthor('5d6a3f157317c50e14f1bf2e');
//updateAuthorDirectly('5d6a3f157317c50e14f1bf2e');