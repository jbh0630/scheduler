export function getAppointmentsForDay(state, day) {
  let result = [];
  const filter = state.days.filter(days => days.name === day)
    .map(appointment => appointment.appointments)

  if (filter.length > 0) {
    filter[0].map(appointment => result.push(state.appointments[appointment]));
  }
  return result;
}


