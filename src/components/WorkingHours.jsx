import React, { useState } from "react";
import moment from "moment";

const WorkingHours = () => {
  const [startM, setStartM] = useState("");
  const [endM, setEndM] = useState("");
  var startTimeM = moment(startM, "hh:mm");
  var endTimeM = moment(endM, " hh:mm");
  var diffM = endTimeM.diff(startTimeM, "hours", true) || 0;

  const [startT, setStartT] = useState("");
  const [endT, setEndT] = useState("");
  var startTimeT = moment(startT, "hh:mm");
  var endTimeT = moment(endT, " hh:mm");
  var diffT = endTimeT.diff(startTimeT, "hours", true) || 0;

  const [startW, setStartW] = useState("");
  const [endW, setEndW] = useState("");
  var startTimeW = moment(startW, "hh:mm");
  var endTimeW = moment(endW, " hh:mm");
  var diffW = endTimeW.diff(startTimeW, "hours", true) || 0;

  const [startTu, setStartTu] = useState("");
  const [endTu, setEndTu] = useState("");
  var startTimeTu = moment(startTu, "hh:mm");
  var endTimeTu = moment(endTu, " hh:mm");
  var diffTu = endTimeTu.diff(startTimeTu, "hours", true) || 0;

  const [startF, setStartF] = useState("");
  const [endF, setEndF] = useState("");
  var startTimeF = moment(startF, "hh:mm");
  var endTimeF = moment(endF, " hh:mm");
  var diffF = endTimeF.diff(startTimeF, "hours", true) || 0;
  //   useEffect(() => {
  //     if (endTime < startTime) {

  //       alert("erro");
  //     }
  //   }, [start, endTime]);W
  return (
    <div className="container my-5">
      <div className="row my-2">
        <div className="col-md-3"></div>
        <div className="col-md-3">start</div>
        <div className="col-md-3">end</div>
        <div className="col-md-3">working hours</div>
      </div>

      <div className="row my-2">
        <div className="col-md-3">
          <label htmlFor="monday">Monday</label>
        </div>
        <div className="col-md-3">
          <input
            type="time"
            name="monday"
            id="monday"
            onChange={(e) => setStartM(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="time"
            name="eq_pt"
            id="eq_pt"
            onChange={(e) => setEndM(e.target.value)}
          />
        </div>
        <div className="col-md-3">{diffM}</div>
      </div>

      <div className="row my-2">
        <div className="col-md-3">
          <label htmlFor="monday">Tuesday</label>
        </div>
        <div className="col-md-3">
          <input
            type="time"
            name="monday"
            id="monday"
            onChange={(e) => setStartT(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="time"
            name="eq_pt"
            id="eq_pt"
            onChange={(e) => setEndT(e.target.value)}
          />
        </div>
        <div className="col-md-3">{diffT}</div>
      </div>

      <div className="row my-2">
        <div className="col-md-3">
          <label htmlFor="monday">Wednesday</label>
        </div>
        <div className="col-md-3">
          <input
            type="time"
            name="monday"
            id="monday"
            onChange={(e) => setStartW(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="time"
            name="eq_pt"
            id="eq_pt"
            onChange={(e) => setEndW(e.target.value)}
          />
        </div>
        <div className="col-md-3">{diffW}</div>
      </div>

      <div className="row my-2">
        <div className="col-md-3">
          <label htmlFor="monday">Thursday</label>
        </div>
        <div className="col-md-3">
          <input
            type="time"
            name="monday"
            id="monday"
            onChange={(e) => setStartTu(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="time"
            name="eq_pt"
            id="eq_pt"
            onChange={(e) => setEndTu(e.target.value)}
          />
        </div>
        <div className="col-md-3">{diffTu}</div>
      </div>

      <div className="row my-2">
        <div className="col-md-3">
          <label htmlFor="monday">Friday</label>
        </div>
        <div className="col-md-3">
          <input
            type="time"
            name="monday"
            id="monday"
            onChange={(e) => setStartF(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="time"
            name="eq_pt"
            id="eq_pt"
            onChange={(e) => setEndF(e.target.value)}
          />
        </div>
        <div className="col-md-3">{diffF}</div>
      </div>
      <hr></hr>
      <div className="row my-2">
        <div className="col-md-3">
          <label htmlFor="monday">Total Hours</label>
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-3"></div>
        <div className="col-md-3">{diffM + diffT + diffW + diffTu + diffF}</div>
      </div>
    </div>
  );
};

export default WorkingHours;
