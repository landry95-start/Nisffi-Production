
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ShopLayout from './layouts/ShopLayout'
import Home from './pages/Home'
import Nouveaute from './pages/Nouveaute'
import Femmes from './pages/Femmes'
import Hommes from './pages/Hommes'
import Accessoires from './pages/Accessoires'
import Boutique from './pages/Boutique'
import IntroPage from './pages/IntroPages'
import Details from './pages/Details'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import ProductFormPage from './component/ProductFormPage'
import ProtectedRoute from './component/ProtectedRoute'

import CartProvider from './component/CartProvider'
import Cart from './pages/Cart'
import ContextCategory from './component/DashboardAdmin/ContextCategory'
import ContextProduct from './component/DashboardAdmin/ContextProduct'

function App() {

    return (
        <BrowserRouter>
            <CartProvider>
                <ContextCategory>
                    <ContextProduct>
                        <Routes>

                            <Route element={<ShopLayout />}>
                                <Route path="/" element={<IntroPage />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/homme" element={<Nouveaute />} />
                                <Route path="/femme" element={<Femmes />} />
                                <Route path="/article" element={<Hommes />} />
                                <Route path="/accessoires" element={<Accessoires />} />
                                <Route path="/boutique" element={<Boutique />} />
                                <Route path="/details" element={<Details />} />
                                <Route path="/cart" element={<Cart />} />
                            </Route>

                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            <Route element={<ProtectedRoute />}>
                                <Route path="/admin" element={<Admin />} />
                                <Route path="/admin/product-form" element={<ProductFormPage />} />
                            </Route>

                        </Routes>
                    </ContextProduct>
                </ContextCategory>
            </CartProvider>
        </BrowserRouter>
    )
}

export default App



/*

Les parties de l'URl :

https://www.maboutique.com:443/products/sac-marron?couleur=noir&&taille=M#avis

1. https : // = le protocole (comment on parle au serveur )


2. www.maboutique.com : il s'agit du domaine (Chez qui on va ?)

3. :443 = le port?

4. /products/sac-marron : il s'agit du chemin pour acceder a une page de ressources

/ = Accueil

/products = liste des produits

/sac-marron = Detail d'un produit


5. ?couleur = noir&taille = M il s'agit du query il sert de filtre

on ne change pas de page, on filtre juste la meme page 


6.#avis = Le Hash / Ancre il s'agit : "ou exactement sur la page ?"

on ne recharge pas la page. Ca fait juste descendre jusqu'a la section qui a id="#avis"

7. params joue un peu le meme role que query ?

il s'agit d'une partie de l'URL qui change selon le numero du produit


*/
