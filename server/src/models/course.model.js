import { Schema, model } from "mongoose";


const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
        },
        lectures: [
            {
                title: String,
                description: String,
                lecture: {
                    public_id: {
                        type: String,
                        required: true,
                    },
                    secure_url: {
                        type: String,
                        required: true,
                    },
                }
            }
        ],
        thumbnail: {
            public_id: {
                type: String,
                required: true,
            },
            secure_url: {
                type: String,
                required: true,
            },
        },
        numberOfLectures: {
            type: Number,
            default: 0
        },
        createdBy: {
            type: String,
            required: [true, 'Course instructor name is required'],
        },
    },
    {timestamps: true}
)

const Course = model('Course', courseSchema);

export default Course;