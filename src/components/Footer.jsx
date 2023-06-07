import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { API_URL } from "../apiPath";
import { ProgressBar } from "react-loader-spinner";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/posts`);
        setBlogs(res.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <footer id="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h3>Latest posts</h3>
            <ul className="posts">
              {isLoading ? (
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
                blogs
                  .slice(-3)
                  .reverse()
                  .map((post) => {
                    return (
                      <li key={post.id}>
                        <Link to={`/posts/${post.id}`} state={post}>
                          {post.title}
                        </Link>
                      </li>
                    );
                  })
              )}
            </ul>
          </div>

          <div className="col-md-3">
            <h3>Follow us</h3>
            <p className="social">
              Accusamus iusto odio dignissimos ducimus qui blanditiis
              praesentium
            </p>
            <ul className="social-buttons">
              <li>
                <FaFacebookF color="red" />
              </li>
              <li>
                <FaLinkedinIn color="purple" />
              </li>
              <li>
                <FaGoogle color="green" />
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h3>Subscribe </h3>
            <i className="far fa-paper-plane fa-2x mb-2 text-white"></i>

            <form className="form-signup" id="contactForm">
              {/* -- Email address input-- */}
              <div className="row input-group-newsletter">
                <div>
                  <input
                    className="form-control"
                    id="emailAddress"
                    type="email"
                    placeholder="Enter email address..."
                    aria-label="Enter email address..."
                    data-sb-validations="required,email"
                  />
                </div>
                <div className="my-3">
                  <button
                    className="btn btn-primary disabled"
                    id="submitButton"
                    type="submit"
                  >
                    Notify Me!
                  </button>
                </div>
              </div>
              <div
                className="invalid-feedback mt-2"
                data-sb-feedback="emailAddress:required"
              >
                An email is required.
              </div>
              <div
                className="invalid-feedback mt-2"
                data-sb-feedback="emailAddress:email"
              >
                Email is not valid.
              </div>
              {/* -- Submit success message-- */}

              <div className="d-none" id="submitSuccessMessage">
                <div className="text-center mb-3 mt-2 text-white">
                  <div className="fw-bolder">Form submission successful!</div>
                </div>
              </div>
              {/* -- Submit error message-- */}

              <div className="d-none" id="submitErrorMessage">
                <div className="text-center text-danger mb-3 mt-2">
                  Error sending message!
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-3">
            <h3>Useful Tools</h3>
            <ul className="posts text-wrap">
              <li>
                <Link to={"working-hours"}>
                  weekly working-hours calculator
                </Link>
              </li>
              <li>
                <Link to={"todo"}>todo list</Link>
              </li>
              <li>
                <Link to={"recipe"}>food recipe</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="holder">
          <p className="copyright">
            {t("Copyright")}&copy;<span style={{ color: "white" }}></span>
            Will-PGM school {new Date().getFullYear()}
          </p>
          <p>All rights reseved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
