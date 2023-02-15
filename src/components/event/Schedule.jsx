import React, { useContext, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@mui/system";

import axios from "axios";

const localizer = momentLocalizer(moment);

const Schedule = ({
  events,
  addEvent,
  updateEvent,
  selectedEvent,
  deleteEvent,
  clickedEvent,
}) => {
  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [desc, setDesc] = useState("");
  const [openSlot, setOpenSlot] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);

  const handleClose = () => {
    setOpenEvent(false);
    setOpenSlot(false);
  };

  const handleSlotSelected = (slotInfo) => {
    console.log("Real slotInfo", slotInfo);
    setTitle("");
    setDesc("");
    setStart(slotInfo.slots[0]);
    setEnd(slotInfo.slots.slice(-1)[0]);
    setOpenSlot(true);
  };

  const handleNewAppointment = () => {
    let appointment = {
      title,
      desc,
      start: moment(start).format("YYYY-MM-DD HH:mm"),
      end: moment(end).format("YYYY-MM-DD HH:mm"),
    };
    addEvent(appointment);
  };

  const handleEventSelected = (event) => {
    // console.log(event.title);
    setOpenEvent(true);
    selectedEvent(event);
    setId(event.id);
    setStart(event.start);
    setEnd(event.end);
    setTitle(event.title);
    setDesc(event.desc);
  };

  //  Updates Existing Appointments Title and/or Description
  const handleUpdateEvent = () => {
    let appointment = {
      id,
      title,
      desc,
      start: moment(start).format("YYYY-MM-DD HH:mm"),
      end: moment(end).format("YYYY-MM-DD HH:mm"),
    };

    if (
      appointment.title == clickedEvent.title &&
      appointment.desc == clickedEvent.desc &&
      appointment.start ==
        moment(clickedEvent.start).format("YYYY-MM-DD HH:mm") &&
      appointment.end == moment(clickedEvent.end).format("YYYY-MM-DD HH:mm")
    ) {
      alert("nothing changed!");
      return;
    }
    updateEvent(appointment);
  };
  
  return (
    <div id="Calendar">
      {/* react-big-calendar library utilized to render calendar */}

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectEvent={(event) => handleEventSelected(event)}
        onSelectSlot={(slotInfo) => handleSlotSelected(slotInfo)}
        style={{ height: 500, margin: "50px" }}
      />

      {/* @mui/material Modal for booking new appointment */}
      <Dialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={openSlot}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {`Make Event on ${moment(start).format("MMMM Do YYYY")}`}
        </DialogTitle>

        <DialogContent>
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "75%",
                display: "grid",
              },
            }}
          >
            <TextField
              required
              id="standard-required"
              label="Title"
              variant="standard"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              required
              id="standard-required"
              label="Description"
              variant="standard"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="start time"
                value={start}
                onChange={(date) => {
                  setStart(date.$d);
                }}
                renderInput={(params) => <TextField {...params} />}
              />

              <TimePicker
                label="end time"
                value={end}
                onChange={(date) => {
                  setEnd(date.$d);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleNewAppointment();
              handleClose();
            }}
            autoFocus
          >
            {" "}
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* @mui/material Modal for Existing Event */}

      <Dialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={openEvent}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {`View/Edit event on ${moment(start).format("MMMM Do YYYY")}`}
        </DialogTitle>

        <DialogContent>
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "75%",
                display: "grid",
              },
            }}
          >
            <TextField
              required
              id="standard-required"
              label="Title"
              variant="standard"
              defaultValue={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              required
              id="standard-required"
              label="Description"
              variant="standard"
              defaultValue={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="start time"
                value={start}
                onChange={(d) => {
                  setStart(d.$d);
                }}
                renderInput={(params) => <TextField {...params} />}
              />

              <TimePicker
                label="end time"
                value={end}
                onChange={(date) => {
                  setEnd(date.$d);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button
            onClick={() => {
              deleteEvent();
              handleClose();
            }}
          >
            Delete
          </Button>

          <Button
            onClick={() => {
              handleUpdateEvent();
              handleClose();
            }}
          >
            Confirm Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Schedule;
