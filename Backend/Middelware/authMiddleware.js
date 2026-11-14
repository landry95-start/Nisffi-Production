import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Authentification requise"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.admin = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Session invalide ou expirée"
        });
    }
};

export default authMiddleware;
