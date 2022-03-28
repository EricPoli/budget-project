import React from 'react';
import loading from '../../../img/loading.svg'
import styles from './index.module.css';

const Loading = () => {
    return (
        <div className={styles.loader_container}>
            <img src={loading} className={styles.loader} alt="Gif Carregando" />
        </div>
    )
}

export default Loading