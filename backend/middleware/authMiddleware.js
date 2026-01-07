// backend/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

// yah 'protect' our security guard
export const protect = async (req, res, next) => {
  let token;

  //  ham chek ka rahe hai ki reqiest ke sath authorization hesad hai
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // tokan nikalna
      token = req.headers.authorization.split(' ')[1];

      // tokan jwt_secret ki se verify karta hai
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 
      // if tokan is correct than userif req.users and save it
      //  tokan bante time id save ki thi
      req.user = decoded; // yah { id: '...' } jaise dikhega 

      //  if everything done than do next work ( 'createJob')
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  }

  //  in valid tokan 
  if (!token) {
    res.status(401).json({ msg: 'Not authorized, no token' });
  }
};