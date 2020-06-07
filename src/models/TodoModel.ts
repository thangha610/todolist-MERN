import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    id: Number,
    title: { 
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    }
})

export const TodoItem = mongoose.model("TodoItem", TodoSchema);