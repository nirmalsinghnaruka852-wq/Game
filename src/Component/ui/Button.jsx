
const Button = ({ text, onClick, styleClass, logo }) => {
  const handleClick = () => {
    setClicked(true);
    onClick(); // call parent function
    setTimeout(() => setClicked(false), 200); // effect duration
  };

  return (
    <button
      onClick={handleClick}
      className={`${styleClass} ${clicked ? "clicked" : ""}`}
    >
      {logo && (
        <img
          src={logo}
          alt="icon"
          style={{ marginRight: "5px", width: "20px", height: "20px" }}
        />
      )}
      {text}
    </button>
  );
};

export default Button;
