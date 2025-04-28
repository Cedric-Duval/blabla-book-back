import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/association.model.js';


export const authMiddleware = {
    async authorization(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) return res.status(401).json('Token manquant');

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findByPk(decoded.id);
            if(!user) return res.status(401).json('Utilisateur non trouvé');

            req.user = user;
            next();
        } catch (error) {
            res.status(401).json('Token invalide');
        }
    }
}