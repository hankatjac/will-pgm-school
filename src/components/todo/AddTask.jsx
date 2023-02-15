import { useState } from "react";

const AddTask = ({addTask, onEdit, toUpdateTask, setShowAddTask }) => 
{
  const [id, setId] = useState(toUpdateTask.id || "");
  const [text, setText] = useState(toUpdateTask.text || "");
  const [day, setDay] = useState(toUpdateTask.day || "");
  const [reminder, setReminder] = useState(toUpdateTask.reminder || false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }
    if (toUpdateTask) {
      onEdit({id, text, day, reminder });
      setShowAddTask(false);

    } else {
    addTask({ text, day, reminder });
    }

    setText("");
    setDay("");
    setReminder(false);
  };

  return (
    <form className="col-md-4 mx-auto" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" value="Save Task" className="btn btn-info d-block mx-auto" />
    </form>
  );
};

export default AddTask;
