import React from "react"
import styles from './index.module.css';

const Select = ({ text, name, options, handleOnChange, value }) => {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select 
                name={name} 
                id={name}
                onChange={handleOnChange}
                value={value || ''}
            >
                <option>Selecione uma opção</option>
                {/* Imprime a resposta da API no front */}
                {options.map((option) => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
                
        </div>
    )
}
// placeholder={placeholder} 
//                     onChange={handleOnChange} 
//                     value={value}>
export default Select