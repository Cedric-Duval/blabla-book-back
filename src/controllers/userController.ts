import { Sequelize } from "sequelize";
import { User } from "../models/association.model.js";

export const userController = {
    async getUserDatas(req, res) {
        try {
            const id = req.user.id;

            const user = await User.findByPk(id, {
                attributes: { exclude: ['password'] }
            });
            
            if(!user) {
                return res.status(404).json('Utilisateur non trouvé');
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json('Erreur interne du serveur');
        }
    }
}