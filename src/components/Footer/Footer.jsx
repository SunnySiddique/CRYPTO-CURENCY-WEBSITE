import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        Copy &copy; {new Date().getFullYear()} Cryptoplace - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
