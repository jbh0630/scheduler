import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";

export default function Application(props) {

  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "2pm",
    },
    {
      id: 4,
      time: "3pm",
      interview: {
        student: "Archie cohen",
        interviewer: {
          id: 1,
          name: "Tori Malcolm",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 5,
      time: "4pm",
      interview: {
        student: "Maria Boucher",
        interviewer: {
          id: 1,
          name: "Mildred Nazir",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    }
  ];

  const [days, setDays] = useState([]);

  const appointmentList = appointments.map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    );
  });

  useEffect(() => {
    const url = "http://localhost:8001/api/days";
    axios.get(url).then(response => {
      setDays([...response.data]);
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={[]}
            setDay={[]}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
