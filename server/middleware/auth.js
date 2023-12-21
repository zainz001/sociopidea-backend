import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const isCustomAuth = token.length < 500;

      let decodedData;

      if (token && isCustomAuth) {      
        decodedData = jwt.verify(token, secret);
        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;
      }
    } // If there's no Authorization header, continue without setting req.userId

    next();
  } catch (error) {
    console.log(error);
    next(); // Continue even if there's an error in decoding/verifying the token
  }
};

export default auth;
