
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createUpload = (folder) => {
    const uploadDir = path.join(__dirname, "../uploads", folder);

    fs.mkdirSync(uploadDir, { recursive: true });

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir);
        },

        filename: (req, file, cb) => {
            const extensions = {
                "image/jpeg": ".jpg",
                "image/png": ".png",
                "image/webp": ".webp"
            };

            const extension = extensions[file.mimetype];

            cb(null, randomUUID() + extension);
        }
    });

    const fileFilter = (req, file, cb) => {
        const formatsAutorises = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (formatsAutorises.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Format d'image non autorisé"), false);
        }
    };

    return multer({
        storage,
        fileFilter,
        limits: {
            fileSize: 2 * 1024 * 1024
        }
    });
};

export const uploadProduct = createUpload("products");





/*

    Pose toi 3 questions :

1. Ou je mets le fichier ? ---> la destination

2. Comment je l'appelle ? ---> le filename

3. Quel champ du formulaire contient mon fichier ?

_dirname = "dossier du fichier actuel"

_filename = "le fichier actuel avec son nom"


(
    __dirname, ----> le dossier ou est ton fichier actuel
    "../uploads/category"
) signifie : cherche le dossier category en suivant ce chemin



path = outil qui permet d'acceder au chemin
fs = l'outil qui va te permettre de toucher aux dossiers ou fichiers

mkdirSync = cree le dossier tout de suite

recursive : true --> creer tous les dossiers parents si besoin et ne plante pas s'il existe deja

fs.mkdirSync(uploadDir, {recursive: true});

tu fournir l'adresse a fs et tu lui demandes de creer le dossier s'il n'existe pas


(
    __dirname, ----> le dossier ou est ton fichier actuel
    "../uploads/category"

)  Ici tu construis en quelque sorte une adresse
*/