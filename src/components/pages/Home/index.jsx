import React from "react"
import styles from "./index.module.css"
import savings from "../../../img/savings.svg"
import LinkButton from "../../layout/LinkButton/index"

const Home = () => {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/novo-projeto" text="Criar Projeto" />
            <img src={savings} alt="Ilustração de economia" />
        </section>
    )   
}

export default Home