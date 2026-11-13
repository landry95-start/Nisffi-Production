
import React, {
  useState,
  useContext,
  createContext,
  useEffect
} from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {

  
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("nisffi-cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Erreur de lecture du panier :", error);
      return [];
    }
  });

  // 2. Sauvegarder automatiquement chaque modification
  useEffect(() => {
    localStorage.setItem("nisffi-cart", JSON.stringify(cart));
  }, [cart]);


  //Fonction pour ajouter un produit
  const addCart = (produit) => {

    setCart((currentCart) => {

      const existe = currentCart.find(
        (item) => Number(item.id) === Number(produit.id)
      );

      if (existe) {

        return currentCart.map((item) => {

          if (Number(item.id) === Number(produit.id)) {

            const nouvelleQuantite =
              item.quantity + produit.quantity;

            return {
              ...item,
              quantity: Math.min(nouvelleQuantite, Number(item.stock))
            };

          }

          return item;
        });

      }

      return [
        ...currentCart,
        {
          ...produit,
          quantity: Math.min(
            produit.quantity,
            Number(produit.stock)
          )
        }
      ];

    });

  };


  //Fonction pour modifier la quantité
  const updateQuantity = (id, quantity) => {

    if (quantity < 1) return;

    setCart((currentCart) => {

      return currentCart.map((item) => {

        if (Number(item.id) === Number(id)) {

          return {
            ...item,
            quantity: Math.min(quantity, Number(item.stock))
          };

        }

        return item;

      });

    });

  };


  //Fonction pour vider le panier
  const removeCart = () => {
    setCart([]);
  };


  //Fonction pour supprimer un seul article
  const removeArticle = (id) => {

    setCart((currentCart) =>
      currentCart.filter(
        (item) => Number(item.id) !== Number(id)
      )
    );

  };

  //fonction pour passer la commande via Whatsapp

  const numeroAdmin = "237689090581";

  const commander = (produit) => {
    const message = `Bonjour Landry ! je souhaite commader ce produit.
    
    Produit: ${produit.nom}
    Prix : ${produit.prix}
    Reference : ${produit.id}

    Merci de confirmer la disponibilite
    
    `;

    const url = `https://wa.me/${numeroAdmin}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  }


  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        removeCart,
        removeArticle,
        updateQuantity,
        commander
      }}
    >
      {children}
    </CartContext.Provider>
  );

};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart doit être utilisé dans CartProvider");
  }

  return context;
};

export default CartProvider;

/*

  L'objet window est un objet global fourni par le navigateur. il represente la fenetre actuelle du navigateur
  dans laquelle ta page est ouverte.

  Il donne acces a plusieurs fonctionnalites du navigateur.

  windon.open()    ==> ouvre une nouvelle fenetre ou onglet.

  window.close()  ==> ferme une fenetre

  window.alert() ==> affiche une boite de dialogue


  2.Comprendre window.open()

  Dans notre code :

  window.open(url, "_blank");

  il y'a deux arguments :

  url : l'adresse que tu souhaites ouvrir.

  "_blank" : demande au navigateur d'ouvrir cette adresse dans un nouvel onglet ou une nouvelle fenetre.

*/
