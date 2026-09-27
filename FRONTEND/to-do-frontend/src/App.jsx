import FoldableWeekCard from "./components/FoldableWeekCard"
import DisplayForm from "./components/DisplayForm"
import MainPage from "./components/MainPage"
import { handleFetchFromServer, handleToggleCompleted, deleteTaskFromServer } from "./Services/service"
import { useState, useEffect } from "react"

function App() {
  let [addTaskForm, setAddTaskForm] = useState(false);
  let [taskList, setTaskList] = useState([]);
  let [updateReq, setUpdateReq] = useState(false);
  let [updateData, setUpdateData] = useState({
    id: "",
    title: "", dateDeadline: "", timeDeadline: "", note: "", Completed: false
  });
  // const [title, setTitle] = useState("");
  // const [dateDeadline, setDateDeadline] = useState("");
  // const [timeDeadline, setTimeDeadline] = useState("");
  // const [note, setNote] = useState("");
  // const [Completed, setCompleted] = useState(false);
  let [formData, setFormData] = useState({
    title: "",
    dateDeadline: "",
    timeDeadline: "",
    note: "",
    Completed: false
  })
  const fetchTasks = async () => {
    const resList = await handleFetchFromServer();
    setTaskList(resList);
  };
  let handleTaskForm = () => {
    setAddTaskForm(prev => !prev);
    setUpdateReq(false);
    fetchTasks();
  }
  let handleUpdateToggle = async () => {
    setUpdateReq(false);
    setAddTaskForm(false);
    const resList = await handleFetchFromServer();
    setTaskList(resList);
  }
  const handleDeleteTask = async (id) => {
    await deleteTaskFromServer(id);
    const resList = await handleFetchFromServer();
    setTaskList(resList);
  }
  let handleUpdateForm = (task) => {
    const deadline = new Date(task.deadline);

    const dateDeadline =
      `${deadline.getFullYear()}-${String(deadline.getMonth() + 1).padStart(2, "0")}-${String(deadline.getDate()).padStart(2, "0")}`;

    const timeDeadline =
      `${String(deadline.getHours()).padStart(2, "0")}:${String(deadline.getMinutes()).padStart(2, "0")}`;

    setUpdateReq(true);

    setUpdateData({
      id: task._id,
      title: task.title,
      dateDeadline: dateDeadline,
      timeDeadline: timeDeadline,
      note: task.note,
      Completed: task.Completed
    });
  }
  useEffect(() => {
    fetchTasks();
  }, []);
  const toggleCompleted = async (task) => {
    await handleToggleCompleted(task);
    const resList = await handleFetchFromServer();
    setTaskList(resList);
  }
  return (
    <>
      {(addTaskForm || updateReq) && <DisplayForm updateReq={updateReq} updateData={updateData} handleUpdateToggle={handleUpdateToggle} fetchTasks={fetchTasks} handleTaskForm={handleTaskForm}></DisplayForm>}
      <MainPage handleDeleteTask={handleDeleteTask} handleUpdateForm={handleUpdateForm} handleTaskForm={handleTaskForm} toggleCompleted={toggleCompleted} taskList={taskList} addTaskForm={addTaskForm}></MainPage>
    </>
  )
}

export default App;