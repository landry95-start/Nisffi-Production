import React from 'react'
import PromoBar from '../component/PromoBar'
import Header from '../component/Header'
import MainNavbar from '../component/MainNavbar'
import CategorySidebar from '../component/CategorySidebar'
import { Outlet } from 'react-router-dom'

const ShopLayout = () => {
  return (
    <div>
        <Header />
        <Outlet/>
    </div>
  )
}

export default ShopLayout

/*

Outlet est simplement l'emplacement où React Router insère la page correspondant à l'URL actuelle.


Si tu visites /, Outlet affiche Home.

Si tu visites /boutique, Outlet affiche Shop.

Si tu visites /categorie/femme, Outlet affiche CategoryPage.

*/