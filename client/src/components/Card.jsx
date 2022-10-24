import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Card.module.css"

export default function Card({image,name,temperament,weight,id}){
    
return(
<div className={styles.card}>
    <div className={styles.subCard}>
        <Link to={`/dogs/${id}`}>
        <img className={styles.cardImg} src={image} alt={name}/>
        </Link>
    </div>
    <div className={styles.info}>
        <b className={styles.name}>{name}</b><br/>
        <b className={styles.titles}>Weight: </b><span>{weight} kg.</span><br/>
        <b className={styles.titles}>Temperament: </b><span>{temperament?.join(", ")}.</span>
    </div>
    
</div>
)
}