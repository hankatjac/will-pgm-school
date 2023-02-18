import React, { useState } from "react";
import Like from "./Like";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";

const Sider = () => {
  const [keyword, setKeyword] = useState("");
  // const inputRef= useRef()

  const handleChange = (e) => setKeyword(e.target.value.trim().toLowerCase());

  return (
    <>
      <aside className="sidebar">
        <div className="card mb-4">
          <div className="d-flex">
            <input
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
            />
            {keyword && (
              <Link
                className="btn btn-info"
                to="/posts/search"
                variant="outline-success"
                state={{ from: keyword }}
              >
                Search
              </Link>
            )}
          </div>
        </div>
      </aside>
      <aside className="sidebar sidebar-sticky">
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title">Categories</h4>
            <div className="d-flex flex-column align-items-start">
              <Link
                className="btn btn-light btn-sm mb-1"
                to="/posts?cat=business"
              >
                Business
              </Link>
              <Link
                className="btn btn-light btn-sm mb-1"
                to="/posts?cat=culture"
              >
                Culture
              </Link>
              <Link
                className="btn btn-light btn-sm mb-1"
                to="/posts?cat=technology"
              >
                Technology
              </Link>
              <Link
                className="btn btn-light btn-sm mb-1"
                to="/posts?cat=quotidian"
              >
                Quotidian
              </Link>
            </div>
          </div>
        </div>
      </aside>
      <aside>
        <div className="text-center">
          <Link className="btn btn-info mb-3" to="/posts/write">
            Post a news
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sider;
