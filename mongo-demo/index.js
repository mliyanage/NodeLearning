//ts-check
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://appuser:appuser@cluster0-xbqqh.mongodb.net/mongo-exercises?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(() => console.log('Connected to the DB'))
.catch(err => console.error('Not connecte', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
})

const Course = mongoose.model('Course', courseSchema); //compile the schema to a class

// async function createCourse() {
//     const course = new Course({
//         name: 'Angular course',
//         author: 'Mosh',
//         tags: ['Angular', 'frontend'],
//         isPublished: true
//     });
    
//     const result = await course.save();
//     console.log(result);
// }

async function getCourses(){
    const pageNumber = 1
    const pageSize = 10
    return await Course
    //.find({ isPublished: true, tags: { $in: ['frontend', 'backend']}})
    //.find({ price: { $gt: 10, $lte: 20}})
    // .find()
    // .or([{ author: 'Moshs'}, { isPublished: true}])
    //Starts with Mosh
    //.find({ author: /^Mosh/})

    //Ends with Hamedani
    //.find({ authero:/Hamedani$/i }) //i to make it case insensitive
    //Author contain word Mosh
    //.find({ author: /.*Mosh.*/i})
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ price: -1})
    .select({ name: 1, author: 1, price: 1});
    //.countDocuments();
    
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();

//eq - equal
//ne -not equal
//gt - grater than
//gte - greater than or equal
//lt -  less than
//lte - less than or equal to
//in
//nin - not in

//or
//and