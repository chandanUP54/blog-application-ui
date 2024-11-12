import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../../auth/url';

const Blog = ({blogId,setComments}) => {

    const navigate=useNavigate();
    const [blog, setBlog] = useState({});

    useEffect(() => {
        fetch(`${BASE_API_URL}/blog/view/${blogId}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json();
          })
          .then((data) => {
           
            setBlog(data.blog);
            setComments(data.comments);
          })
          .catch((error) => {
            console.error("Error:", error);
            navigate("/view/articles");
          });
      }, []);

  return (
    <div>
         <div className="mt-4 mb-4 p-4">
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <h2
            className="text-lg text-gray-600 mb-4"
            dangerouslySetInnerHTML={{ __html: blog.summary }}
          ></h2>
          <p
            className="text-gray-800 mb-6"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></p>
        </div>
    </div>
  )
}

export default Blog