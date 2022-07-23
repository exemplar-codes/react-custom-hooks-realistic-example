import useFetch from "../../hooks/use-fetch";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const [isLoading, error, fetchTasks] = useFetch();

  function enterTaskHandler(taskText) {
    async function onFetchSuccess(data) {
      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    }

    fetchTasks(
      "https://react-http-88257-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      onFetchSuccess,
      "POST",
      { text: taskText }
    );
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
