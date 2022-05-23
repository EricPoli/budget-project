import React, { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useParams } from "react-router-dom"
import Loading from "../../layout/Loading"
import Container from "../../layout/Container"

import styles from "./index.module.css"
import ProjectForm from "../../project/ProjectForm"
import Message from "../../layout/Message"
import ServiceForm from "../../service/ServiceForm"
import ServiceCard from "../../service/ServiceCard"

const Project = () => {
   const { id } = useParams()

   const [project, setProject] = useState([])
   const [services, setServices] = useState([])

   const [showProjectForm, setShowProjectForm] = useState(false)
   const [showServiceForm, setShowServiceForm] = useState(false)
   const [message, setMessage] = useState()
   const [messageType, setMessageType] = useState()
   const [textMessage, setTextMessage] = useState()

   const currencyBudget = parseInt(project.budget).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
   const currencyCost = parseInt(project.cost).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

   useEffect(() => {

       setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch((err) => console.log(err))
       }, 800)
     
   }, [id])

   function editPost(project) {
       setMessage('')

       if(parseInt(project.budget) < project.cost){
          setMessage(true)
          setMessageType("error")
          setTextMessage("Custo do projeto excedendo o orçamento total!")
       }else {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(project),
        }, [])
         .then((res) => res.json())
         .then((data) => {
             setProject(data)
             setShowProjectForm(false)
             //mensagem
             setMessage(true)
             setMessageType("sucess")
             setTextMessage("Alterações salvas com sucesso!")
         })
       }
    }

    function removeService(id, cost) {
        setMessageType('')
        setTextMessage('')

        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
        projectUpdated.services = servicesUpdated

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(projectUpdated)
        })
            .then((res) => res.json())
            .then(() => {
                setProject(projectUpdated)
                setServices(servicesUpdated)
                //Mensagem de sucesso
                setMessageType("sucess")
                setTextMessage('O serviço foi removido com sucesso!')
            })
            .catch((err) => console.log(err))
    }

    function createService(project) {
        const lastService = project.services[project.services.length -1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        setMessage('')

        if(parseInt(project.budget) < newCost){
            setMessage(true)
            setMessageType("error")
            setTextMessage("Custo do projeto excedendo o orçamento total!")
        }else {
            //Adiciona o valor total de serviços ao cost
            project.cost = newCost
            fetch(`http://localhost:5000/projects/${project.id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(project),
            }, [])
             .then((res) => res.json())
             .then((data) => {
                 
                 //mensagem
                 setMessage(true)
                 setMessageType("sucess")
                 setTextMessage("Serviço criado com sucesso!")
                 setShowServiceForm(false)
             })
        }
    }

   function toggleProjectForm() {
       setShowProjectForm(!showProjectForm)
   }

   function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={messageType} msg={textMessage} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button onClick={toggleProjectForm} className={styles.btn}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> {currencyBudget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> {currencyCost}
                                    </p>
                                </div>
                            ) : (
                                
                                <div className={styles.project_info}>
                                    <ProjectForm 
                                        handleSubmit={editPost} 
                                        btnText="Salvar alterações" 
                                        projectData={project} 
                                    />
                                </div>
                            )
                            }
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button onClick={toggleServiceForm} className={styles.btn}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            {showServiceForm && (
                                <ServiceForm 
                                    handleSubmit={createService}
                                    btnText="Adicionar Serviço"
                                    projectData={project}
                                />
                            )}
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 && 
                                services.map((service) => <ServiceCard 
                                    name={service.name} 
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    id={service.id} 
                                    handleRemove={removeService}
                                    />
                                )
                            }
                            {services.length === 0 && (
                                <p>Não há serviços cadastrados.</p>
                            )}                           
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )} 
           
        </>
    )
}

export default Project