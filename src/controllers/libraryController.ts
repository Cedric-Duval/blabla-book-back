import { Sequelize } from "sequelize";
import { Book, Library } from '../models/association.model.js'


export const libaryController = {
    async getLibraryByUserId(req, res) {
        try {
            const user_id = req.params;
            const userLibrary = await Library.findByPk(user_id);
            console.log(JSON.stringify(userLibrary, null, 2));
            res.status(200).json(userLibrary);
        } catch (error) {
            res.status(500).json('Erreur interne du serveur');
        }
    },

    


}