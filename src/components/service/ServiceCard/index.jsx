import React from "react";
import { BsFillTrashFill } from 'react-icons/bs'

import styles from './index.module.css';

const ServiceCard = ({ id, name, description, handleRemove, cost }) => {
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    return (
       <div className={styles.service_card} >
           <h4>{name}</h4>
           <p>
               <span>Custo:</span> {parseInt(cost).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
           </p>
           <p className={styles.description_text} >
               <span>Descrição:</span> 
               <p>{description}</p>
           </p>
           <div className={styles.service_card_actions}>
               <button onClick={remove}>
                   <BsFillTrashFill /> Excluir
               </button>
           </div>
       </div>
    )
}

export default ServiceCard