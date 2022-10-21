import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginateFunction from "./PaginateFunction";
import Card from "./Card";
import styles from "../styles/Paginate.module.css";
import { getDogs } from "../redux/actions";

export default function Paginate({currentPage, setCurrentPage}) {
  const dogs = useSelector((state) => state.allDogs);
  const dispatch = useDispatch();
 
  const [cardsPerPage] = useState(8);
  const indexLastCard = currentPage * cardsPerPage;
  const indexFirstCard = indexLastCard - cardsPerPage;
  const currentCards = dogs?.slice(indexFirstCard, indexLastCard);

  const paginado = (current) => {
    setCurrentPage(current);
  };

  function notFound() {
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
          ? notFound()
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
