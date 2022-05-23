import React from "react";
import { Link } from "react-router-dom";
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

import styles from './index.module.css';

const ProjectCard = ({ id, name, category, budget, handleRemove }) => {
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
       <div className={styles.project_card} >
           <h4>{name}</h4>
           <p>
               <span>Orçamento:</span> {parseInt(budget).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
           </p>
           <p className={styles.category_text} >
               <span className={styles[category.toLowerCase()]} ></span> {category}
           </p>
           <div className={styles.project_card_actions}>
               <Link to={`/projeto/${id}`}>
                   <BsPencil /> Editar
               </Link>
               <button onClick={remove}>
                   <BsFillTrashFill /> Excluir
               </button>
           </div>
       </div>
    )
}

export default ProjectCard