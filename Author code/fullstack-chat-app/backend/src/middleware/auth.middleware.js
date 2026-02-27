import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    //1 will look for the token in the cookies of the incoming request.
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    //2. in server.js cookie parser middleware is used to parse the cookies from the incoming request and make them available in req.cookies.
		// in this we hae user id in the payload of the token, so we can use that to find the user in the database and attach it to the req object for further use in the route handlers.
		const decoded = jwt.verify(token, process.env.JWT_SECRET);  //we have passed id and secret key while generating
		// jwt.verify() method is used to verify the token. 
		// It takes two arguments: the token to verify and the secret key that was used to sign the token.
		//  If the token is valid, it will return the decoded payload. 
		// If the token is invalid, it will throw an error.

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
