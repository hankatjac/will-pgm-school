import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../apiPath";
import { ProgressBar } from "react-loader-spinner";

const Like = ({ cat, id }) => {
  const [filterPost, setFilterPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/posts/?cat=${cat}`);
        let posts = res.data;
        setFilterPost(posts.filter((post) => post.id != id));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
        alert(err.response.data);
      }
    };
    fetchData();
  }, [cat, id]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="card-title">Similar Post</h4>
        {loading ? (
          <ProgressBar
            height="80"
            width="100%"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        ) : (
          filterPost.map((post) => (
            <div className="post" key={post.id}>
              {post.img && (
                <img
                  className="img-fluid"
                  src={`${API_URL}/pictures/${post?.img}`}
                  alt=""
                />
              )}
              <h6>{post.title}</h6>
              <Link
                className="btn btn-primary btn-sm mb-2"
                to={`/posts/${post.id}`}
                state={post}
              >
                Read More
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Like;
