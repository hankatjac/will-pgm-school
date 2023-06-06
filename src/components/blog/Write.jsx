import React, { useState, useRef, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../contexts/authContext";
import { ColorRing } from "react-loader-spinner";
import newRequest from "../../utils/newRequest";

const Write = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const inputRef = useRef(null);
  const state = useLocation().state;

  const [value, setValue] = useState(state?.desc || "");

  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  // const [err, setError] = useState(null);

  const [messageQuill, setMessageQuill] = useState(false);
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();
  const { logout, deletePostImage } = useContext(AuthContext);

  const handleDisplayFileDetails = () => {
    if (inputRef.current.files[0].size > 3 * 1024 * 1024)
      alert("File size cannot exceed more than 3MB");
    else {
      setFile(inputRef.current.files[0]);
      setUploadedFileName(inputRef.current.files[0].name);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("photo", file);
      const res = await newRequest.post(`/upload`, formData);
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
      if (state) {
        setIsLoading(true);
        await newRequest.put(`/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : state.img,
        });
        file && deletePostImage(state.img);
      } else {
        setIsLoading(true);
        await newRequest.post(`/posts/`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      }
      setMessage(false);
      setMessageQuill(false);
      navigate("/posts");
    } catch (err) {
      // setError(err.response.data);
      alert(err.response.data);
      if (err.response.status === 401) {
        logout();
        navigate("/login");
      }
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <section>
      <div className="container">
        <h1 className="text-center">wirte a blog</h1>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-9 mb-5">
              <input
                className="mb-4 w-100"
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />

              <ReactQuill
                style={{ height: "300px" }}
                theme="snow"
                value={value}
                onChange={setValue}
              />

              {messageQuill && (
                <div className="bg-danger text-center m-auto w-25">
                  Please write some texts
                </div>
              )}
            </div>

            <div className="col-md-3">
              {/* <span>
              <b>Status: </b> Draft
              </span>
              <span>
              <b>Visibility: </b> Public
              </span> */}

              <div>
                <label className="mx-3">Choose file: </label>
                <input
                  ref={inputRef}
                  onChange={handleDisplayFileDetails}
                  className="d-none"
                  type="file"
                  accept="image/*"
                />

                <button
                  onClick={handleUpload}
                  className={`btn btn-outline-${
                    uploadedFileName ? "success" : "primary"
                  }`}
                >
                  {uploadedFileName ? uploadedFileName : "Upload"}
                </button>
                {message && (
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

              <div>
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

              {/* <button>Save as a draft</button> */}
              <button type="submit" className="btn btn-primary d-block mx-auto">
                {isLoading ? (
                  <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                ) : (
                  "Publish"
                )}
              </button>
              {/* {err && <div className="bg-danger text-center">{err}</div>} */}
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Write;
