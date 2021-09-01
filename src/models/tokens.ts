import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface Token {
  refreshToken: string;
  userId: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<Token>({
  refreshToken: { type: String, required: true },
  userId: { type: String, required: true },
});

// 3. Create a Model.
const TokenModel = model<Token>("Token", schema);

export default TokenModel;
