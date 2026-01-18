import "../../ui/footer.css";

export default function Footer () {
    return (<>
      <div className="footer py-4">
        <div className="footertext container d-flex justify-content-center my-3">
          <div className="me-3"><small>©Cpoyright 2024 KaneC. 專題用途</small></div>
          <div>
            <a href="#" className="footer ext-decoration-none me-1">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="footer text-decoration-none me-1">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="footer text-decoration-none me-1">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </>)
  }