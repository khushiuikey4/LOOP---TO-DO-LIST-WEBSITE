import WeekSummary from "./WeekSummary"
import WeekCardContainer from "./WeekCardContainer"
import NavBarComponent from "./Header"
import { useEffect } from "react"


const MainPage = ({ handleDeleteTask, handleTaskForm, handleUpdateForm, addTaskForm, taskList, toggleCompleted }) => {
    useEffect(() => {

        if (addTaskForm) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

    }, [addTaskForm]);

    return <div className={addTaskForm ? "pointer-events-none opacity-50 max-h-full overflow-hidden" : ""}>
        <NavBarComponent handleTaskForm={handleTaskForm} ></NavBarComponent>
        <WeekSummary taskList={taskList}></WeekSummary>
        <WeekCardContainer handleDeleteTask={handleDeleteTask} handleUpdateForm={handleUpdateForm} toggleCompleted={toggleCompleted} handleTaskForm={handleTaskForm} taskList={taskList}></WeekCardContainer></div>;
}
export default MainPage;