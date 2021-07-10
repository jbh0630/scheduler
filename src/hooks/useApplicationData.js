import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_DAYS = "SET_DAYS";

  function reducer(state, action) {
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
        return {
          ...state,
          appointments: {
            ...state.appointments,
            [action.id]: {
              ...state.appointments[action.id],
              interview: action.interview === null ? null : action.interview,
            },
          },
        };
      }
      case SET_DAYS: {
        return {
          ...state,
          days: action.days,
        };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  function bookInterview(id, interview) {
    return axios
      .put(`api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      })
      .then(() =>
        axios.get("/api/days").then((res) => {
          dispatch({ type: SET_DAYS, days: res.data });
        })
      );
  }

  function cancelInterview(id) {
    return axios
      .delete(`api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      })
      .then(() =>
        axios.get("/api/days").then((res) => {
          dispatch({ type: SET_DAYS, days: res.data });
        })
      );
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
