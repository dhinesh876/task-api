const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {  

  try
  {
  const token = req.headers['authorization'].split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => 
  {
    if (err) {
      res.status(403).json({ error: 'Invalid token' });
    }

    req.user = decoded;
  });

  next();
   }
  catch(err) //this also err send res as 404 with err message
  {
      res.status(404).json({status : false, message : err.message});
  }
}

module.exports = authMiddleware;
