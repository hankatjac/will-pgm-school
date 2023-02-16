import React, { useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { API_URL } from "../apiPath";
import axios from "axios";

const Register = () => {
  
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const submitForm = async (data) => {
    setMessage("");
    try {
      await axios.post(`${API_URL}/auth/register`, data);
      navigate("/login");
      setSuccessful(true)
    
    } catch (err) {
      // setError(err.response.data);
      setMessage(err.response.data);
      setSuccessful(false);
    }
  };

  return (
    <section className="w-25 mx-auto py-5" id="register">
   
        <div className="text-center">
          <h1 className="fw-bolder text-capitalize">{t("sign up")}</h1>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        </div>


        <form
          onSubmit={handleSubmit(submitForm)}
          id="loginForm"
          name="sentMessage"
        >
          {!successful && (
            <div>
              <div className="form-group">
                <label>{t("username")}</label>
                <input
                  className="form-control"
                  name="username"
                  type="text"
                  {...register("username", { required: true, maxLength: 10 })}
                />
                {errors.username && (
                  <p className="help-block text-danger">
                    {t("Please enter your name.")}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>{t("email")}</label>
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^\w+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/,
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <p className="help-block text-danger">
                    {t("Please enter your email.")}
                  </p>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <p className="help-block text-danger">
                    {t("Please enter a valid email")}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>{t("password")}</label>
                <input
                  name="password"
                  type="password"
                  {...register("password", { required: true })}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                />
                {errors.password && (
                  <p className="help-block text-danger">
                    Please enter your password
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>{t("confirm password")}</label>
                <input
                  name="confirmPwd"
                  type="password"
                  {...register("confirmPwd", {
                    required: true,
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                  className={`form-control ${
                    errors.confirmPwd ? "is-invalid" : ""
                  }`}
                />
                {errors.confirmPwd && (
                  <p className="invalid-feedback">
                    {errors.confirmPwd?.message}
                  </p>
                )}
              </div>

              <div className="clearfix"></div>
              <div className="col-lg-12 text-center">
                {/* <div id="success">{message}</div> */}
                <button
                  id="sendMessageButton"
                  className="btn btn-primary btn-xl"
                  type="submit"
                >
                  {t("register")}
                </button>
              </div>
            </div>
          )}

          <div className="col-lg-12 text-center" id="success">
            {message}
          </div>
        </form>
      
    </section>
  );
};

export default Register;
