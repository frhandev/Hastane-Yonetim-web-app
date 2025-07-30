import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not Authorized. Please login again.",
      });
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.doctor = { id: decoded.id };

    next();
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Invalid or expired token." });
  }
};

export default authDoctor;
