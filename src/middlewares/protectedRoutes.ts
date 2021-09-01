import passport from "passport";

const protectedRoute = (req: any, res: any, next: any) => {
  passport.authenticate("jwt", (err: any, user: any) => {
    if (!user) {
      return res.status(401).json({
        error: { message: "UNAUTHORIZED_OPERATION" },
      });
    }
    if (err) {
      return res
        .status(500)
        .json({ error: { message: "INTERNAL_SERVER_ERROR" } });
    }
    // This means the user is verify so, lets modify the req, and call next()
    req.user = user;
    return next();
  })(req, res, next);
};

export default protectedRoute;
