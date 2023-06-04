import React, { useEffect, useState } from "react";
import fetchData from "../helper/fetchData";
import { useParams } from "react-router";
import Comments from "../../Comment/Comment";
import axios from "axios";
import styles from "./detail.module.css";

function Detail() {
  const [game, setGame] = useState({});
  const [commentToReport, setCommentToReport] = useState(null);

  const { id } = useParams();

  const handleReport = async (event) => {
    try {
      const obj = { comment: event.target.id, text: event.target.value };
      const response = await axios.post(
        "http://localhost:3001/email/report/comment",
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
        const gameData = await fetchData(
          `http://localhost:3001/videogames/${id}`,
          "get"
        );
        setGame(gameData);
      } catch (error) {
        console.error(error);
      }
    };

    detail();
  }, [id]);

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
      <div className="row"></div>
      <div>
      {game?.ComentariosVs?.map((comment) => (
  <div
    key={comment.id}
    className={`${styles.commentItem} ${styles.commentContainer}`}
  >
    <div className={styles.commentHeader}>
      <p>
        {comment.User?.name} - Date: {comment.date}    .
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
