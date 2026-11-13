
import React from 'react'
import {
  ShoppingBag,
  ShoppingCart,
  Users,
  Package
} from 'lucide-react'

import DashboardBottom from './DashboardBottom'

const statistiques = [
  {
    id: 1,
    titre: "Chiffre d'affaires",
    valeur: "1 248 000 FCFA",
    evolution: "+12%",
    icon: ShoppingBag,
    iconBg: "bg-[#F1E1E8]",
    iconColor: "text-[#46152F]",
    courbe: "#DDA9C0",
    tendance: "text-green-600",
  },
  {
    id: 2,
    titre: "Commandes",
    valeur: "124",
    evolution: "+8%",
    icon: ShoppingCart,
    iconBg: "bg-[#EDE5F0]",
    iconColor: "text-[#6A2345]",
    courbe: "#C9B1D5",
    tendance: "text-green-600",
  },
  {
    id: 3,
    titre: "Clients",
    valeur: "892",
    evolution: "+15%",
    icon: Users,
    iconBg: "bg-[#FBEEDC]",
    iconColor: "text-[#8C5729]",
    courbe: "#EBCB9F",
    tendance: "text-green-600",
  },
  {
    id: 4,
    titre: "Produits en stock faible",
    valeur: "32",
    evolution: "-3%",
    icon: Package,
    iconBg: "bg-[#FBE5E8]",
    iconColor: "text-[#A13D53]",
    courbe: "#E9B4C0",
    tendance: "text-red-500",
  }
]

const Dashboard = () => {
  return (
    <div className="w-full min-w-0">

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5">

        {statistiques.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.id}
              className="relative overflow-hidden bg-white border border-[#EDE3E7] rounded-2xl p-4 sm:p-5 min-h-[160px] sm:min-h-[175px] shadow-sm"
            >

              {/* Contenu de la carte */}
              <div className="relative z-10 flex items-center gap-3 sm:gap-4">

                <div className={`${item.iconBg} ${item.iconColor} w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0`}>
                  <Icon size={25} strokeWidth={2} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#251820] break-words">
                    {item.valeur}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6B6267] mt-1">
                    {item.titre}
                  </p>

                  <p className={`text-sm font-semibold mt-2 ${item.tendance}`}>
                    {item.evolution}
                  </p>
                </div>

              </div>

              
              <svg
                className="absolute bottom-0 left-0 w-full h-[48px]"
                viewBox="0 0 300 50"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 35 C25 45, 35 22, 60 30 S105 42, 130 27 S180 15, 205 25 S255 12, 300 5 L300 50 L0 50 Z"
                  fill={item.courbe}
                  opacity="0.12"
                />

                <path
                  d="M0 35 C25 45, 35 22, 60 30 S105 42, 130 27 S180 15, 205 25 S255 12, 300 5"
                  fill="none"
                  stroke={item.courbe}
                  strokeWidth="2.5"
                />
              </svg>

            </div>
          )
        })}

      </div>

      <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-4 py-10 sm:py-15">

        <div>
          {/* Evolution des ventes */}
        </div>

        <div>
          {/* Dernières commandes */}
        </div>

      </section>

      <DashboardBottom />

    </div>
  )
}

export default Dashboard
