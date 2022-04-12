import React,{ useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { getDogs, filterDb, filterApi, filterTemp, orderName, orderWeight, orderHeight} from "../redux/actions";
import styles from "../styles/Filters.module.css"

export default function Filters(){
const dispatch = useDispatch()
const temps = useSelector((state)=>state.temps)

const [state, setState] = useState({ alreadyFiltered: false });

function handleChange(e){
    const {value} = e.target;
    switch (value) {
        case "api":
            dispatch(filterApi())
            break;
        case "created":
            dispatch(filterDb())
            break;
        case "asc":
            dispatch(orderName(value))
            break;
        case "desc":
            dispatch(orderName(value))
            break;
        case "heavier":
            dispatch(orderWeight(value))
            break;
        case "lighter":
            dispatch(orderWeight(value))
            break;
        case "higher":
            dispatch(orderHeight(value))
            break;
        case "lower":
            dispatch(orderHeight(value))
            break;
        case "default":
            dispatch(getDogs())
            break;
        default:
            dispatch(filterTemp(value))
            break;
    }
    setState({...state, alreadyFiltered: true, currentPage: 1})
}

return(
    <div className={styles.allSelects}>
        <div className={styles.allSelect}>
        <select className={styles.select} onChange={(e)=>handleChange(e)}>
            <option value="default">Filter</option>
            <option value="api">API</option>
            <option value="created">Created</option>
        </select>
        </div>

        <div className={styles.allSelect}>
        <select className={styles.select} onChange={(e)=>handleChange(e)}>
            <option value="default">Order</option>
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
            <option value="default">Temperaments</option>
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