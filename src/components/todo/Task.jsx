import { MdDelete} from "react-icons/md";
import { GrEdit } from "react-icons/gr";

const Task = ({ task, onDelete, onToggle, onEdit }) => {
  return (
    <div
      className={`task ${task.reminder && "reminder"} container `}
      onDoubleClick={() => onToggle(task)}
    >
      <div className="row">
        <div className="col-md-8">
          <h3>{task.text}</h3>
          <p>{task.day}</p>
        </div>
        <div className="col-md-2 my-3">
          <MdDelete
            style={{ color: "red", cursor: "pointer", width: '30px', height:'30px'}}
            onClick={() => onDelete(task.id)}
          />
        </div>
        <div className="col-md-2 my-3">
          <GrEdit
            style={{ color: "blue", cursor: "pointer", width: '30px', height:'30px' }}
            onClick={() => onEdit(task)}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
