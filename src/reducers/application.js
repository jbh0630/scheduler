export function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };
    case SET_INTERVIEW: {
        const states = {
          ...state,
          appointments: {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview: action.interview
          }
        }
      }
      return {
        ...states,
        days: state.days.map(day => ({
          ...day,
          spots: updateSpots(states, day.name)
        }))
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

function updateSpots(state, day) {
  return state.days.find(d => d.name === day)
    .appointments
    .reduce((acc, cur) => {return state.appointments[cur].interview ? acc : acc + 1}, 0)
}