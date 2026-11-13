
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import back from '../assets/back.png'

const products = [
  {id:1, name: "sac a main", image: "../../src/assets/sac5.png"},
  {id:2, name: "Bijoux", image: "../../src/assets/colier.png"},
  {id:3, name: "Foulards", image: "../../src/assets/foulard.png"},
  {id:4, name: "Montres", image: "../../src/assets/montre6.png"},
  {id:5, name: "Lunettes", image: "../../src/assets/lunette.png"},
  {id:6, name: "Lunettes", image: "../../src/assets/sac5.png"},
  {id:7, name: "chapeau", image: "../../src/assets/casquette.png"},
  {id:8, name: "maillot", image: "../../src/assets/sac5.png"}
]

const categories = [
  {id: 1, image: "../../src/assets/backgroundCard/sacCard.png", title:"Élégance & praticité", category:"Sacs à main"},
  {id: 2, image: "../../src/assets/backgroundCard/bijouxCard.png", title:"Brillez en toute occasion", category:"Bijoux"},
  {id: 3, image: "../../src/assets/backgroundCard/lunetteCard.png", title:"Un regard affirmé", category:"Lunettes"},
  {id: 4, image: "../../src/assets/backgroundCard/montreCard.png", title:"Le temps du style", category:"Montres"}
]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const item = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut"
    }
  }
}

const Femmes = () => {
  return (
    <>
      {/* Bannière */}
      <section className='relative w-full h-[350px] sm:h-[400px] md:h-[480px] lg:h-[500px] overflow-hidden'>

        <img
          src={back}
          alt=''
          className='absolute inset-0 z-0 w-full h-full object-cover object-top'
        />

        <motion.div
          className='relative z-10 px-4 sm:px-6 md:px-10 lg:px-12 py-10 sm:py-12'
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.h4 className="mb-4 text-xs font-medium" variants={item}>
            LA TOUCHE FINALE
          </motion.h4>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-[#4A1D2B]"
            variants={item}
          >
            Accessoires <br/>pour femmes
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md text-xs sm:text-sm md:text-base leading-6 text-white/90"
            variants={item}
          >
            Des details precieux, des pieces intemporelles et des tendances qui revelent votre personnalite
          </motion.p>
        </motion.div>
      </section>

      {/* Catégories */}
      <section className='flex flex-col lg:flex-row gap-8 items-start lg:items-center lg:gap-12 px-4 sm:px-6 md:px-8 py-10'>

        <div className='flex flex-col items-start gap-2 lg:w-[200px] shrink-0'>
          <h4 className='text-[15px] mb-2 font-bold'>
            CATEGORIES
          </h4>

          <h2 className="text-[28px] leading-[0.95] font-['Playfair_Display']">
            Nos accessoires
          </h2>

          <p className="mt-3 max-w-[200px] font-['Playfair_Display'] text-[13px] leading-5 sm:text-base">
            Trouvez la categorie qui vous correspond
          </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2 w-full'>

          {products.map((product) => (
            <NavLink to="/boutique" key={product.id}>

              <motion.div
                className='cursor-pointer flex flex-col gap-2 bg-pink-100 py-5 sm:py-8 px-2 sm:px-3 rounded-xl group h-full'
                variants={item}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.97 }}
              >

                <div className='w-full h-20 sm:h-25 flex items-center justify-center'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-full object-contain'
                  />
                </div>

                <div className='flex items-center justify-between gap-1'>
                  <p className="text-[11px] sm:text-[13px] font-bold text-red-800 font-['Playfair_Display']">
                    {product.name}
                  </p>

                  <span className='text-xl transition-transform group-hover:translate-x-1 shrink-0'>
                    <ArrowRight className='w-4 h-4 sm:w-[20px] sm:h-[20px] text-red-800'/>
                  </span>
                </div>

              </motion.div>

            </NavLink>
          ))}

        </div>
      </section>

      
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-6 md:px-8 py-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >

        {categories.map((items) => (
          <motion.div
            key={items.id}
            className="relative h-64 overflow-hidden rounded-lg group"
            variants={item}
            whileHover={{ scale: 1.03, y: -8 }}
          >

            <img
              src={items.image}
              alt={items.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-5 text-white">

              <div>
                <p className="text-xs uppercase tracking-widest">
                  {items.category}
                </p>

                <h3 className="mt-2 font-semibold text-lg">
                  {items.title}
                </h3>
              </div>

              <span className="text-xl transition-transform group-hover:translate-x-1">
                <ArrowRight />
              </span>

            </div>

          </motion.div>
        ))}

      </motion.div>
    </>
  )
}

export default Femmes







/*

Notion de input radio

const [taille, setTaille] = useState(""); // memoire vide au depart

<div>
  <input type="radio" name="taille" value="M" ckecked={taille==="M"} onchange((e) => setTaille(e.target.value))/>
  <input type="radio" name="taille" value="S"  ckecked={taille==="S"} onchange((e) => setTaille(e.target.value))/>
</div>


ckecked={taille==="S"} : Est-ce que la variable taille est égale à "S" ? Si oui, coche ce bouton. Sinon, ne le coche pas.

Supposons que tu aies cet état :
const [taille, setTaille] = useState("S");


La variable taille contient initialement "S".

Donc :
checked={taille === "S"}  // true
checked={taille === "M"}  // false
checked={taille === "L"}  // false


Seul le bouton S sera coché.

Si taille devient "M", React réévalue les expressions :
checked={taille === "S"}  // false
checked={taille === "M"}  // true
checked={taille === "L"}  // false



Voici le cycle complet lorsque l'utilisateur passe de S à M.


1. L'utilisateur clique sur M

Le bouton possède value="M".


2. onChange récupère "M"

e.target.value vaut "M".


3. setTaille("M")

L'état React est mis à jour.


4. React recalcule les checked

M est coché, S est décoché.

Formulaire

Il faut savoir que dans un formulaire a chaque champ on associe un nom 

car le serveur doit pouvoir identifier le nom du champ + valeur

Maintenant si deux champs possedent le meme nom la valeur du premier champ sera ecrase par le deuxieme

Exemple :

<input type="name" value="Fosso" /> // champ pour le nom normalement
<input type="name" value="landry" /> // champ pour le prenom normalement

mais sauf le serveur va recevoir un seul champ 

{
  name : "landry" donc dans ta page profil par exemple le nom sera landry et le prenom n'existe pas
}

c'est le meme principe en css

div{
  color : "red",
  color: "blue" //red sera annule
}


pour l'input radio c'est excellent car  on a une question avec plusieurs options differentes

<input type="radio" name="taille" value="s" />
<input type="radio" name="taille" value="m" />
<input type="radio" name="taille" value="l" />
<input type="radio" name="taille" value="xl" />

{
  taille : // ici quand tu choisis une option react ecrase la valeur precedente du champ par la nouvelle valeur
}



// systeme de filtrage

const vetements = [
  {id: 1, nom: "Chemise", taille: "M"},
  {id: 2, nom: "Robe", taille: "L"},
  {id: 3, nom: "Pantalon", taille: "S"},
  {id: 4, nom: "Jupe", taille: "S"}
]

const [filtre, setFiltre] = useState("tous"); //donc toutes les tailles sont affichees

//Filtrage

const vetementsFiltre = vetements.filter((item) => {
  if (filre === "tous") return true
  return item.taille===filtre
})



isActive est une propriete d'un objet uniquement fourni par NavLink de react-router-dom. Link, normal ne le fournit pas.

Donc NavLink va passer un objet :

{
  isActive,
  isPending
}

dans className et style


isActive = si le bouton est active (true)  sinon false

*/