import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {

  const interviewersList = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.selected == props.selected}
        setInterviewer={props.setInterviewer(interviewer.name)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersList}</ul>
    </section>
  );
}