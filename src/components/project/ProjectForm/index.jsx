import React, { useEffect, useState } from "react";

import Input from "../../form/input";
import Select from "../../form/select";
import SubmitBtn from "../../form/SubmitBtn";
import styles from './index.module.css';

const ProjectForm = ({ btnText, handleSubmit, projectData }) => {
    //Espera a resposta que virá da API
    const [categories, setCategories] = useState([]) 
    const [project, setProject] = useState(projectData || {})

    //Hook para aguardar um valor inicial, se não ele mantêm vazio impedindo o loop
    useEffect(() => {
        //Request de GET para a API
        fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })  //Transforma a resposta em json
        .then((res) => res.json())
        //setCategories recebe o valor da resposta
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        console.log(project)
    }

    function handleCategory(e) {
        setProject({ 
            ...project, 
            category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
    })
        console.log(project)
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text" 
                placeholder="Insira o nome do projeto" 
                name="name" 
                handleOnChange={handleChange}
                text="Nome do projeto" 
                value={project.name}
            />
            <Input 
                type="number" 
                placeholder="Insira o orçamento total" 
                name="budget" 
                handleOnChange={handleChange}
                text="Orçamento do projeto" 
                value={project.budget}
            />
            <Select 
                text="Selecione a categoria"
                options={categories}
                name="category_id"
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitBtn text={btnText}/>
        </form>
    )
}

export default ProjectForm