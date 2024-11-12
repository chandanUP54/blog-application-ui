import React, { useContext, useEffect, useState } from "react";
import { BASE_API_URL } from "../../auth/url";
import $ from "jquery";
import { AuthContext } from "../../context/AuthContext";
const CommentForm = ({
  isAuthenticated,
  jwt,
  blogId,
  setComments,
  comment,
  setComment,
  commentIdForEdit,
  editMode,
  setEditMode,
}) => {
  const { isTokenExpired, handleLogout } = useContext(AuthContext);

  const checkExpiration = (jwt) => {
    if (jwt && isTokenExpired(jwt)) {
      handleLogout();
    }
  };

  function reset() {
    setEditMode(false);
    setComment("");
    $("#saveBtn").html("New Comment");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      blog: {
        id: blogId,
      },
      comment: comment,
    };

    if (editMode) {
      $.ajax({
        url: `${BASE_API_URL}/blog/${blogId}/update/${commentIdForEdit}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (data) {
          document.getElementById(`content-${data.commentId}`).innerHTML =
            data.comment;

          reset();
        },
        error: function () {
          console.log("Error in Operation");
          checkExpiration(jwt);
        },
      });
    } else {
      $.ajax({
        url: `${BASE_API_URL}/blog/${blogId}/comment`, // Use dynamic blog ID
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (data) {
          setComments((prevComments) => [...prevComments, data]);
          reset();
        },
        error: function () {
          console.log("Error in Operation");
          checkExpiration(jwt);
        },
      });
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2" id="heading-comment">
            Leave a Comment:
          </h2>

          <form
            id="commentForm"
            onSubmit={handleSubmit}
            className="bg-gray-50 p-4 rounded shadow"
          >
            <textarea
              name="comment"
              id="comment"
              cols="80"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              placeholder="Comment Your Thoughts"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
            <div className="mt-4">
              <button
                id="saveBtn"
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                id="resetBtn"
                type="reset"
                className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mt-4 mb-4">
          <h2 className="text-lg font-semibold mb-2" id="heading-comment">
            To leave a comment create an account:
            <a href="/signup">create account</a>
          </h2>
          <h2 className="text-lg font-semibold mb-2" id="heading-comment">
            login if you have an account:<a href="/login">login here</a>
          </h2>
        </div>
      )}
    </>
  );
};

export default CommentForm;
