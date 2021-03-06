import React from "react";
import {Link} from 'react-router-dom';

import Container from "../Container";
import styles from "./index.module.css";
import logo from "../../../img/costs_logo.png"


const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={logo} alt="Logotipo Costs" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/projetos">Projetos</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar