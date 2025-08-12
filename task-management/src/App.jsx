import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import PageSidebar from "./components/PageSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectSelected, setProjectSelected] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleSelectedProject(id) {
    setProjectSelected((preSelected) => {
      return {
        ...preSelected,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddPeoject() {
    setProjectSelected((preSelected) => {
      return {
        ...preSelected,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectSelected((preSelected) => {
      return {
        ...preSelected,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectDetails) {
    setProjectSelected((prevSele) => {
      const newProject = { ...projectDetails, id: Math.random() };
      return {
        ...prevSele,
        selectedProjectId: undefined,
        projects: [...prevSele.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectSelected((preSelected) => {
      return {
        ...preSelected,
        selectedProjectId: undefined,
        projects: preSelected.projects.filter(
          (project) => project.id !== preSelected.selectedProjectId
        ),
      };
    });
  }

  function handleAddTesk(text) {
    setProjectSelected((prevSele) => {
      const newTask = {
        text: text,
        projectId: prevSele.selectedProjectId,
        id: Math.random(),
      };
      return {
        ...prevSele,
        tasks: [newTask, ...prevSele.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectSelected((preSelected) => {
      return {
        ...preSelected,
        tasks: preSelected.tasks.filter((task) => task.id !== id),
      };
    });
  }

  console.log(projectSelected);

  const selectedProject = projectSelected.projects.find(
    (project) => project.id === projectSelected.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTesk}
      onDeleteTask={handleDeleteTask}
      tasks={projectSelected.tasks}
    />
  );

  if (projectSelected.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectSelected.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddPeoject} />;
  }

  return (
    <main className="h-screen my-8rem flex gap-8">
      <PageSidebar
        onStartAddProject={handleStartAddPeoject}
        projects={projectSelected.projects}
        onSelectProject={handleSelectedProject}
        selectedProjectId={projectSelected.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
