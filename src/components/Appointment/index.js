import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDITING = "EDITING";

export default function Appointment(props) {

  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    
    if (name && interviewer) {
      transition(SAVING);
      const interview = {
        student: name,
        interviewer
      };

      props.bookInterview(props.id, interview)
        .then(res => transition(SHOW))
        .catch((err) => console.log(err))
    }
  }

  function deleting() {
    transition(CONFIRM);
    if (mode === CONFIRM) {
      transition(DELETING);
      props.cancelInterview(props.id)
        .then(res => transition(EMPTY))
        .catch((err) => console.log(err))
    }
  }

  function edit() {
    transition(EDITING);

  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleting}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />)}
        {mode === SAVING && (<Status message={SAVING} />)}
        {mode === DELETING && (<Status message={DELETING} />)}
        {mode === CONFIRM && (
        <Confirm  
          onCancel={back}
          onConfirm={deleting}
        />)}
        {mode === EDITING && (
        <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />)}
    </article>
  );
}