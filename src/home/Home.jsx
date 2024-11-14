import React, { useContext, useEffect, useState } from "react";
import { BASE_API_URL } from "../auth/url";
const Home = () => {
  const [recentBlog, setRecentBlog] = useState([]);

  useEffect(() => {
    fetch(`${BASE_API_URL}/recentBlogs`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        //console.log("Success:", data);
        setRecentBlog(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <section className="bg-blue-500 text-white py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold">Welcome to My Blog</h1>

          <p className="mt-4 text-lg">
            Your daily dose of articles, tips, and stories
          </p>
          <a
            href="#blog"
            className="mt-8 inline-block bg-white text-blue-500 py-3 px-6 rounded-full text-lg"
          >
            Explore More
          </a>
        </div>
      </section>

      <section id="blog" className="py-20 flex justify-between items-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Latest Posts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentBlog.length > 0 &&
              recentBlog.map((e) => (
                <div className="bg-white p-6 rounded-lg shadow-md" key={e.id}>
                  <h3 className="text-xl font-semibold">{e.title}</h3>
                  <p
                    className="mt-2 text-gray-600"
                    dangerouslySetInnerHTML={{ __html: e.summary }}
                  ></p>
                  <a
                    href={`/blog/view/${e.id}`}
                    className="mt-4 inline-block text-blue-500"
                  >
                    Read More...
                  </a>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-20  h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            What Our Readers Say
          </h2>
          <div className="flex gap-3 flex-col md:flex-row justify-between">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 md:mb-0 md:w-1/3">
              <p className="text-gray-600">
                "This blog is amazing! I learned so much!"
              </p>
              <p className="mt-4 font-bold">- Mohit Kumar</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 md:mb-0 md:w-1/3">
              <p className="text-gray-600">
                "I love the articles and tips provided here!"
              </p>
              <p className="mt-4 font-bold">- Ranu Gupta</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md md:w-1/3">
              <p className="text-gray-600">
                "A great source of inspiration and knowledge!"
              </p>
              <p className="mt-4 font-bold">- Chandan Yadav</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
