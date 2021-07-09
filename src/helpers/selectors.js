export function getAppointmentsForDay(state, day) {
  const result = [];
  const filtered = state.days.filter(days => days.name === day)
    .map(appointment => appointment.appointments)

  if (filtered.length > 0) {
    filtered[0].map(appointment => result.push(state.appointments[appointment]));
  }
  return result;
}

export function getInterview(state, interview) {
  
  if(!interview) {
    return null;
  }
  
  const interviewer = state.interviewers[interview.interviewer];

  return { ...interview, interviewer };
}

export function getInterviewersForDay(state, day) {
  const interviews = [];
  const filtered = state.days.filter(days => days.name === day)
    .map(appointment => appointment.appointments)

  if (filtered.length > 0) {
    filtered[0]
    .map(appointment => state.appointments[appointment])
    .filter(appointment => appointment.interview !== null)
    .map(appointment =>  interviews.push(state.interviewers[appointment.interview.interviewer]));
  }
  return interviews;
}
