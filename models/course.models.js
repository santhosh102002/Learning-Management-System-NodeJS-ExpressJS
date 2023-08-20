const mongoose= require('mongoose');

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true,'Title is requried'],
        minLength:[8,'Title must be at least 8 characters'],
        maxLength:[59,'Title should be less than 60 characters'],
        trim: true
    },
    description:{
        type:String,
        required: [true,'Description is required'],
        minLength:[8,'Description must be at least 8 characters'],
        maxLength:[200,'Description should be less than 200 characters'],
        trim: true
    },
    category:{
        type:String,
        required:[true,'Category is required']
    },
    thumbnail:{
        public_id:{
            type:String,
            required: true
        },
        secure_url:{
            type:String,
            required: true
        }

    },
    lectures:[{
        title:String,
        description:String,
        lecture:{
            public_id:{
                type:String
            },
            secure_url:{
                type:String
            }
            
        }
    }],
    numbersOfLectures:{
        type: Number,
        default: 0,
        required: true
    },
    createdBy:{
        type: String,
        required: true
    }
},{ timestamps: true})


const Course = new mongoose.model('Course',courseSchema)

module.exports = Course;