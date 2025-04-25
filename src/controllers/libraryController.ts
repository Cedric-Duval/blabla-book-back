import { Sequelize } from "sequelize";
import { Book, Library, User } from '../models/association.model.js'
import { libraryCreateSchema, libraryUpdateSchema } from "../schemas/library.schema.js";
import { ZodError } from "zod";


export const libraryController = {
    async getLibrariesByUserId(req, res) {
        try {
            const { id } = req.params;
            const userLibraries = await Library.findAll({
                where: { user_id: id }
            });
            console.log(JSON.stringify(userLibraries, null, 2));
            res.status(200).json(userLibraries);
        } catch (error) {
            res.status(500).json('Erreur interne du serveur');
        }
    },

    async getLibraryById(req, res) {
        try {
            const { id } = req.params;
            const userLibrary = await Library.findByPk(id);
            console.log(JSON.stringify(userLibrary, null, 2));
            res.status(200).json(userLibrary);
        } catch (error) {
            res.status(500).json('Erreur interne du serveur');
        }
    },

    async createNewLibrary(req, res) {
        try {
            const inputData = req.body;
            inputData.user_id = req.user.id; // Get the user_id through JWT auth middleware (not done yet)
            await libraryCreateSchema.parseAsync(inputData);
            const newLibrary = await Library.create(inputData);
            res.status(201).json(newLibrary);
        } catch (error) {
            if(error instanceof ZodError) {
                return res.status(400).json('Format des données non valide');
            }
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