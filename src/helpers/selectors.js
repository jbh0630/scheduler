function getAppointmentsForDay(state, day) {
  let result = [];
  const filter = state.days.filter(days => days.name === day)
    .map(appointment => appointment.appointments)

  if (filter.length > 0) {
    filter[0].map(appointment => result.push(state.appointments[appointment]));
  }
  return result;
}

function getInterview(state, interview) {
  
  if(!interview) {
    return null;
  }
  
  const student = interview.student;
  const interviewer = state.interviewers[interview.interviewer];

  return { student: student, interviewer };

}


module.exports = { getAppointmentsForDay, getInterview };