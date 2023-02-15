import { FaTimes, FaEdit } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle, onEdit }) => {
  return (
    <div
      className={`task ${task.reminder && "reminder"} col-md-6 mx-auto`}
      onDoubleClick={() => onToggle(task)}
    >
      <div className="row">
        <div className="col-md-6">
          <h3>{task.text}</h3>
          <p>{task.day}</p>
        </div>
        <div className="col-md-1">
          <FaTimes
            style={{ color: "red", cursor: "pointer", width: '30px', height:'30px'}}
            onClick={() => onDelete(task.id)}
          />
        </div>
        <div className="col-md-1">
          <FaEdit
            style={{ color: "blue", cursor: "pointer", width: '30px', height:'30px' }}
            onClick={() => onEdit(task)}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
