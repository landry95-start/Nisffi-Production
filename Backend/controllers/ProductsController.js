
import db from "../config/db.js";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Convertit un chemin URL en chemin physique sur le serveur
const getImagePath = (imageUrl) => {
    if (!imageUrl || !imageUrl.startsWith("/uploads/")) {
        return null;
    }

    return path.resolve(__dirname, "..", imageUrl.slice(1));
};


// Supprime les fichiers envoyés par Multer
const deleteUploadedFiles = async (files = []) => {
    await Promise.all(
        files.map(async (file) => {
            try {
                await fs.unlink(file.path);
            } catch (error) {
                if (error.code !== "ENOENT") {
                    console.error("Erreur suppression fichier :", error);
                }
            }
        })
    );
};


// Récupération de tous les produits et de leurs images
async function GetProducts(req, res) {
    try {
        const query = `
            SELECT
                p.*,
                c.nom AS categorie_nom,
                m.nom AS marque_nom,

                COALESCE(
                    json_agg(
                        DISTINCT jsonb_build_object(
                            'id', ip.id,
                            'url', ip.url
                        )
                    ) FILTER (WHERE ip.id IS NOT NULL),
                    '[]'
                ) AS images

            FROM produit p

            INNER JOIN categories c
                ON p.categorie_id = c.id

            LEFT JOIN marques m
                ON p.marque_id = m.id

            LEFT JOIN images_produits ip
                ON p.id = ip.produit_id

            GROUP BY p.id, c.nom, m.nom

            ORDER BY p.created_at DESC
        `;

        const result = await db.query(query);

        return res.status(200).json({
            produits: result.rows
        });

    } catch (error) {
        console.error("Erreur GetProducts :", error);

        return res.status(500).json({
            message: "Erreur lors de la récupération des produits"
        });
    }
}


// Ajout d'un produit et de ses images
async function AddProduct(req, res) {
    const files = Object.values(req.files || {}).flat();

    let client;
    let transactionStarted = false;

    try {
        const {
            nom,
            description,
            prix,
            ancien_prix,
            categorie_id,
            marque_id,
            stock,
            couleur,
            taille,
            univers
        } = req.body;

        // Récupération des fichiers
        const imagePrincipale = req.files?.image?.[0];
        const imagesSupplementaires = req.files?.images || [];

        // Vérification des champs obligatoires
        if (
            !nom?.trim() ||
            prix === undefined ||
            prix === "" ||
            !categorie_id ||
            !imagePrincipale
        ) {
            await deleteUploadedFiles(files);

            return res.status(400).json({
                message: "Veuillez remplir les champs obligatoires et ajouter une image principale"
            });
        }

        // Conversion des valeurs
        const prixFinal = Number(prix);

        const ancienPrixFinal =
            ancien_prix === "" || ancien_prix === undefined
                ? null
                : Number(ancien_prix);

        const categorieId = Number(categorie_id);

        const marqueId =
            marque_id === "" || marque_id === undefined
                ? null
                : Number(marque_id);

        const stockFinal =
            stock === "" || stock === undefined
                ? 0
                : Number(stock);

        // Validation numérique
        if (
            !Number.isFinite(prixFinal) ||
            prixFinal <= 0 ||

            (ancienPrixFinal !== null &&
                (
                    !Number.isFinite(ancienPrixFinal) ||
                    ancienPrixFinal <= prixFinal
                )) ||

            !Number.isInteger(categorieId) ||
            categorieId <= 0 ||

            (marqueId !== null &&
                (!Number.isInteger(marqueId) || marqueId <= 0)) ||

            !Number.isInteger(stockFinal) ||
            stockFinal < 0
        ) {
            await deleteUploadedFiles(files);

            return res.status(400).json({
                message: "Certaines valeurs numériques sont invalides"
            });
        }

        // Chemins des images
        const image = `/uploads/products/${imagePrincipale.filename}`;

        // Connexion dédiée à la transaction
        client = await db.connect();

        await client.query("BEGIN");
        transactionStarted = true;

        // 1. Insertion du produit
        const productQuery = `
            INSERT INTO produit (
                nom,
                description,
                prix,
                ancien_prix,
                image,
                categorie_id,
                marque_id,
                stock,
                couleur,
                taille,
                univers
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            RETURNING *
        `;

        const productValues = [
            nom.trim(),
            description || null,
            prixFinal,
            ancienPrixFinal,
            image,
            categorieId,
            marqueId,
            stockFinal,
            couleur || null,
            taille || null,
            univers || null
        ];

        const productResult = await client.query(
            productQuery,
            productValues
        );

        const nouveauProduit = productResult.rows[0];

        // 2. Insertion des images supplémentaires
        // Cette étape est facultative
        if (imagesSupplementaires.length > 0) {

            const imageValues = [];
            const placeholders = [];

            imagesSupplementaires.forEach((file, index) => {
                const position = index * 2;

                placeholders.push(
                    `($${position + 1}, $${position + 2})`
                );

                imageValues.push(
                    nouveauProduit.id,
                    `/uploads/products/${file.filename}`
                );
            });

            const imageQuery = `
                INSERT INTO images_produits (produit_id, url)
                VALUES ${placeholders.join(", ")}
                RETURNING *
            `;

            await client.query(imageQuery, imageValues);
        }

        // 3. Validation de la transaction
        await client.query("COMMIT");
        transactionStarted = false;

        return res.status(201).json({
            message: "Produit ajouté avec succès",
            produit: {
                ...nouveauProduit,
                images: imagesSupplementaires.map((file, index) => ({
                    id: null,
                    url: `/uploads/products/${file.filename}`
                }))
            }
        });

    } catch (error) {
        console.error("Erreur AddProduct :", error);

        if (client && transactionStarted) {
            await client.query("ROLLBACK");
        }

        // Nettoyage des fichiers si l'enregistrement échoue
        await deleteUploadedFiles(files);

        if (error.code === "23503") {
            return res.status(400).json({
                message: "La catégorie ou la marque sélectionnée n'existe pas."
            });
        }

        return res.status(500).json({
            message: "Erreur lors de l'ajout du produit"
        });

    } finally {
        if (client) {
            client.release();
        }
    }
}


