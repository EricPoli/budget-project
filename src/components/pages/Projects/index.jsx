import React, { useState, useEffect } from "react"
import Message from "../../layout/Message"
import styles from "./index.module.css"
import Container from "../../layout/Container"
import ProjectCard from "../../project/ProjectCard"
import LinkButton from "../../layout/LinkButton"
import Loading from "../../layout/Loading"


const Projects = () => {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [messageProject, setmessageProject] = useState('')
    const errorMsg = 'Falha ao criar o projeto, porfavor tente novamente'

    useEffect(() => {
       setTimeout(() => {
            fetch("http://localhost:5000/projects", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
       }, 800)
       setMessage('Projeto criado com sucesso!')
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
            },
        }).then((res) => res.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            //Mensagem de sucesso
            setmessageProject('O projeto foi removido com sucesso!')
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.project_container} >
            <div className={styles.title_container} >
                <h1>Meus Projetos</h1>
                <LinkButton to="/novo-projeto" text="Criar Projeto" />
            </div>
            {/* A mensagem não está chegando de NewProject, location não funciona */}
            {message ? <Message type="sucess" msg={message} /> : <Message type="error" msg={errorMsg} />}
            {messageProject && <Message type="sucess" msg={messageProject} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => <ProjectCard 
                        name={project.name} 
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        id={project.id} 
                        handleRemove={removeProject}
                        />
                    )
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados</p>
                )}
            </Container>
        </div>
    )        
}

export default Projects