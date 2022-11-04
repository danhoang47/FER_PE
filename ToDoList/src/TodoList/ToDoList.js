import ToDoListStyle from "./ToDoList.module.scss";
import Body from "./Components/Body/Body";
import Modal from "./Components/Modal/SignNewTask";
import { createContext, useMemo, useState } from "react";
import { data } from "./fakeData";

export const listContext = createContext(null);

function ToDoList() {
  const listData = useMemo(() => data, []);
  const [list, setList] = useState(listData);

  return (
    <div>
      <listContext.Provider value={[list, setList]}>
        <Modal />
        <Body />
      </listContext.Provider>
    </div>
  );
}

export default ToDoList;
