import React from "react"
import styles from './index.module.css';

const SubmitBtn = ({ text }) => {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default SubmitBtn