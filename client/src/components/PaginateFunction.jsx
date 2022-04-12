import React from "react";
import styles from "../styles/PaginateFunction.module.css"

export default function PaginateFunction({dogs,cardsPerPage, paginado}){
const pageNumber = []
for(var i=1; i<Math.ceil(dogs/cardsPerPage); i++){
    pageNumber.push(i)
}

return(
    <ul className={styles.ul}>
{
        pageNumber?.map(num=>
            (
                <li className={styles.li} key={num}>
                    <button className={styles.btn} onClick={()=>paginado(num)}>{num}</button>
                </li>
            )
        )
}
    </ul>
)
}