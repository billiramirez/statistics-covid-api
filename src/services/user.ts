import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { keys } from "../config/keys";
import Token from "../models/tokens";
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
    const token = generateLoginToken(user, false);
    const refreshToken = generateLoginToken(user, true);

    await Token.updateOne({ userId: user.id }, { $set: { refreshToken } });

    return {
      token,
      refreshToken,
    };
  }

  return null;
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const signUp = async (
  email: string,
  password: string,
): Promise<{ token: string; refreshToken: string } | null> => {
  const newPassword = await createPassword(password);
  const userInstance = new User({ email: email, password: newPassword });
  const newUser = await userInstance.save();

  if (!newUser) return null;

  const token = generateLoginToken(newUser, false);
  const refreshToken = generateLoginToken(newUser, true);

  if (token && refreshToken) {
    // Save the new refresh token
    const newToken = new Token({ refreshToken, userId: newUser.id });
    const savedToken = await newToken.save();

    if (!savedToken) return null;

    return {
      token,
      refreshToken,
    };
  }

  return null;
};

export const generateLoginToken = (user: any, refresh: boolean) => {
  if (!user) {
    throw new Error("Invalid User");
  }

  const userInfo = user.toJSON();
  delete userInfo.password;

  const payload = {
    user: userInfo,
  };
  if (!keys.authToken || !keys.authRefreshToken) return;
  const token = jwt.sign(
    payload,
    !refresh ? keys.authToken : keys.authRefreshToken,
    {
      algorithm: "HS256",
      expiresIn: !refresh ? "1h" : "5h",
      subject: `${user.id}`,
    },
  );
  return token;
};
