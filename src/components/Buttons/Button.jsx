/* eslint-disable react/prop-types */
import "./Button.css";
const Button = ({ name, styleName, onClick }) => {
  return (
    <button className={`${styleName} Universal-Button`} onClick={onClick}>
      {name}
    </button>
  );
};
export default Button;
