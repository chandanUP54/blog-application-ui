import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../../auth/url";
const Articles = () => {
  const jwt = localStorage.getItem("accessJwt");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${BASE_API_URL}/view/articles`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
       // console.log("Success:", data);
        setArticles(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [jwt]);

  return (
    <div>
      <div className="max-w-2xl mx-auto mt-4 mb-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Articles</h1>
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          {articles.length > 0 &&
            articles.map((e) => (
              <div
                key={e.id}
                className="article-item mb-4 border-b-2 mb-2 p-2 mt-4"
              >
                <h2 className="text-xl font-semibold mb-2">{e.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: e.summary }}></p>
                <a
                  href={`/blog/view/${e.id}`}
                  className="mt-4 inline-block text-blue-500"
                >
                  Read Full Article
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
