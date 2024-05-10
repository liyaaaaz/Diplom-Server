import jwt from 'jsonwebtoken';

export const verifyToken = async (req,res,next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret124');

            req.userId = decoded._id;
            next();
        } catch (e) {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }

    } else {
        return res.status(403).json({
            message: 'Нет доступа',
        });
    }

}

export const verifyAdminToken = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, 'secret124');
            const user = req.user = await User.findById(decoded.id).select("-password");

            if (user.role !== "admin") {
                return res.status(403).json({ error: "Ошибка доступа" })
            }

            next();

        } catch (err) {
            res.status(401).json({ error: "Не авторизован" });
        }
    } else res.status(401).json({ error: "Ошибка получения токена" })
};