import NewTaskForm from "./NewTaskForm";

const DisplayForm = ({ handleUpdateToggle, handleTaskForm, updateData, updateReq, fetchTasks }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60">
            <NewTaskForm handleUpdateToggle={handleUpdateToggle} updateReq={updateReq} updateData={updateData} fetchTasks={fetchTasks} handleTaskForm={handleTaskForm} onCancel={handleTaskForm} />
        </div>
    );
};

export default DisplayForm;