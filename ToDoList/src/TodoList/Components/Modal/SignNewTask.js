import ModalStyle from "./Modal.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import { listContext } from "../../ToDoList";
import { Col, Container, Row } from "react-bootstrap";

function SignNewTask(props) {
  const [list, setList] = useContext(listContext);
  // const [id, setId] = useState("");
  // const [name, setName] = useState("");
  // const [dob, setDob] = useState("");
  // const [gpa, setGpa] = useState("");
  const [errors, setErrors] = useState("");
  const [form, setForm] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const { id, name, dob, gpa } = form;
    setList([...list, { id, name, dob, gpa }]);
    setForm({});
    props.onHide();
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const validateForm = () => {
    const { id, name, dob, gpa } = form;
    const newErrors = {};

    if (!id || id === "") newErrors.id = "Please enter student id";
    else if (!id.match(/^([D|S|d|s]{1})([E|e]{1})([0-9]{6})$/))
      newErrors.id = "Invalid form id";

    if (!name || name === "") newErrors.name = "Please enter student name";

    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (!dob || dob === "")
      newErrors.dob = "Please enter student date of birth";
    else if (age < 18) {
      newErrors.dob = "Student need to be older than 18 years old";
    }

    if (!gpa || gpa === "")
      newErrors.gpa = "Please enter student date of birth";
    else if (parseInt(gpa) > 10 || parseInt(gpa) < 0 || gpa === "")
      newErrors.gpa = "GPA not accepted";

    return newErrors;
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Dien them thong tin
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className={ModalStyle["input-field"]}>
            <Col lg={3} sm={12} className={ModalStyle["labelInput"]}>
              <label htmlFor="studentId">ID Sinh Vien </label>
            </Col>
            <Col lg={9} sm={12}>
              <input
                type="text"
                id="studentId"
                value={form.id}
                onChange={(e) => {
                  setField("id", e.target.value);
                }}
                isInvalid={!!errors.id}
                name="studentId"
                className={!!errors.id && ModalStyle["red-border"]}
              />
              <span className={ModalStyle["falseid"]}>{errors.id}</span>
            </Col>
          </Row>
          <Row className={ModalStyle["input-field"]}>
            <Col lg={3} sm={12} className={ModalStyle["labelInput"]}>
              <label htmlFor="studentName">Ten sinh vien</label>
            </Col>
            <Col lg={9} sm={12}>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={form.name}
                onChange={(e) => {
                  setField("name", e.target.value);
                }}
                isInvalid={!!errors.name}
                className={!!errors.id && ModalStyle["red-border"]}
              />
              <span className={ModalStyle["falseid"]}>{errors.name}</span>
            </Col>
          </Row>
          <Row className={ModalStyle["input-field"]}>
            <Col lg={3} sm={12} className={ModalStyle["labelInput"]}>
              <label htmlFor="dob">Ngay sinh</label>
            </Col>
            <Col lg={9} sm={12}>
              <input
                type="date"
                id="dob"
                name="dob"
                value={form.dob}
                onChange={(e) => {
                  setField("dob", e.target.value);
                }}
                isInvalid={!!errors.dob}
                className={!!errors.id && ModalStyle["red-border"]}
              />
              <span className={ModalStyle["falseid"]}>{errors.dob}</span>
            </Col>
          </Row>
          <Row className={ModalStyle["input-field"]}>
            <Col lg={3} sm={12} className={ModalStyle["labelInput"]}>
              <label htmlFor="gpa">GPA</label>
            </Col>
            <Col lg={9} sm={12}>
              <input
                type="text"
                id="gpa"
                name="gpa"
                value={form.gpa}
                onChange={(e) => setField("gpa", e.target.value)}
                isInvalid={!!errors.gpa}
                className={!!errors.id && ModalStyle["red-border"]}
              />
              <span className={ModalStyle["falseid"]}>{errors.gpa}</span>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignNewTask;
