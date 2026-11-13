import db from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

async function Register(req, res) {
    try {

        const {nom, email, password} = req.body || {};

        if (!nom || !email || !password) {
            return res.status(400).json({
                message: "Veuillez remplir tous les champs"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const getEmailUserQuery = `SELECT id FROM admin WHERE email = $1`

        const user = await db.query(getEmailUserQuery, [normalizedEmail]);

        if (user.rows.length > 0) {
            return res.status(409).json({
                type: "email",
                message : "Cet email existe deja"
            });
        };

        const passwordCrypt = await bcrypt.hash(password, 12);
        const createUserQuery = `INSERT INTO admin (nom, email, mot_de_passe) VALUES ($1, $2, $3) RETURNING id, nom, email`;

        const newUserResult = await db.query(createUserQuery,
            [nom, normalizedEmail, passwordCrypt]
        );

        res.status(201).json({
            message: "Votre compte a été créé avec succès",
            admin : {
                id: newUserResult.rows[0].id,
                nom: newUserResult.rows[0].nom,
                email: newUserResult.rows[0].email
            }
        })
        
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Une erreur est survenue lors de la création du compte"
        });
    }
}




async function Login(req, res) {
    try {

        const {email, password} = req.body;

        const normalizedEmail = email?.trim().toLowerCase()

        const getEmailUser = `SELECT * FROM admin WHERE email = $1`

        const result = await db.query(getEmailUser, [normalizedEmail]);

        if (result.rows.length===0) {
            return res.status(404).json({
                type: "email",
                message : "Cet adresse email n'existe pas"
            })
        }

        const user = result.rows[0];

        const verify = await bcrypt.compare(password, user.mot_de_passe);

        if (!verify) {
            return res.status(401).json({
                type: "password",
                message : "Mot de passe incorrect"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure:  process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2*24*60*60*1000 
        });

        return res.status(200).json({
            message: "Connexion réussie",
            token: token,
            admin: {
                id: user.id,
                nom: user.nom,
                email: user.email
            }
        });
        
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);

        res.status(500).json({
            message: "Erreur lors de la connexion"
        });
    }
}



async function Logout(req, res) {

    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure:  process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({
            message: "Déconnexion réussie"
        });

    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);

        res.status(500).json({
            message: "Erreur lors de la déconnexion"
        });
    }
}


export  {
    Register,
    Login,
    Logout
}



/*

Avec pg (PostgreSQL), tu ne récupères pas un tableau de deux éléments.
const result = await db.query(
    'SELECT * FROM admin'
);


Tu récupères directement un objet :
{
    rows: [...],
    rowCount: 2,
    command: "SELECT",
    ...
}


Donc :
mysql2/promise	                        PostgreSQL (pg)
const [rows] = await db.query()	     const result = await db.query()
rows	                                  result.rows
rows.length	                            result.rows.length
result.insertId	                 result.rows[0].id avec RETURNING id
result.affectedRows	                        result.rowCount
result.changedRows	                 Pas d'équivalent direct identique


rows contient les lignes retournées par ta requête SQL.

[
    { id: 1, nom: 'Paul', email: 'paul@gmail.com' },
    { id: 2, nom: 'Marie', email: 'marie@gmail.com' },
    { id: 3, nom: 'Jean', email: 'jean@gmail.com' }
]

Donc :
- result.rows : toutes les lignes retournées.
- result.rows[0] : le premier objet (Paul).
- result.rows[1] : le deuxième objet (Marie).
- result.rows.length : le nombre de lignes retournées.



sameSite : il s'agit d'une option de securite pour les cookies. Elle indique au navigateur dans quelle situation le cookie doit être envoyé avec les requêtes. Il existe trois valeurs possibles pour sameSite : "Strict", "Lax" et "None".

strict : le cookie ne sera envoyé que si la requête provient du même site que celui qui a défini le cookie. Cela signifie que le cookie ne sera pas envoyé avec les requêtes provenant d'autres sites, même si l'utilisateur est connecté à ce site.

lax : le cookie sera envoyé avec les requêtes provenant du même site, ainsi qu'avec certaines requêtes provenant d'autres sites, comme les requêtes GET pour naviguer vers le site. Cela permet de maintenir une certaine sécurité tout en autorisant certaines interactions entre sites.

none : le cookie sera envoyé avec toutes les requêtes, qu'elles proviennent du même site ou d'autres sites. Cependant, pour utiliser cette option, le cookie doit être sécurisé (c'est-à-dire qu'il doit être transmis via HTTPS).
*/