import mongoose from "mongoose";
const { Schema, models } = mongoose;

const UserSchema = new Schema(
  {
    fristname: String,
    lastname: String,
    email: String,
    password: String,
    UserInfo: Array,
    image: String,
  },
  {
    timestamps: true,
  }
);
// Create a model based on that schema, and change the name of the model to match your liking.
const UserModel = models.User || mongoose.model("User", UserSchema);

export default UserModel;
