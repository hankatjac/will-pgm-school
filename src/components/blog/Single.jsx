import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Like from "./Like";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import Sider from "./Sider";
import { AuthContext } from "../../contexts/authContext";
import { API_URL } from "../../apiPath";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";

const Single = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [readMore, setReadMore] = useState(false);
  const nav = useNavigate();
  const { logout } = useContext(AuthContext);
  // const location = useLocation();
  const navigate = useNavigate();

  // const postId = location.pathname.split("/")[2];
  // console.log(location.pathname.split("/"))
  console.log(id);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
        alert(err.response.data);
      }
    };
    fetchData();
  }, [id]);

  const deletePostImage = async () => {
    try {
      await axios.delete(`${API_URL}/pictures/${post.img}`);
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      navigate("/posts");
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        logout();
        nav("/login");
      }
      return;
    }

    deletePostImage();
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <div className="user">
            <div className="info">
              <span className="text-capitalize">{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser?.username === post.username && (
              <div>
                <Link
                  className="me-3"
                  to={`/posts/write?edit=${id}`}
                  state={post}
                >
                  <GrEdit
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      width: "30px",
                      height: "30px",
                    }}
                  />
                </Link>{" "}
                <MdDelete
                  style={{
                    color: "red",
                    cursor: "pointer",
                    width: "30px",
                    height: "30px",
                  }}
                  onClick={handleDelete}
                />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div>
            {post.img && (
              <img
                className="img-fluid"
                src={`${API_URL}/pictures/${post?.img}`}
                alt=""
              />
            )}
          </div>

          {readMore ? (
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.desc),
              }}
            ></p>
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.desc?.substring(0, 500)),
              }}
            ></p>
            // `${getText(post.desc).substring(0, 500)}...`
          )}
          <div>
            <button onClick={() => setReadMore(!readMore)}>
              {readMore ? "show less" : "  show more"}
            </button>
          </div>
        </div>

        <div className="col-md-3 ms-auto">
          <Sider />
          <Like cat={post.cat} id={id} />
          {/* <Menu cat={post.cat} /> */}
        </div>
      </div>
    </div>
  );
};

export default Single;
