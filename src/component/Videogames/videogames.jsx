import React, { useEffect, useState } from "react";
import Card from "../card/card";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames, query, orderBy } from "../../redux/actions/actions";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./videogames.module.css";

function Videogames() {
  const dispatch = useDispatch();
  const { Videogames, pages } = useSelector((state) => state.allVideogames);
  const [refresh, setRefresh] = useState(true);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState({});
  const { user, isAuthenticated } = useAuth0();
  const [pageButton, setpageButton] = useState([]);

  let queryState = useSelector((state) => {
    if (isAuthenticated) {
      return { ...state.query, page, sub: user.sub, ...order };
    } else {
      return { ...state.query, page, ...order };
    }
  });

  const refreshHandler = () => {
    setRefresh(!refresh);
  };

  const orderByHandler = (event) => {
    const { name, value } = event.target;
    const [orderName, orderDirection] = value.split("-");
    setOrder({ order: orderName, ascDesc: orderDirection });
  };

  const renderButtons = () => {
    let paginas = [];
    if (pages < 6) {
      for (let i = 1; i <= pages; i++) {
        paginas.push(i);
      }
    } else if (page <= 3) {
      for (let i = 1; i <= 5; i++) {
        paginas.push(i);
      }
    } else if (page <= pages - 2) {
      for (let i = page - 2; i <= page + 2; i++) {
        paginas.push(i);
      }
    } else {
      for (let i = pages - 5; i <= pages; i++) {
        paginas.push(i);
      }
    }
    setpageButton(paginas);
  };

  const handlerFilter = (event) => {
    const { value } = event.target;
    if (value === "previous") {
      setPage(page - 1);
    } else if (value === "next") {
      setPage(page + 1);
    } else {
      setPage(Number(value));
    }
  };

  useEffect(() => {
    const get = () => {
      dispatch(getAllVideogames(queryState));
    };
    renderButtons();
    get();
    return () => {};
  }, [refresh, page, order]);

  return (
    <div className={`container justify-content-center ${styles.videogames}`}>
      <div className={styles.ordering}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="mx-2">
            <select
              name="order"
              onChange={orderByHandler}
              value={`${order.order}-${order.ascDesc}` || ""}
              className={styles.orderSelect}
            >
              <option value="">Ordering</option>

              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>

              <option value="released-asc">Date: Newest First</option>
              <option value="released-desc">Date: Oldest First</option>

              <option value="name-asc">Alphabet: A-Z</option>
              <option value="name-desc">Alphabet: Z-A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        {Videogames ? (
          Videogames.map((game) => (
            <div className="col-sm-12 col-md-3">
              <Card game={game} refreshHandler={refreshHandler} />
            </div>
          ))
        ) : (
          <div className="col-12">Loading</div>
        )}
      </div>

      <div className="row justify-content-center">
        <div className={`col-md-12 d-flex justify-content-center`}>
          {page === 1 || pages < 6 ? null : (
            <button onClick={handlerFilter} value="previous">
              {"<"}
            </button>
          )}

          {pages
            ? pageButton.map((pageNumb) => {
                return (
                  <button
                    name="page"
                    value={pageNumb}
                    onClick={handlerFilter}
                    className={
                      pageNumb == page
                        ? styles.selectedButton
                        : styles.pageButton
                    }
                  >
                    {pageNumb}
                  </button>
                );
              })
            : null}
          {page == pages || pages < 6 ? null : (
            <button onClick={handlerFilter} value="next">
              {">"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Videogames;

