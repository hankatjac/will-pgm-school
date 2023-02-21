import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CookieConsent from "react-cookie-consent";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="masthead">
        <div className="container">
          <div className="row">
            <div className="col-md-6 intro-text">
              <div className="intro-heading text-uppercase">
                {t("programming education for kids")}
              </div>
              <div className="intro-lead-in lh-base">
                {t(
                  "offering unique, fun, activities and learning. Discover kids' programs with everything from home activities to classes."
                )}
              </div>
              <Link
                to="/event"
                className="btn btn-danger btn-xl text-uppercase js-scroll-trigger"
              >
                {t("Learn More")}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="widget-boxes">
        <div className="box">
          <div className="box-info about">
            <Link to="/about">
              <h2>About the school</h2>
              <p>
                Enim ad minim veniam nostrud exercitation ullamco laboris nisi
                ut aliquip commodo consequat duis aute irure dolor.
              </p>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="box-info experience">
          <Link to="/posts">
            <h2>Our experience</h2>
            <p>
              Perspiciatis unde omnis iste natus voluptatem accusantium
              doloremque laudantium totam aperiam eaque dolor lorem.
            </p>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="box-info fun">
          <Link to="/event">
            <h2>Big fun for kids!</h2>
            <p>
              Accusamus et iusto dignissimos ducimus blanditiis praesentium
              voluptatum deleniti corrupti quos dolores et quas molestias.
            </p>
            </Link>
          </div>
        </div>
        <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
      </section>
    </>
  );
};

export default Home;
