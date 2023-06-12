import React, { useEffect, useState } from "react";
import fetchData from "../helper/fetchData";
import { useParams } from "react-router";
import Comments from "../../Comment/Comment";
import axios from "axios";
import styles from "./detail.module.css";
import { api } from '../../../App'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import { alignPropType } from "react-bootstrap/esm/types";

function Detail() {
  const { id } = useParams();
  const { user,isAuthenticated, loginWithRedirect } = useAuth0();
  const [game, setGame] = useState({});
  const [commentToReport, setCommentToReport] = useState(null);
  const [refresh, setRefresh] = useState(false)


  const addDeleteFavorites = async () => {
    const requestData = {
      idUser: user?.sub,
      idVideogame: id,
    };
    if(!isAuthenticated){ loginWithRedirect()}
   else{
    if (!game.Favorites.length) {
      try {
        console.log(requestData)
        await axios.post("http://localhost:3001/user/favorites", requestData);
        setRefresh(!refresh)
      } catch (error) {
        window.alert(error.message);
      }
    } else {
      try {
        console.log('entre a delete')
        await api.put("user/favorites", requestData);
        setRefresh(!refresh)
      } catch (error) {
        window.alert(error.message);
      }
    }}
  };

  const handleReport = async (event) => {
    try {
      const obj = { comment: event.target.id, text: event.target.value };
      const response = await alignPropType.post(
        "email/report/comment",
        obj
      );
      alert("Report submitted!");
      setCommentToReport(null);
    } catch (error) {
      console.error(error);
      alert("Failed to submit report.");
    }
  };

  useEffect(() => {
    const detail = async () => {
      try {
        const gameData = await api.put(
          `videogames/${id}`, {sub:user?user.sub:null}
        );
        setGame(gameData.data);
      } catch (error) {
        console.error(error);
      }
    };

    detail();
    
  }, [id, refresh]);

console.log(game)

  return (
    <div className={`${styles.container} mt-3 mb-3`}>
      <div className="row">
        <div className="col-md-4">
          <img src={game?.image} alt="" className={styles.image} />
        </div>
        <div className="col-md-8">
          <h1>{game?.name}</h1>
          <hr className={styles.separator} />
          <div className={`${styles.genresContainer} ${styles.rowGenres} row`}>
            {game?.Genregames?.map((genre) => (
              <div className={`col-2 ${styles.genreItem}`} key={genre.id}>
                <button className={styles.genreButton}>{genre.name}</button>
              </div>
            ))}
          </div>
          <hr className={styles.separator} />
          <div className={`${styles.rowPlatforms} row`}>
            {game?.Platforms?.map((platform) => (
              <div
                className={`col-2 ${styles.platformMargin}`}
                key={platform.id}
              >
                <button
                  className={`${styles.platformButton} ${styles.platformBorder}`}
                >
                  {platform.name}
                </button>
              </div>
            ))}
          </div>
          <hr className={styles.separator} />
          <div className="row">
            <div className="col-md-6">
              <p className={styles.price}>Coin: ${game?.price}</p>
              <button onClick={addDeleteFavorites}>
                {
                  game?.Favorites?.length && game?.Favorites[0].buy?(<p>Purched</p>):(
                    <FontAwesomeIcon
                  icon={faHeart}
                  className={
                    game.Favorites?.length?styles.heartIconFav : styles.heartIcon
                  }
                />)}
                
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div
          className={`col-md-12 ${styles.descriptionContainer} ${styles.description}`}
        >
          <p>Description:</p>
          <p>{game?.description}</p>
          <p>Released: {game?.released}</p>
        </div>
      </div>
      <hr />
      <div>
        {game?.ComentariosVs?.map((comment) => (
          <div
            key={comment.id}
            className={`${styles.commentItem} ${styles.commentContainer}`}
          >
            <div className={styles.commentHeader}>
              <p>
                {comment.User?.name} - Date: {comment.date} .
                <button onClick={() => setCommentToReport(comment.id)}>
                  Report
                </button>
                <br />
              </p>
            </div>
            {comment.id === commentToReport && (
              <div className={styles.reportOptions}>
                <button
                  id={comment.id}
                  value="Hate or discriminatory speech"
                  onClick={handleReport}
                >
                  Hate or discriminatory speech
                </button>
                <button
                  id={comment.id}
                  value="Threats or violent expressions."
                  onClick={handleReport}
                >
                  Threats or violent expressions
                </button>
                <button id={comment.id} value="Obscenity" onClick={handleReport}>
                  Obscenity
                </button>
                <button id={comment.id} value="others" onClick={handleReport}>
                  Others
                </button>
                <button onClick={() => setCommentToReport(null)}>Close</button>
              </div>
            )}
            {comment.id !== commentToReport && <p>{comment.message}</p>}
          </div>
        ))}
      </div>
      <Comments id={id} />
    </div>
  );
}

export default Detail;
