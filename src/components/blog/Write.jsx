import React, { useState, useRef, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../contexts/authContext";

const Write = () => {
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const inputRef = useRef(null);
  const state = useLocation().state;

  const [value, setValue] = useState(state?.desc || "");

  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  // const [err, setError] = useState(null);

  const [MessageQuill, setMessageQuill] = useState(false);
  const [Message, setMessage] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleDisplayFileDetails = () => {
    if (inputRef.current.files[0].size > 3 * 1024 * 1024)
      alert("File size cannot exceed more than 3MB");
    else {
      setFile(inputRef.current.files[0]);
      setUploadedFileName(inputRef.current.files[0].name);
      setMessage(false);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);

      return res.data;
    } catch (err) {
      console.log(err);
      !state && alert("File Upload Error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputRef.current.files.length == 0 && !!state == false) {
      setMessage(true);
      return;
    }

    if (value.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setMessageQuill(true);
      return;
    }

    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : state.img,
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });

      setMessage(false);
      setMessageQuill(false);
    } catch (err) {
      // setError(err.response.data);
      alert(err.response.data);
      if (err.response.status === 401) {
        logout();
        navigate("/login");
      }
      console.log(err);
      return
    }
    navigate("/posts");
  };

  return (
    <section>
      <div className="container">
        <h1 className="text-center">wirte a blog</h1>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-9">
              <input
                className="mb-4 w-100"
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />

              <ReactQuill theme="snow" value={value} onChange={setValue} />

              {MessageQuill && (
                <div className="bg-danger text-center m-auto w-25">
                  Please write some texts
                </div>
              )}
            </div>

            <div className="col-md-3 ">
              {/* <span>
              <b>Status: </b> Draft
              </span>
              <span>
              <b>Visibility: </b> Public
              </span> */}

              <div className="m-3">
                <label className="mx-3">Choose file: </label>
                <input
                  ref={inputRef}
                  onChange={handleDisplayFileDetails}
                  className="d-none"
                  type="file"
                />

                <button
                  onClick={handleUpload}
                  className={`btn btn-outline-${
                    uploadedFileName ? "success" : "primary"
                  }`}
                >
                  {uploadedFileName ? uploadedFileName : "Upload"}
                </button>
                {Message && (
                  <div className="bg-danger">Please upload a picture</div>
                )}

                {/* <input
                style={{ display: "none" }}
                type="file"
                id="file"
                name=""
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label className="file" htmlFor="file">
                Upload Image
              </label> */}
              </div>

              <div className="m-3">
                <label className="mx-3">Choose a category: </label>
                {/* <h1> choose a category</h1> */}

                <Form.Check
                  type="radio"
                  label="business"
                  checked={cat === "business"}
                  name="cat"
                  value="business"
                  id="business"
                  required
                  onChange={(e) => setCat(e.target.value)}
                />

                <Form.Check
                  type="radio"
                  label="culture"
                  checked={cat === "culture"}
                  name="cat"
                  value="culture"
                  id="culture"
                  onChange={(e) => setCat(e.target.value)}
                />

                <Form.Check
                  type="radio"
                  label="technology"
                  checked={cat === "technology"}
                  name="cat"
                  value="technology"
                  id="technology"
                  onChange={(e) => setCat(e.target.value)}
                />

                <Form.Check
                  type="radio"
                  label="quotidian"
                  checked={cat === "quotidian"}
                  name="cat"
                  value="quotidian"
                  id="quotidian"
                  onChange={(e) => setCat(e.target.value)}
                />
              </div>
              <div className="buttons">
                {/* <button>Save as a draft</button> */}
                <button type="submit">Publish</button>
                {/* {err && <div className="bg-danger text-center">{err}</div>} */}
              </div>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Write;
