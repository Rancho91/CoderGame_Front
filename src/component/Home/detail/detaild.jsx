import React, { useEffect, useState } from "react";
import fetchData from "../helper/fetchData";
import { useParams } from "react-router";
import Comments from "../../Comment/Comment";
import axios from "axios";

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
    <div className="container">
      <h1>{game?.price}</h1>
      <div className="row">
        <hr />
        <div className="row">
          {game?.Genregames?.map((genre) => (
            <div className="col-2" key={genre.id}>
              <p>{genre.name}</p>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <h1 className="col-12">{game?.name}</h1>
      <hr />
      <img src={game?.image} alt="" className="img-fluid" />
      <hr />
      <div className="row">
        {game?.Platforms?.map((platform) => (
          <div className="col-2" key={platform.id}>
            <p>{platform.name}</p>{" "}
          </div>
        ))}
      </div>
      <hr />
      <h3>{game?.released}</h3>
      <hr />
      <p className="col-12">{game?.description}</p>
      <hr />
      {game?.ComentariosVs?.map((comment) => (
        <div key={comment.id}>
          <button onClick={() => setCommentToReport(comment.id)}>
            {comment.id === commentToReport ? "x" : "!"}
          </button>
          {comment.id === commentToReport && (
            <div>
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
                Threats or violent expressions.
              </button>
              <button id={comment.id} value="Obscenity" onClick={handleReport}>
                Obscenity
              </button>
              <button id={comment.id} value="others" onClick={handleReport}>
                Others
              </button>
            </div>
          )}
          <p>{comment.User?.name}</p>
          <p>{comment.message}</p>
          <p>Date: {comment.date}</p>
        </div>
      ))}
      <hr />
      <Comments id={id} />
    </div>
  );
}

export default Detail;
