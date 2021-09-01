const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractStrategy = require("passport-jwt").ExtractJwt;
import { keys } from "../config/keys";

const authMiddleware = (req: any, res: any, next: any) => {
  const authStrategy = new JwtStrategy(
    {
      secretOrKey: keys.authToken, // TODO: move this value into a .env file
      // for testing we need this since we need the login page to request the login
      algorithms: ["HS256"],
      ignoreExpiration: false,
      jwtFromRequest: ExtractStrategy.fromAuthHeaderWithScheme("Bearer"), // Authorization: Bearer <Token>
    },
    async (payload: any, done: any) => {
      const id = parseInt(payload.sub, 10);
      if (id) {
        done(null, id);
      } else {
        done(null, false);
      }
    },
  );
  passport.use(authStrategy);
  next();
};

export default authMiddleware;
