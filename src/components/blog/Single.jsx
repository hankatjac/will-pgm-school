import React, { useEffect, useState, useContext } from "react";
import Edit from "../../assets/img/logos/edit.png";
import Delete from "../../assets/img/logos/delete.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Like from "./Like";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import Sider from "./Sider";
import { AuthContext } from "../../contexts/authContext";
import { API_URL } from "../../apiPath";

const Single = () => {
  axios.defaults.withCredentials = true;
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
    }
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
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser?.username === post.username && (
              <div className="edit">
                <Link to={`/posts/write?edit=${id}`} state={post}>
                  <img src={Edit} alt="" />
                </Link>
                <img
                  onClick={handleDelete}
                  style={{ cursor: "pointer" }}
                  src={Delete}
                  alt=""
                />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div>
            {post.img && (
              <img className="img-fluid" src={`/upload/${post?.img}`} alt="" />
            )}
          </div>

          {readMore ? (
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.desc),
              }}
            ></p>
          ) : (
            `${getText(post.desc).substring(0, 200)}...`
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
