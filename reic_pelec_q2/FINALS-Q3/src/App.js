import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");


  // FETCH TASKS
  const fetchTasks = async () => {

    const response = await fetch("https://gabgab2.pythonanywhere.com/api/tasks/");
    const data = await response.json();

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {

    if(title.trim() === "") return;

    await fetch("https://gabgab2.pythonanywhere.com/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        is_completed: false,
      }),
    });

    setTitle("");
    fetchTasks();
  };

  // COMPLETE TASK
  const completeTask = async (task) => {

    await fetch(`https://gabgab2.pythonanywhere.com/api/tasks/${task.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        details: task.details,
        is_completed: true,
      }),
    });

    fetchTasks();
  };

  // DELETE TASK
  const deleteTask = async (taskId) => {

    await fetch(`https://gabgab2.pythonanywhere.com/api/tasks/${taskId}/`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  const pendingTasks = tasks.filter(task => !task.is_completed);
  const completedTasks = tasks.filter(task => task.is_completed);

  return (
    <div className="container">

      <h1>Task Management System</h1>

      <div className="task-form">

        <div className="form-field">
          <label htmlFor="task-title">Task Name</label>
          <input
            id="task-title"
            type="text"
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>


        <button onClick={addTask}>
          Add Task
        </button>

      </div>

      <div className="task-summary">

      </div>

      <div className="task-board">

        <section className="task-column">

          <h2>Pending Tasks</h2>

          <div className="task-list">

            {pendingTasks.map((task) => (

              <div className="task-card" key={task.id}>

                <h3>{task.title}</h3>

                <p>Status: Pending</p>

                {task.details && <p className="task-details">{task.details}</p>}

                <button
                  className="complete-btn"
                  onClick={() => completeTask(task)}
                >
                  Mark as Completed
                </button>

              </div>

            ))}

          </div>

        </section>

        <section className="task-column">

          <h2>Completed Tasks</h2>

          <div className="task-list">

            {completedTasks.map((task) => (

              <div className="task-card completed" key={task.id}>

                <h3>{task.title}</h3>

                <p>Status: Completed</p>

                {task.details && <p className="task-details">{task.details}</p>}

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </section>

      </div>

    </div>
  );
}

export default App;