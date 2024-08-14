import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    age: {
        type: Number,
    }
}, {
    query: {
        byId(id) {return this.where({ _id: new mongoose.Types.ObjectId(id)})}
    }
})

const User = mongoose.model("User", userSchema);
 
export default User;