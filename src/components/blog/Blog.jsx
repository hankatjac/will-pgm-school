import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Sider from "./Sider";
import { API_URL } from "../../apiPath";
import DOMPurify from "dompurify";

// import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;
  // console.log(cat);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
        alert(err.response.data);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <section className="overflow-hidden pt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            {posts
              .slice()
              .reverse()
              .map((post) => (
                <div key={post.id} className="card mb-4">
                  <Link
                    className="text-muted text-decoration-none"
                    to={`/posts/${post.id}`}
                  >
                    <h1>{post.title}</h1>
                    {post.img && (
                      <img
                        className="img-fluid"
                        src={`${API_URL}/pictures/${post.img}`}
                        alt=""
                      />
                    )}
                  </Link>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.desc?.substring(0, 200)),
                    }}
                  ></p>
                  {/* <p>{getText(post.desc).substring(0, 200)}</p> */}
                </div>
              ))}
          </div>
          <div className="col-md-3 ms-auto">
            <Sider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
