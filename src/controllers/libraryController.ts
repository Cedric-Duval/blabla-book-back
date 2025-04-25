import { Sequelize } from "sequelize";
import { Book, Library, User } from '../models/association.model.js'
import { libraryUpdateSchema } from "../schemas/library.schema.js";
import { ZodError } from "zod";


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

    async updateLibraryName(req, res) {
        try {
            const { id } = req.params;
            const inputData = req.body;
            await libraryUpdateSchema.parseAsync(inputData);
            const userLibrary = await Library.findByPk(id);
            if(!userLibrary) {
                return res.status(404).json('Bibliothèque non trouvée');
            }
            await userLibrary.update(inputData);
            res.status(200).json(userLibrary);
        } catch (error) {
            if(error instanceof ZodError) {
                return res.status(400).json('Format des données non valide');
            }
            res.status(500).json('Erreur interne du serveur');
        }
    }

}