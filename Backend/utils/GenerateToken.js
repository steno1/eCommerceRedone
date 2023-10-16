import jwt from 'jsonwebtoken';

const GenerateToken = (res, userId) => {
  // If user exists and password matches
  const token = jwt.sign({ userId},
     process.env.JWT_SECRET, {
    expiresIn: "30d" // Generating a JSON Web Token
  });

  // Setting JWT as HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000 // Expiry time of the cookie (30 days)
  });

  //return null; // You need to return something from the component
}

export default GenerateToken;
