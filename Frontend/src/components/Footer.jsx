import "../styles/footer.css";



export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Brand */}
        <div className="footer-brand">
          <img src="/Modelle-logo.png" alt="Modelle logo" />
          <p>Where Your 3D Imaginations Come To Life</p>
        </div>

        {/* Columns */}
        <div className="footer-columns">

          {/* Social + Contact */}
          <div className="footer-col">
          <h4>Connect</h4>

          <a href="mailto:app.modelle@gmail.com" className="footer-social">
            <span className="icon-wrap">
              <img src="/email.svg" alt="Email" />
            </span>
            <span>Email</span>
          </a>

          <a
            href="https://github.com/Pawani-Nethmini/MODELLE---SDGP"
            className="footer-social"
          >
            <span className="icon-wrap">
              <img src="/github.svg" alt="GitHub" />
            </span>
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/company/modelle-platform"
            className="footer-social"
          >
            <span className="icon-wrap">
              <img src="/linkedin.svg" alt="LinkedIn" />
            </span>
            <span>LinkedIn</span>
          </a>

          <a
            href="https://www.instagram.com/modelleweb"
            className="footer-social"
          >
            <span className="icon-wrap">
              <img src="/insta.svg" alt="Instagram" />
            </span>
            <span>Instagram</span>
          </a>
        </div>

          <div className="footer-col">
            <h4>Product</h4>
            <a href="#features">Marketplace</a>
            <a href="#upload">Upload STL</a>
            <a href="#validation">STL Validation</a>
            <a href="#printers">Find Printers</a>
            <a href="#printers">Find Designers</a>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="mailto:app.modelle@gmail.com">Contact Us</a>
          </div>

          


        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Modelle. All rights reserved.
      </div>
    </footer>
  );
}
