// import jwt from 'jsonwebtoken';
// import { errorHandler } from './error.js';
// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   console.log(token)
//   if (!token) {
//     return next(errorHandler(401, 'Unauthorized'));
//   }
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return next(errorHandler(401, 'Unauthorized'));
//     }
//     req.user = user;
//     next();
//   });
// };


import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log('🔐 Received Token:', token); // This logs the token

  if (!token) {
    console.warn('❌ No token found in cookies');
    return next(errorHandler(401, 'Unauthorized'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('❌ Token verification failed:', err.message);
      return next(errorHandler(401, 'Unauthorized'));
    }

    console.log('✅ Token verified successfully. User payload:', user);
    req.user = user;
    next();
  });
};