// Suppression d'un produit et de toutes ses images
async function DeleteProduct(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Identifiant du produit invalide"
            });
        }

        // Récupération de l'image principale et des images supplémentaires
        const result = await db.query(
            `
                SELECT
                    p.image,
                    COALESCE(
                        json_agg(ip.url) FILTER (WHERE ip.id IS NOT NULL),
                        '[]'
                    ) AS images
                FROM produit p
                LEFT JOIN images_produits ip
                    ON p.id = ip.produit_id
                WHERE p.id = $1
                GROUP BY p.id
            `,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Produit introuvable"
            });
        }

        const imagePrincipale = result.rows[0].image;
        const imagesSupplementaires = result.rows[0].images;

        // Suppression du produit
        // ON DELETE CASCADE supprime aussi ses images en base
        await db.query(
            "DELETE FROM produit WHERE id = $1",
            [id]
        );

        // Suppression physique des images
        const toutesLesImages = [
            imagePrincipale,
            ...imagesSupplementaires
        ];

        await Promise.all(
            toutesLesImages.map(async (image) => {
                const imagePath = getImagePath(image);

                if (!imagePath) return;

                try {
                    await fs.unlink(imagePath);
                } catch (error) {
                    if (error.code !== "ENOENT") {
                        console.error("Erreur suppression image :", error);
                    }
                }
            })
        );

        return res.status(200).json({
            message: "Produit et images supprimés avec succès"
        });

    } catch (error) {
        console.error("Erreur DeleteProduct :", error);

        if (error.code === "23503") {
            return res.status(409).json({
                message: "Impossible de supprimer ce produit car il est utilisé ailleurs."
            });
        }

        return res.status(500).json({
            message: "Erreur lors de la suppression du produit"
        });
    }
}


export {
    GetProducts,
    AddProduct,
    DeleteProduct
};
