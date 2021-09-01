import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface User {
  email: string;
  password: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// 3. Create a Model.
const UserModel = model<User>("User", schema);

export default UserModel;
