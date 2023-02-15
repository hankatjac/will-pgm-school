import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Header = ({ title, toggleAdd, showAddTask, setEditTask }) => {
  const location = useLocation();

  return (
    <section className="text-center">
      <h1>{title}</h1>
      {location.pathname === "/todo" && (
        <Button
          color={showAddTask ? "red" : "green"}
          text={showAddTask ? "Cancel" : "Add"}
          onClick={() => {
            toggleAdd();
            setEditTask('');
          }}
        />
      )}
    </section>
  );
};

Header.defaultProps = {
  title: "Todo List",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }

export default Header;
