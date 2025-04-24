import { Sequelize } from "sequelize";
import { Book, Library, User } from '../models/association.model.js'


export const libraryController = {
    async getLibraryByUserId(req, res) {
        try {
            const { id } = req.params;
            console.log(id);
            const userLibrary = await Library.findOne({
                where: { user_id: id }
            });
            console.log(JSON.stringify(userLibrary, null, 2));
            res.status(200).json(userLibrary);
        } catch (error) {
            res.status(500).json('Erreur interne du serveur');
        }
    },

}