import React from "react";
import Input from "../form/input";
import Select from "../form/select";
import SubmitBtn from "../form/SubmitBtn";
import styles from './index.module.css';

const ProjectForm = ({btnText}) => {
    return (
        <form action="#" className={styles.form}>
            <Input 
                type="text" 
                placeholder="Insira o nome do projeto" 
                value="" 
                name="name" 
                id="" 
                text="Nome do projeto" 
            />
            <Input 
                type="number" 
                placeholder="Insira o orçamento total" 
                value="" 
                name="budget" 
                id="" 
                text="Orçamento do projeto" 
            />
            <Select 
                text="Selecione a categoria"
                options=""
                name="category_id"
                value=""
            />
            <SubmitBtn text={btnText}/>
        </form>
    )
}

export default ProjectForm