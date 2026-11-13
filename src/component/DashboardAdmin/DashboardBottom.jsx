import {
  Star,
  Package,
  ShoppingCart,
  Users,
  ChartNoAxesColumnIncreasing,
  History,
  Plus
} from "lucide-react";
import { use } from "react";

import { useNavigate } from "react-router-dom";

const actions = [
  {
    id: 1,
    title: "Ajouter",
    subtitle: "un produit",
    icon: <Package size={27} />,
    action: "produit",
    link: "/admin/product-form"
  },
  {
    id: 2,
    title: "Voir les",
    subtitle: "commandes",
    icon: <ShoppingCart size={27} />,
    action: "commandes",
    link: "/product-form"
  },
  {
    id: 3,
    title: "Gérer les",
    subtitle: "clients",
    icon: <Users size={27} />,
    action: "clients",
    link: "/product-form"
  },
  {
    id: 4,
    title: "Consulter",
    subtitle: "les rapports",
    icon: <ChartNoAxesColumnIncreasing size={27} />,
    action: "rapports",
    link: "/product-form"
  },
];

const activities = [
  {
    id: 1,
    title: "Nouveau produit ajouté : Sac Élégance",
    time: "Il y a 5 min",
    icon: <Package size={20} />,
  },
  {
    id: 2,
    title: "Nouveau client inscrit",
    time: "Il y a 12 min",
    icon: <Users size={20} />,
  },
  {
    id: 3,
    title: "Stock d'un produit modifié",
    time: "Il y a 1 h",
    icon: <ShoppingCart size={20} />,
  },
];

export default function DashboardBottom({ onNavigate }) {

  const navigate = useNavigate()

  return (
    <section className="grid grid-cols-1 xl:grid-cols-[1.15fr_1fr] gap-4">

     
      <div className="bg-white border border-[#EDE3E7] rounded-2xl p-4">

        <div className="flex items-center gap-2 mb-4">
          <Star size={22} className="text-[#46152F]" />
          <h2 className="font-semibold text-lg text-[#24151D]">
            Actions rapides
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

          {actions.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.link)}
              className="group flex flex-col items-center justify-center gap-2
              min-h-[105px] rounded-xl bg-[#F5EBEF]
              text-[#46152F] transition-all duration-200
              hover:bg-[#46152F] hover:text-white hover:-translate-y-1"
            >
              {item.icon}

              <span className="text-sm font-medium text-center leading-5">
                {item.title}
                <br />
                {item.subtitle}
              </span>
            </button>
          ))}

        </div>
      </div>

      {/* ACTIVITÉ RÉCENTE */}
      <div className="bg-white border border-[#EDE3E7] rounded-2xl p-4">

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History size={22} className="text-[#46152F]" />
            <h2 className="font-semibold text-lg text-[#24151D]">
              Activité récente
            </h2>
          </div>

          <button className="text-sm font-medium text-[#46152F] hover:underline">
            Voir tout 
          </button>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[#46152F] shrink-0">
                  {activity.icon}
                </span>

                <p className="text-sm text-[#24151D] truncate">
                  {activity.title}
                </p>
              </div>

              <span className="text-xs text-[#8B8086] whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}