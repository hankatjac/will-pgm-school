import { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
import newRequest from "../../utils/newRequest";

const Todo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const { logout } = useContext(AuthContext);
  const [showAddTask, setShowAddTask] = useState(false);
  const [fetch, setFetch] = useState(true);
  const [editTask, setEditTask] = useState("");
  // const [err, setErr] = useState("");

  const [tasks, setTasks] = useState([
    // {
    //   id: 1,
    //   text: "Big Meeting",
    //   day: "Feb 2 2023 03:00:00",
    //   reminder: true,
    // },
    // {
    //   id: 2,
    //   text: "Vacation",
    //   day: "Feb 2 2023 03:00:00",
    //   reminder: true,
    // },
    // {
    //   id: 3,
    //   text: "Conference",
    //   day: "Feb 2 2023 03:00:00",
    //   reminder: true,
    // },
    // {
    //   id: 4,
    //   text: "Maintenance",
    //   day: "Feb 2 2023 03:00:00",
    //   reminder: true,
    // },
  ]);

  // Fetch Task
  useEffect(() => {
    if (fetch) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const res = await newRequest.get(`/todos`);
          setTasks(res.data);
        } catch (err) {
          // setErr(err.response.data);
          if (err.response.status === 401) {
            logout();
            nav("/login");
          }
          console.log(err);
          alert(err.response.data);
        }
        setFetch(false);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [fetch]);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     logout();
  //     nav("/login");
  //   }
  // }, [isAuthenticated]);

  // const fetchTask = async (id) => {
  //   const res = await fetch(`http://localhost:5000/tasks/${id}`);
  //   const data = await res.json();
  //   return data;
  // };

  // Add Task
  const addTask = async (task) => {
    try {
      await newRequest.post(`/todos/`, task);
    } catch (err) {
      // setErr(err.response.data);
      alert(err.response.data);
      if (err.response.status === 401) {
        logout();
        nav("/login");
      }
      console.log(err);
    }
    setFetch(true);
    // setTasks([...tasks, task]);
  };

  console.log(tasks);

  // Toggle Reminder
  const toggleReminder = async (task) => {
    const updTask = { ...task, reminder: !task.reminder };
    try {
      await newRequest.put(`/todos/${task.id}`, updTask);
    } catch (err) {
      // setErr(err.response.data);
      alert(err.response.data);
      if (err.response.status === 401) {
        logout();
        nav("/login");
      }
      console.log(err);
      return;
    }
    console.log(task.id);
    const index = tasks.findIndex((t) => t === task);
    const updatedTasks = tasks.slice();
    updatedTasks[index].reminder = !task.reminder;
    setTasks(updatedTasks);

    // setTasks(
    //   tasks.map((task) =>
    //     task.id === id ? { ...task, reminder: !task.reminder } : task
    //   )
    // );
  };

  //pass the task for edit
  const handleEditTask = (task) => {
    console.log(task.id);
    setShowAddTask(!showAddTask);
    // tasks.map((task) => (task.id === id ? setEditTask(task) : ""));
    setEditTask(task);
  };
  // console.log("task for edit", editTask);

  // save updatedtask to database
  const handleEditTask2 = async (task) => {
    console.log(task.text);
    try {
      await newRequest.put(`/todos/${task.id}`, task);
    } catch (err) {
      // setErr(err.response.data);
      alert(err.response.data);
      if (err.response.status === 401) {
        logout();
        nav("/login");
      }
      console.log(err);
      return;
    }
    const index = tasks.findIndex((t) => t === editTask);
    const updatedTasks = tasks.slice();
    updatedTasks[index].text = task.text;
    updatedTasks[index].day = task.day;
    updatedTasks[index].reminder = task.reminder;
    setTasks(updatedTasks);
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await newRequest.delete(`/todos/${id}`);
    } catch (err) {
      // setErr(err.response.data);
      alert(err.response.data);
      if (err.response.status === 401) {
        logout();
        nav("/login");
      }
      console.log(err);
      return;
    }

    //  We should control the response status to decide if we will change the state or not.
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container my-5">
      <Header
        toggleAdd={() => setShowAddTask(!showAddTask)}
        showAddTask={showAddTask}
        setEditTask={() => setEditTask("")}
      />

      {showAddTask && (
        <AddTask
          addTask={addTask}
          onEdit={handleEditTask2}
          toUpdateTask={editTask}
          setShowAddTask={setShowAddTask}
        />
      )}
      {isLoading ? (
        <ProgressBar
          height="80"
          width="100%"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
      ) : tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder}
          onEdit={handleEditTask}
        />
      ) : (
        "No Tasks To Show"
      )}

      {/* {err && (
        <div
          className="bg-danger fs-5"
          style={{ width: "fit-content", margin: "auto" }}
        >
          {err}
        </div>
      )} */}
    </div>
  );
};

export default Todo;
