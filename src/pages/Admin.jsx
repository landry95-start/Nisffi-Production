
import React, { useState } from 'react'
import {
    Home,
    ShoppingBag,
    Users,
    LayoutGrid,
    BarChart3,
    Settings,
    ShoppingCart,
    LogOut,
    Menu,
    X
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'

import Dashboard from '../component/DashboardAdmin/Dashboard'
import Categories from '../component/DashboardAdmin/Categories'
import ProductsAdmin from '../component/DashboardAdmin/ProductsAdmin'

const Admin = () => {

    const navigate = useNavigate()

    const categories = [
        { id: "Dashboard", label: "Dashboard", icon: <Home /> },
        { id: "Produits", label: "Produits", icon: <ShoppingBag /> },
        { id: "Commandes", label: "Commandes", icon: <ShoppingCart /> },
        { id: "Clients", label: "Clients", icon: <Users /> },
        { id: "Categories", label: "Categories", icon: <LayoutGrid /> },
        { id: "Rapports", label: "Rapports", icon: <BarChart3 /> },
        { id: "Parametres", label: "Parametres", icon: <Settings /> },
    ]

    const [activeCategory, setActiveCategory] = useState("Dashboard")
    const [menuOpen, setMenuOpen] = useState(false)

    const admin = JSON.parse(localStorage.getItem("admin") || "null")
    const nomAdmin = admin?.nom || "Administrateur"

    const handleNavigation = (category) => {
        setActiveCategory(category)
        setMenuOpen(false)
    }

    // Retour vers la boutique
    const allerAccueil = () => {
        navigate("/")
        setMenuOpen(false)
    }

    return (
        <section className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">

            {/* HEADER MOBILE */}
            <div className="lg:hidden flex items-center justify-between bg-[#46152F] px-4 py-4">

                <h1 className="text-2xl font-serif text-white">
                    Nisffi
                </h1>

                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-white"
                    aria-label="Ouvrir le menu"
                >
                    {menuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>

            </div>

            {/* SIDEBAR DESKTOP */}
            <aside className="hidden lg:flex px-4 py-6 border-r bg-[#46152F] flex-col gap-2 min-h-screen">

                <h1 className="text-3xl font-serif text-white text-center mb-8">
                    Nisffi
                </h1>

                {/* RETOUR BOUTIQUE */}
                <button
                    type="button"
                    onClick={allerAccueil}
                    className="flex items-center gap-3 p-3 mb-5 rounded-lg
                    text-[#E8DDE2] hover:bg-[#6A2345] hover:text-white
                    transition-all duration-200 text-sm font-medium"
                >
                    <Home size={20} />
                    <span>Retour à la boutique</span>
                </button>

                <p className="text-xs uppercase tracking-widest text-[#D8B9C8] mb-3">
                    Menu principal
                </p>

                {categories.map((items) => (
                    <button
                        key={items.id}
                        type="button"
                        className={`flex items-center gap-3 p-3 mb-1 rounded-lg
                        transition-all duration-200 text-sm font-medium cursor-pointer
                        ${
                            activeCategory === items.label
                                ? "bg-[#6A2345] text-white border-l-4 border-[#E8B8CC]"
                                : "text-[#E8DDE2] hover:bg-[#6A2345] hover:text-white"
                        }`}
                        onClick={() => handleNavigation(items.label)}
                    >
                        <span className="text-lg">{items.icon}</span>
                        <span>{items.label}</span>
                    </button>
                ))}

                <button
                    type="button"
                    className="flex gap-2 p-3 text-[#E8DDE2] cursor-pointer mt-auto"
                >
                    <LogOut />
                    <p>Se déconnecter</p>
                </button>

            </aside>

            {/* MENU MOBILE */}
            {menuOpen && (
                <aside className="lg:hidden bg-[#46152F] px-4 pb-5 flex flex-col gap-2">

                    {/* RETOUR BOUTIQUE */}
                    <button
                        type="button"
                        onClick={allerAccueil}
                        className="flex items-center gap-3 p-3 rounded-lg
                        text-[#E8DDE2] hover:bg-[#6A2345] hover:text-white
                        text-sm font-medium"
                    >
                        <Home size={20} />
                        <span>Retour à la boutique</span>
                    </button>

                    <p className="text-xs uppercase tracking-widest text-[#D8B9C8] mb-2 mt-3">
                        Menu principal
                    </p>

                    {categories.map((items) => (
                        <button
                            key={items.id}
                            type="button"
                            onClick={() => handleNavigation(items.label)}
                            className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium
                            ${
                                activeCategory === items.label
                                    ? "bg-[#6A2345] text-white border-l-4 border-[#E8B8CC]"
                                    : "text-[#E8DDE2] hover:bg-[#6A2345]"
                            }`}
                        >
                            {items.icon}
                            <span>{items.label}</span>
                        </button>
                    ))}

                    <button
                        type="button"
                        className="flex items-center gap-3 p-3 text-[#E8DDE2] mt-2"
                    >
                        <LogOut />
                        Se déconnecter
                    </button>

                </aside>
            )}

     
            <main className="min-w-0 min-h-screen bg-[#F8F6F5] p-4 sm:p-6 lg:p-8">

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">

                    <div className="min-w-0">
                        <h1 className="uppercase font-bold text-xl sm:text-2xl text-[#46152F] break-words">
                            BONJOUR {nomAdmin}
                        </h1>

                        <p className="text-sm text-[#6B6267] mt-2">
                            Voici un aperçu de votre boutique aujourd'hui
                        </p>
                    </div>

                    <div className="flex gap-2 items-center text-sm sm:text-lg">

                        <div className="bg-[#46152F] rounded-full text-white w-10 h-10 flex items-center justify-center shrink-0">
                            {nomAdmin.charAt(0).toUpperCase()}
                        </div>

                        <h4>{nomAdmin}</h4>

                    </div>

                </div>

                
                {activeCategory === "Dashboard" && <Dashboard />}
                {activeCategory === "Produits" && <ProductsAdmin />}
                {activeCategory === "Commandes" && <div>Contenu de la page Commandes</div>}
                {activeCategory === "Clients" && <div>Contenu de la page Clients</div>}
                {activeCategory === "Categories" && <Categories />}
                {activeCategory === "Parametres" && <div>Contenu de la page Parametres</div>}

            </main>

        </section>
    )
}

export default Admin
