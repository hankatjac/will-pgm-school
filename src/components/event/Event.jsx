import React, { useState, useEffect, useContext } from "react";
import Schedule from "./Schedule";
import moment from "moment";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
import newRequest from "../../utils/newRequest";

const Event = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const { logout } = useContext(AuthContext);
  const [fetch, setfetch] = useState(true);
  const [clickedEvent, setClickedEvent] = useState({});
  const [events, setEvents] = useState([
    // const [err, setErr] = useState("");
    // {
    //   title: "Big Meeting",
    //   start: new Date("Feb 2 2023 03:00:00"),
    //   end: new Date("Feb 2 2023 13:00:00"),
    // },
    // {
    //   title: "Vacation",
    //   start: new Date("Feb 7 2023 03:00:00"),
    //   end: new Date("Feb 7 2023 13:00:00"),
    // },
    // {
    //   title: "Conference",
    //   start: new Date("Feb 23 2023 03:00:00"),
    //   end: new Date("Feb 23 2023 16:00:00"),
    // },
    // {
    //   title: "Maintenance",
    //   start: new Date("Feb 24 2023 03:00:00"),
    //   end: new Date("Feb 24 2023 05:00:00"),
    //   desc: "computer upgrade",
    // },
  ]);

  useEffect(() => {
    if (fetch) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const res = await newRequest.get(`/events`);
          const originalEvents = res.data;
          setEvents(
            originalEvents.map((appointment) => {
              return {
                ...appointment,
                start: new Date(appointment.start),
                end: new Date(appointment.end),
              };
            })
          );
        } catch (err) {
          // setErr(err.response.data);
          alert(err.response.data);
          console.log(err);
          return;
        }
        setfetch(false);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [fetch, setfetch]);

  const addEvent = async (appointment) => {
    try {
      await newRequest.post(`/events/`, appointment);
    } catch (err) {
      // setErr(err.response.data);
      alert(err.response.data);
      console.log(err);
      if (err.response.status === 401) {
        logout();
        nav("/login");
      }
      return
    }
    setfetch(true);
    // console.log("appointment", appointment);
    // events.push(appointment);
    // setEvents([...events, appointment]);
    // console.log(events);
  };

  console.log(events);

  const selectedEvent = (eventSelected) => setClickedEvent(eventSelected);

  console.log(JSON.stringify(clickedEvent));

  const updateEvent = async (appointment) => {
    try {
      await newRequest.put(`/events/${appointment.id}`, appointment);
    } catch (err) {
      // setErr(err.response.data);
      alert(err.response.data);
      console.log(err);
      if (err.response.status === 401) {
        logout();
        nav("/login");
      }
      return;
    }

    const index = events.findIndex((event) => event === clickedEvent);
    const updatedEvents = events.slice();
    updatedEvents[index].title = appointment.title;
    updatedEvents[index].desc = appointment.desc;
    updatedEvents[index].start = new Date(appointment.start);
    updatedEvents[index].end = new Date(appointment.end);
    setEvents(updatedEvents);
  };

  //  filters out specific event that is to be deleted and set that variable to state
  const deleteEvent = async () => {
    try {
      await newRequest.delete(`/events/${clickedEvent.id}`);
    } catch (err) {
      // setErr(err.response.data);
      console.log(err);
      alert(err.response.data);
      if (err.response.status === 401) {
        logout();
        nav("/login");
      }
      return;
    }
    // // localStorage.setItem("cachedEvents", JSON.stringify(updatedEvents));
    // // setState({ events: updatedEvents });
    let updatedEvents = events.filter((event) => event.id !== clickedEvent.id);
    setEvents(updatedEvents);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <h1 className="text-center fw-bolder">Upcoming events</h1>
        <div id="main" className="col-12 col-md-5 pt-5">
          {isLoading ? (
            <ProgressBar
              height="80"
              width="100%"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{}}
              wrapperClass="progress-bar-wrapper"
              borderColor="#F4442E"
              barColor="#51E5FF"
            />
          ) : (
            events.map((event, index) => {
              const { title, desc, start, end } = event;
              return (
                <div key={index}>
                  {" "}
                  <h2>
                    <a href="#">{title}</a>
                  </h2>
                  <div className="metadata">
                    <time>
                      Start{" "}
                      <span>{moment(start).format("YYYY-MM-DD HH:mm")}</span>
                    </time>{" "}
                    <time>
                      End <span>{moment(end).format("YYYY-MM-DD HH:mm")}</span>
                    </time>
                  </div>
                  <p>{desc} </p>
                </div>
              );
            })
          )}
          {/* {err && (
            <div
              className="bg-danger fs-5"
              style={{ width: "fit-content", margin: "auto" }}
            >
              {err}
            </div>
          )} */}
        </div>
        <div className="col-12 col-md-7">
          <Schedule
            events={events}
            addEvent={addEvent}
            updateEvent={updateEvent}
            selectedEvent={selectedEvent}
            deleteEvent={deleteEvent}
            clickedEvent={clickedEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default Event;
