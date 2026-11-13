import db from '../config/db.js'
import fs from "node:fs";

async function AddCategory(req, res) {
    
    try {
            const {nom, description, slug, ordre } = req.body;

            if (!nom || !req.file) {
                return res.status(400).json({
                    message: "le nom et la photo sont obligatoire est obligatoire"
                })
            }


             const slugFinal = slug?.trim() ||
                nom.trim()
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "");

            //On recupere le chemin de l'image

            const image_url = `/uploads/categories/${req.file.filename}`

            const createCategory = `INSERT INTO categories (nom, slug, description, image_url, ordre_affichage)
                                    VALUES($1, $2, $3, $4, $5) RETURNING *`;

            const result = await db.query(createCategory, [
                nom.trim(),
                slugFinal,
                description || null,
                image_url,
                Number(ordre)
            ]);


            return res.status(201).json({
                message : "categorie ajoute avec succes",
                categorie: result.rows[0]
            });
        } catch (error) {

            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error(err);
                });
            }
        
        res.status(500).json({
            message: "Erreur lors de l'ajout de la categories"
        })
    }
    
};


async function GetCategories(req, res) {

    try {
        const getCategoryQuery = `SELECT * FROM categories ORDER BY ordre_affichage ASC`;

        const result = await db.query(getCategoryQuery);

        res.status(200).json({
            categories: result.rows
        })
    }
    catch(error){
        res.status(500).json({
            message : "Erreur lors de la recuperation des categories"
        })
    }
};


async function setCategories(req, res) {

    try {

        const { nom, slug, description, ordre } = req.body;

        const id = req.params.id;

        // Si aucune nouvelle image n'est envoyée,
        // image_url sera null et PostgreSQL gardera l'ancienne.
        const image_url = req.file
            ? `/uploads/categories/${req.file.filename}`
            : null;

        const updateQuery = `
            UPDATE categories
            SET
                nom = $1,
                slug = $2,
                description = $3,
                image_url = COALESCE($4, image_url),
                ordre_affichage = $5
            WHERE id = $6
            RETURNING *
        `;

        const result = await db.query(updateQuery, [
            nom.trim(),
            slug,
            description || null,
            image_url,
            Number(ordre),
            id
        ]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Catégorie introuvable"
            });
        }

        return res.status(200).json({
            message: "Catégorie modifiée avec succès",
            categorie: result.rows[0]
        });

    } catch (error) {

        console.error("Erreur modification :", error);

        return res.status(500).json({
            message: "Erreur lors de la modification de la catégorie"
        });
    }
}


async function deleteCategory(req, res) {
    try {
        const id = req.params.id;

        const deleteCategoryQuery = `DELETE FROM categories WHERE id = $1 RETURNING *`;

        const result = await db.query(deleteCategoryQuery, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Categorie introuvable"
            });
        }

        res.status(200).json({
            message: "Categorie supprime avec succes",
            categorie: result.rows[0]
        });
    } catch (error) {
        console.error("Erreur suppression :", error);
        res.status(500).json({
            message: "Erreur lors de la suppression de la categories"
        });
    }
        
}

export {AddCategory, GetCategories, deleteCategory, setCategories}



/*

Quand on fait :

const result = await db.query(setCategoryQuery,[...])


resultat contient :

{

    command : 'SELECT' ou 'UPDATE' ou 'DELETE' ou 'INSERT',
    rowCount: combien de lignes ont ete touchees par la requetes
    rows : [], // contient les donnees que l'on veut recuperer avec SELECT ou Les donnees que l'on a retourne 
            avec RETURNING
    field : [...] // il contient les informations sur les colonnes
}


*/