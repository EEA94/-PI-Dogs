import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginateFunction from "./PaginateFunction";
import Card from "./Card";
import styles from "../styles/Paginate.module.css";
import { getDogs } from "../redux/actions";
import loading from "../assets/loading.gif";

export default function Paginate() {
  const dogs = useSelector((state) => state.allDogs);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);
  const indexLastCard = currentPage * cardsPerPage;
  const indexFirstCard = indexLastCard - cardsPerPage;
  const currentCards = dogs?.slice(indexFirstCard, indexLastCard);

  const paginado = (current) => {
    setCurrentPage(current);
  };

  useEffect(() => {}, [error]);

  function cleaner() {
    dispatch(getDogs());
    alert("Dogs not found");
  }
  return (
    <div className={styles.paginate}>
      <div>
        <PaginateFunction
          dogs={dogs.length}
          cardsPerPage={cardsPerPage}
          paginado={paginado}
        />
      </div>
      <div className={styles.cards}>
        {currentCards[0] === "Dog not found"
          ? cleaner()
          : currentCards?.map((dog) => (
              <Card
                image={dog.image}
                name={dog.name}
                temperament={dog.temperament}
                weight={dog.weight}
                id={dog.id}
                key={dog.id}
              />
            ))}
      </div>
      <div>
        <PaginateFunction
          dogs={dogs.length}
          cardsPerPage={cardsPerPage}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
