import mongoose from "mongoose";

const {objectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: "no image available"
    },
    author:{
        type: objectId,
        ref: "logAuth"
    }
})

export default mongoose.model("usrPost", postSchema);