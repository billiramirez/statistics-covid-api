import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { keys } from "../config/keys";
import User from "../models/user";

export const createPassword = async (password: string) => {
  const passwordHashed = await bcrypt.hash(password, 10);
  return passwordHashed;
};

export const checkPassword = async (
  password: string,
  passwordHashed: string,
) => {
  const isTheSamePassword = await bcrypt.compare(password, passwordHashed);
  return isTheSamePassword;
};

export const signIn = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }
  if ((await checkPassword(password, user.password)) === true) {
    return generateLoginToken(user);
  }

  return null;
};

export const findUserByEmail = async (email: string) => {
  console.log("email ", email);
  return await User.findOne({ email });
};

export const signUp = async (email: string, password: string) => {
  const newPassword = await createPassword(password);
  const userInstance = new User({ email: email, password: newPassword });
  const newUser = await userInstance.save();

  if (!newUser) return null;

  return generateLoginToken(newUser);
};

export const generateLoginToken = (user: any) => {
  if (!user) {
    throw new Error("Invalid User");
  }

  const userInfo = user.toJSON();
  delete userInfo.password;

  const payload = {
    user: userInfo,
  };
  if (!keys.authToken) return;
  const token = jwt.sign(payload, keys.authToken, {
    algorithm: "HS256",
    expiresIn: "1h",
    subject: `${user.id}`,
  });
  return token;
};
