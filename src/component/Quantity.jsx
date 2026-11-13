import React from 'react'
import { useState } from 'react'
import Details from '../pages/Details'

const Quantity = () => {

    const [stock, setStock]= useState(10)

    const [quantity, setQuantity] = useState(1);


    const Augmenter = () => {

        setQuantity((currentQuantity) => {
            if (currentQuantity < stock) {
                return currentQuantity + 1;
            }

            return currentQuantity;
        })

        return stock;
    }


    const Diminuer = () => {
        setQuantity((currentQuantity) => {
            if (currentQuantity > 0) {
                return currentQuantity - 1;
            }
            return currentQuantity;
        })
    }



  return (
    <Details 
        stock={stock}
        quantity={quantity}
        Augmenter={Augmenter}
        Diminuer={Diminuer}
    />
  )
}

export default Quantity