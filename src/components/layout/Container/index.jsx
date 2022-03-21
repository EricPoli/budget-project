import React from 'react'
import styles from './index.module.css'

const Container = (props) => {
    return (
        <div className={`${styles.container} ${styles[props.customClass]} ${styles.min_height}`}>{props.children}</div>
    )
}

export default Container