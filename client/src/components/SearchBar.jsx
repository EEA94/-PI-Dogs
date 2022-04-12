import React,{useState} from "react";
import { useDispatch} from "react-redux";
import findDogs from "../redux/actions";
import styles from "../styles/SearchBar.module.css"

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");
   

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(findDogs(name));
        setName('');
    }
    
    return (
        <form className={styles.searchBar} onSubmit={(e)=>handleSubmit(e)}>
            <input className={styles.input} required type="text" placeholder='Search...' value={name} onChange={(e)=>handleInputChange(e)}></input>
            <button className={styles.btn} type="submit">Search</button>
        </form>
    )
}