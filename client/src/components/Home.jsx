import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clear, getDogs, getTemps } from "../redux/actions";
import Filters from "./Filters";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";
import styles from "../styles/Home.module.css";
import logoHome from "../assets/dogHome.png";
import loading from "../assets/loading.gif";

export default function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.allDogs);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemps());
    dispatch(clear());
  }, [dispatch]);

  return (
    <div className={styles.home}>
      {dogs.length ? (
        <>
          <Link className={styles.dogsHenry} to={"/home"}>
            <img className={styles.logoHome} src={logoHome} alt="logo"/>
            <h1 className={styles.henry}>HENRY'S DOGS</h1>
          </Link><hr />
          <div className={styles.main}>
            <div className={styles.filtersPanel}>
              <SearchBar />
              <Filters setCurrentPage={setCurrentPage}/>
              <Link to={"/dog"}>
                <button className={styles.btn}>Create Dog</button>
              </Link>
            </div>
            <Paginate currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          </div>
        </>
      ) : (
        <div className={styles.containerLoading}>
          <img className={styles.loading} src={loading} alt="loading..." />
          <p>loading...</p>
        </div>
      )}
    </div>
  );
}
