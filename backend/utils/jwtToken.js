// creating token and saving in cookie

const sendToken = (user, statusCode, res) => {
    // Generate JWT token
    const token = user.getJWTToken();
  
    // Options for the cookie
    const options = {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000), // Set the expiration time for the cookie
      httpOnly: true, // Ensures that the cookie is only accessible through HTTP(S) requests, not JavaScript
    };
  
    // Set the cookie in the response
    res.cookie('token', token, options);
  
    // Send a response with the token
    res.status(statusCode).json({
      status: 'success',
      token,
      user
    });
  };
  
  module.exports = sendToken;
  