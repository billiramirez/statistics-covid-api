import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface User {
  name: string;
  email: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

// 3. Create a Model.
const UserModel = model<User>("User", schema);

export default UserModel;

// run().catch(err => console.log(err));

// async function run(): Promise<void> {
//   // 4. Connect to MongoDB
//   await connect('mongodb://localhost:27017/test', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });

//   const doc = new UserModel({
//     name: 'Bill',
//     email: 'bill@initech.com',
//     avatar: 'https://i.imgur.com/dM7Thhn.png'
//   });
//   await doc.save();

//   console.log(doc.email); // 'bill@initech.com'
// }
