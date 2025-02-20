import { useState, useContext, createContext ,useEffect } from "react";

const TeacherContext = createContext();

const TeacherProvider = ({ children }) => {
  const [teacher, setTeacher] = useState({teacher: { admin: false }});

  //
  useEffect(() => {
    const data = localStorage.getItem("teacher");
    if (data) {
      const parsedata = JSON.parse(data);
      setTeacher(parsedata);
    }
  }, [teacher]);

  return (
    <TeacherContext.Provider value={[teacher, setTeacher]}>
      {children}
    </TeacherContext.Provider>
  );
};

const useTeacher = () => useContext(TeacherContext);

export { useTeacher, TeacherProvider };
