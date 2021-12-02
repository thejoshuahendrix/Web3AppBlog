import * as mongoose from "mongoose";

export interface TodoI {
    title: string;
    description?: string;
    done: boolean;
    comments: [];
    likes: number;
}

const TodoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String,
    },
    done: {
        type: Boolean,
        default: false
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ]
}, {
    timestamps: true
});

export const Todo = mongoose.model("todos", TodoSchema);
