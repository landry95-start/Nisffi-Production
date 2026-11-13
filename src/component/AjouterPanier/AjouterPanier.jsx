import React from 'react'
import { useState } from 'react'
import Cart from '../../pages/Cart';

const AjouterPanier = ({produit}) => {

  const [cartCount, setCartCount] = useState([]);

    const ajouterArticle = ()=> {
        return (
            setCartCount((currentCartCount) => [...currentCartCount, produit])
        )
    }


  return (
    <Cart cartCount={cartCount} />
  )
}

export default AjouterPanier