//ts-check
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://appuser:appuser@cluster0-xbqqh.mongodb.net/mongo-exercises?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(() => console.log('Connected to the DB'))
.catch(err => console.error('Not connecte', err));

const courseSchema = new mongoose.Schema({
    //"_id": false,
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 30,
        //match: /pattern/
        //lowercase: true,
        uppercase: true,
        trim: true
        },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    //tags: [ String ], Applying custom validators
    tags: {
        type: Array,
        validate: {
            //callback based
            isAsync: true, //Async validators, when you want to validate something from the file or external service
            validator: function(v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000)
                
            },
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: { 
        type: Number,
        required: function() { return this.isPublished; }, //Conditional validations
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
})

const Course = mongoose.model('Course', courseSchema); //compile the schema to a class

async function createCourse() {
    const course = new Course({
        name: 'C# course Advance',
        author: 'Jeromy Iron',
        tags: ['Angular', 'frontend'],
        //tags: [],
        category: 'web',
        price: 45.95, 
        isPublished: true
    });
    try{
        //await course.validate();
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        //console.log(ex.message);    
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
    
   
}

async function getCourses(){
    //const pageNumber = 1
    //const pageSize = 10
    return await Course
    .findById('5a68fdd7bee8ea64649c2777')
    //.find({ isPublished: true, tags: { $in: ['frontend', 'backend']}})
    //.find({ isPublished: true})
    //.or([{price: { $gte: 15 }}, { name: /.*by.*/i}])
    // .find()
    // .or([{ author: 'Moshs'}, { isPublished: true}])
    //Starts with Mosh
    //.find({ author: /^Mosh/})

    //Ends with Hamedani
    //.find({ authero:/Hamedani$/i }) //i to make it case insensitive
    //Author contain word Mosh
    //.find({ author: /.*Mosh.*/i})
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    // .sort({ price: -1})
    .select({ name: 1, author: 1, price: 1});
    //.countDocuments();
    
}

async function run(){
    console.log('inside run');
    await createCourse();
    //const courses = await getCourses();
    //await updateCourse('5a68fde3f09ad7646ddec17e');
    //await removeCourse('5a68fdc3615eda645bc6bdec');
    console.log('back in run')
    //console.log(courses);
}

async function updateCourse(id) {
    console.log('in update : ', id)
    const c1 = await Course.findById(id);
    console.log('fetched course : ', c1);

    // ** find and update
    // const course = await Course.findById(id);
    // if (!course) return;

    // course.author = 'Manjula Liyanage';
    // const result = await course.save();
      
    // console.log(result);

    //** direct update */
    const course = await Course.findByIdAndUpdate(id, { author: 'Jason Bourne' }, { new: true }); //, 
    // const result = await Course.findOneAndUpdate({ _id: id }, {   
    //     $set: { name: 'Functional Programming' }}, { new: true })
    console.log(course);
}

async function removeCourse(id) {
    console.log('in remove course : ', id)
    //const result = await Course.deleteOne({ _id: id} );
    const course = await Course.findByIdAndDelete(id);
    console.log(course);
    
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