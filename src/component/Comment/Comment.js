import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Comments = ({ id }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const { user, isAuthenticated } = useAuth0();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/videogames/comentario`, {
        sub: user.sub,
        idVideogame: parseInt(id),
        comentario: comment
      });
      setComments([...comments, comment]);
      setComment("");
      window.location.reload(); // Reload the page after submitting the comment
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button type="submit" disabled={comment.length < 5}>Submit</button>
        </form>
      ) : (
        <p>Please log in to leave a comment</p>
      )}
    </div>
  );
};

export default Comments;