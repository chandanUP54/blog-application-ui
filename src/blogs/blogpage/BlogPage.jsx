
import React, { useContext, useEffect, useState } from "react";
import Blog from "./Blog";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Test = () => {
  const jwt = localStorage.getItem("accessJwt");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { blogId } = useParams();
  const [comments, setComments] = useState([]);
  const [editMode,setEditMode]=useState(false)
  const { currentUserId } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [commentIdForEdit, setCommentIdForEdit] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Blog blogId={blogId} setComments={setComments}/>
      <Comment
        isAuthenticated={isAuthenticated}
        jwt={jwt}
        blogId={blogId}
        currentUserId={currentUserId}
        comments={comments}
        setComments={setComments}
        setEditMode={setEditMode}
        setComment={setComment}
        setCommentIdForEdit={setCommentIdForEdit}
      />
      <CommentForm
        isAuthenticated={isAuthenticated}
        jwt={jwt}
        blogId={blogId}
        currentUserId={currentUserId}
        setComments={setComments}
        editMode={editMode}
        setEditMode={setEditMode}
        comment={comment}
        setComment={setComment}
        commentIdForEdit={commentIdForEdit}
      />
    </>
  );
};

export default Test;