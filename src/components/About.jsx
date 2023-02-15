import React from "react";

const About = () => {
  return (
    // !-- ======= About Section ======= --
    <section id="about" className="my-5">
      <div className="container text-center">
        <h1 className="fw-bolder">About Us</h1>
        <p>
          WILL-PGM school is an independent school for kids. Our experience help
          us to teach the youngest kids with awesome results.{" "}
        </p>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-6 order-1 order-lg-2">
            <img
              src={require("../assets/img/hero-bg.jpg")}
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h3>Use only the best methods and systems to improve learning.</h3>
            <p className="fst-italic">
              Coding can help kids develop problem-solving skills and encourages
              creativity and imagination
            </p>
            <ul>
              <li>
                <i className="bi bi-check-circle"></i> uses colorful command boxes
                instead of text-based coding from scratch.
              </li>
              <li>
                <i className="bi bi-check-circle"></i> Students in a slightly older
                age range can also learn HTML/CSS, JavaScript, and Python.
              </li>
              <li>
                <i className="bi bi-check-circle"></i> Ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate trideta storacalaperda mastiro dolore
                eu fugiat nulla pariatur.
              </li>
            </ul>
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate
            </p>
          </div>
        </div>
      </div>
    </section>
    /* <section>
      <div className="container">
        <div className="col-md-10 mx-auto">
          <h1>
            We are an independent school for kids. Our experience help us to
            teach the youngest kids with awesome results. We use only the best
            methods and systems to improve learning.
          </h1>

          <p>
            Childhood is a great time to learn how to code. Coding can help kids
            develop problem-solving skills and encourages creativity and
            imagination. Plus, it's a good foundation for learning more computer
            science principles later on.{" "}
            <strong>
              uses colorful command boxes instead of text-based coding, which
              makes it easier for kids to use from scratch. Students in a
              slightly older age range can also learn HTML/CSS, JavaScript, and
              Python.
            </strong>{" "}
          </p>
        </div>
      </div>
    </section> */
  );
};

export default About;
