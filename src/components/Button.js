import "App.css";
import { useHistory } from "react-router-dom";

// Renders buttons, they can redirect or handle events.
function Button({ children, link, onClick, active = true }) {
  const history = useHistory();

  // Only some buttons have onCLick like 'set timer'.
  const handleClick = () => {
    if (active) {
      onClick && onClick();
      link && history.push(link);
    }
  };

  return (
    <div className={`button ${active}`} onClick={handleClick}>
      {children}
    </div>
  );
}

export default Button;
