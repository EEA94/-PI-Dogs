import React,{ useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getDogs, filterDb, filterApi, filterTemp, orderName, orderWeight, orderHeight} from "../redux/actions";
import styles from "../styles/Filters.module.css"

export default function Filters({setCurrentPage}){
const dispatch = useDispatch()
const temps = useSelector((state)=>state.temps)

const [,setOrder] = useState();

function handleChange(e){
    const {value} = e.target;
    switch (value) {
        case "api":
            dispatch(filterApi())
            setCurrentPage(1);
    setOrder("order"+ value)
            break;
        case "created":
            dispatch(filterDb())
            setCurrentPage(1);
    setOrder("order"+ value)
            break;
        case "asc":
            dispatch(orderName(value))
            setCurrentPage(1);
    setOrder("order"+ value)
            break;
        case "desc":
            dispatch(orderName(value))
            setCurrentPage(1);
    setOrder("order"+ value)
            break;
        case "heavier":
            dispatch(orderWeight(value))
            setCurrentPage(1);
    setOrder("order"+ value)
            break;
        case "lighter":
            dispatch(orderWeight(value))
            setCurrentPage(1);
    setOrder("order"+ value)
            break;
        case "higher":
            dispatch(orderHeight(value))
            setCurrentPage(1);
    setOrder("order"+ value)
            break;
        case "lower":
            dispatch(orderHeight(value))
            setCurrentPage(1);
    setOrder("order"+ value)
            break;
        case "default":
            dispatch(getDogs())
            setCurrentPage(1);
    setOrder("order"+ value)
            break;
        default:
            dispatch(filterTemp(value))
            setCurrentPage(1);
    setOrder("order"+ value)
            break;
    }
}

return(
    <div className={styles.allSelects}>
        <div className={styles.allSelect}>
        <select className={styles.select} onChange={(e)=>handleChange(e)}>
            <option>Filter</option>
            <option value="api">API</option>
            <option value="created">Created</option>
        </select>
        </div>

        <div className={styles.allSelect}>
        <select className={styles.select}  onChange={(e)=>handleChange(e)}>
            <option >Order</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
            <option value="heavier">Greater Weight</option>
            <option value="lighter">Lower Weight</option>
            <option value="higher">Greater Height</option>
            <option value="lower">Lower Height</option>
        </select>
        </div>
        
        <div className={styles.allSelect}>
        <select className={styles.select} onChange={(e)=>handleChange(e)}>
            <option >Temperaments</option>
        {
            temps?.map((t)=>{
                return(
                    <option value={t.name} key={t.id}>{t.name}</option>
                )
            })       
        }
        </select>
        </div>
        
    </div>
)
}