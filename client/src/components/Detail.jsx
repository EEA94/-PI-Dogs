import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams} from "react-router-dom";
import { findId } from "../redux/actions";
import styles from "../styles/Detail.module.css"
import logoHome from "../assets/dogHome.png"
import loading from "../assets/loading.gif"

export default function Detail(){
const dispatch = useDispatch();
const {id} = useParams()
const detail = useSelector((state)=>state.detail);

useEffect(()=>{
    dispatch(findId(id));
},[dispatch,id])

    return (
        <div className={styles.detail}>
            <Link className={styles.dogsHenry} to={'/home'}><img className={styles.logoHome} src={logoHome} alt="logo"/>
             <h1 className={styles.henry}>HENRY'S DOGS</h1></Link>
            <h2>Details</h2>
            {
                detail.length>0 ? 
                    <div className={styles.subDetail}>
                        <div className={styles.infoDetail}>
                            <img className={styles.infoDetail} src={detail[0].image} alt={detail[0].name}/>
                            <h4 className={styles.name}>{detail[0].name}</h4>
                            <b>Weight: </b><span>{detail[0].weight} kg</span>
                            <b>Height: </b><span>{detail[0].height} cm</span>
                            <b>Life expentancy: </b><span>{detail[0].life_span}</span>
                            <b>Temperaments: </b><span>{detail[0].temperament?.join(", ")}</span><br/>
                        </div>
                    </div> :
                        <div className={styles.containerLoading}>
                        <img className={styles.loading} src={loading} alt="loading..." />
                        <p>loading...</p>
                      </div>
            }
        </div>
    )
}