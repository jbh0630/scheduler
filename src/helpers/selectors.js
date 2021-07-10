export function getAppointmentsForDay(state, day) {
  const found = state.days.find(d => day === d.name);
  if (state.days.length === 0 || found === undefined) return [];
  return found.appointments.map(appointment => state.appointments[appointment]);
}

export function getInterview(state, interview) {
  
  if(!interview) {
    return null;
  }
  
  const interviewer = state.interviewers[interview.interviewer];

  return { ...interview, interviewer };
}

export function getInterviewersForDay(state, day) {
  
  const found = state.days.find(d => day === d.name);
  if (state.days.length === 0 || found === undefined) return [];
  return found.interviewers.map(id => state.interviewers[id]);
}
