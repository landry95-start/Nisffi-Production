
import React from "react";
import {
  Truck,
  ShieldCheck,
  Headset,
  BadgeCheck,
} from "lucide-react";

const Advantages = [
  {
    id: 1,
    title: "Livraison rapide",
    subTitle: "Partout à Yaoundé",
    icon: Truck,
  },
  {
    id: 2,
    title: "Paiement sécurisé",
    subTitle: "En toute confiance",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Service client",
    subTitle: "À votre écoute",
    icon: Headset,
  },
  {
    id: 4,
    title: "Produits de qualité",
    subTitle: "Sélectionnés avec soin",
    icon: BadgeCheck,
  },
];

const HeroBanner = () => {
  return (
    <section className="bg-pink-100 border-y border-pink-200">
      <div className="max-w-7xl mx-auto px-4 py-7 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">

          {Advantages.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="flex items-center justify-center lg:justify-start gap-3"
              >
                
                <div className="flex shrink-0 items-center justify-center w-11 h-11 rounded-full bg-white text-pink-600 shadow-sm">
                  <Icon size={23} strokeWidth={1.7} />
                </div>

                
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[10px] sm:text-xs text-gray-500">
                    {item.subTitle}
                  </p>
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
