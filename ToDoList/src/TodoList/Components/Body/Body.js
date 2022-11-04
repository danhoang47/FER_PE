import { useContext, useState } from "react";
import SignNewTask from "../Modal/SignNewTask";
import BodyStyle from "./Body.module.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { listContext } from "../../ToDoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Body() {
  const [modalShow, setModalShow] = useState(false);
  const [list, setList] = useContext(listContext);

  const deleteStudent = (id) => {
    console.log(id);
    const newList = list.filter((item, index) => index !== id);
    setList(newList);
  };

  return (
    <div>
      <div>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add more
        </Button>
      </div>

      <SignNewTask show={modalShow} onHide={() => setModalShow(false)} />

      <div className={BodyStyle["header"]}>
        <h4 className={BodyStyle["id"]}>ID</h4>
        <h4 className={BodyStyle["name"]}>Name</h4>
        <h4 className={BodyStyle["dob"]}>dob</h4>
        <h4 className={BodyStyle["gpa"]}>GPA</h4>
        <h4 className={BodyStyle["action"]}>Action</h4>
      </div>
      <div>
        <div className={BodyStyle["body"]}>
          {list?.map((item, index) => {
            return (
              <div className={BodyStyle["wrapper"]} key={index}>
                <h4 className={BodyStyle["id"]}>{item.id}</h4>
                <h4 className={BodyStyle["name"]}>{item.name}</h4>
                <h4 className={BodyStyle["dob"]}>{item.dob}</h4>
                <h4 className={BodyStyle["gpa"]}>{item.gpa}</h4>
                <h4 className={BodyStyle["action"]}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteStudent(index)}
                  />
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Body;
