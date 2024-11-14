import React, { useContext, useState } from "react";
import $ from "jquery";
import { BASE_API_URL } from "../../auth/url";
import { AuthContext } from "../../context/AuthContext";

const Comment = ({
  isAuthenticated,
  jwt,
  blogId,
  currentUserId,
  comments,
  setEditMode,
  setComment,
  setCommentIdForEdit,
}) => {

  const {isTokenExpired,handleLogout}=useContext(AuthContext)

  const checkExpiration = (jwt) => {
    if (jwt && isTokenExpired(jwt)) {
      handleLogout();
    }
  };

  const handleDelete = (event) => {
    if (event.target.classList.contains("delete-comment")) {
      const commentId = event.target.getAttribute("delete-id");

      $.ajax({
        url: `${BASE_API_URL}/blog/${blogId}/comment/${commentId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        success: function () {
          const commentElement = document.getElementById(
            `comment-${commentId}`
          );
          commentElement.remove();
          reset();
        },
        error: function () {
          console.log("Error deleting comment");
          checkExpiration(jwt)
        },
      });
    }
  };
  const handleUpdate = (event) => {
    if (event.target.classList.contains("update-comment")) {
      const commentId = event.target.getAttribute("update-id");

      setEditMode(true);

      $("#saveBtn").html("Edit Comment");

      setCommentIdForEdit(commentId);
      const val = document.getElementById(`content-${commentId}`).innerHTML;
      setComment(val);
    }
  };

  function reset() {
    setEditMode(false);
    setComment("");
    $("#saveBtn").html("New Comment");
  }

  return (
    <div className="p-4">
      {comments.length > 0 &&
        comments.map((e) => (
          <div
            id={`comment-${e.commentId}`}
            data-id={`${e.commentId}`}
            className="bg-gray-50 p-4 rounded shadow hero mb-2 mt-2"
            key={e.commentId}
          >
            <h3 className="font-semibold" id={`content-${e.commentId}`}>
              {e.comment}
            </h3>

            {isAuthenticated && e.userDTO.id === currentUserId && (
              <div className="flex justify-between mt-2">
                <button
                  className="text-red-500 delete-comment"
                  id={`button-${e.commentId}`}
                  delete-id={`${e.commentId}`}
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="text-blue-500 update-comment"
                  id={`update-${e.commentId}`}
                  update-id={`${e.commentId}`}
                  onClick={handleUpdate}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Comment;