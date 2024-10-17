export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
    
    res.status(statusCode).cookie(cookieName, token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,  // Prevents client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === 'production',  // Only send over HTTPS in production
        sameSite: 'Strict'  // Prevents CSRF attacks by limiting cross-site requests
    }).json({
        success: true,
        message,
        user,
        token,
    });
};
