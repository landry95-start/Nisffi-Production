import React from 'react'
import {Car, Plane, Star, Flame} from 'lucide-react'


const promotions = [
    {id:1, text: "Commandez facilement via WhatsApp", icon: Car},
    {id:2, text: "Livraison depuis yaounde", icon: Plane},
    {id:3, text: "Nouveautés chaque semaine", icon: Star},
    {id:4, text: "Profitez de nos offres", icon: Flame}
]

const PromoBar = () => {


  return (
    <>
        <div className='flex flex-1 justify-between px-20 py-3 bg-[#46152F]'>
            {promotions.map((promotion, index) => {
                const Icon = promotion.icon;

                return (
                    <div key={promotion.id} className={"flex items-center gap-3 text-white"}>
                        <Icon size={18} />
                        <h4>{promotion.text}</h4>
                    </div>
                )
            })}
        </div>
    </>
  )
}

export default PromoBar