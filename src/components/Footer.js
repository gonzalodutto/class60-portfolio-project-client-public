import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import { AiOutlineGoogle } from "react-icons/ai";

export const Footer = (props) => {
  return (
    //   <!-- Footer -->
    <footer
      className="text-center text-lg-start bg-light text-muted"
      style={{ marginTop: "2rem" }}
    >
      {/* <!-- Section: Social media --> */}
      <section className="d-flex justify-content-center p-4 border-bottom">
        {/* <!-- Left --> */}
        <div className="me-5 d-none d-lg-block">
          <span>Connected with us:</span>
        </div>
        {/* <!-- Left --> */}

        {/* <!-- Right --> */}
        <div>
          <i className="bi-alarm"></i>
          <a href="/" className="me-4 text-reset">
            <FiFacebook />
          </a>
          <a href="/" className="me-4 text-reset">
            <FiTwitter />
          </a>
          <a href="/" className="me-4 text-reset">
            <AiOutlineGoogle />
          </a>
          <a href="/" className="me-4 text-reset">
            <FiInstagram />
          </a>
          <a href="/" className="me-4 text-reset">
            <FiLinkedin />
          </a>
          <a href="/" className="me-4 text-reset">
            <FiGithub />
          </a>
        </div>
        {/* <!-- Right --> */}
      </section>
      {/* <!-- Section: Social media --> */}

      {/* <!-- Section: Links  --> */}
      <section className="">
        <div className="container text-center text-md-start mt-5">
          {/* <!-- Grid row --> */}
          <div className="row mt-3">
            {/* <!-- Grid column --> */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              {/* <!-- Content --> */}
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Bukloo.com
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>
            {/* <!-- Grid column --> */}

            {/* <!-- Grid column --> */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* <!-- Links --> */}
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" className="text-reset">
                  Angular
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Vue
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Laravel
                </a>
              </p>
            </div>
            {/* <!-- Grid column --> */}

            {/* <!-- Grid column --> */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* <!-- Links --> */}
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </div>
            {/* <!-- Grid column --> */}

            {/* <!-- Grid column --> */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* <!-- Links --> */}
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3"></i> New York, NY 10012, US
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                info@example.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print me-3"></i> + 01 234 567 89
              </p>
            </div>
            {/* <!-- Grid column --> */}
          </div>
          {/* <!-- Grid row --> */}
        </div>
      </section>
      {/* <!-- Section: Links  --> */}

      {/* <!-- Copyright --> */}
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        Developed by{" "}
        <a
          className="text-reset fw-bold"
          href="https://github.com/gonzalodutto"
        >
          Gonza
        </a>
      </div>
      {/* <!-- Copyright --> */}
    </footer>
    // <!-- Footer -->
  );
};
