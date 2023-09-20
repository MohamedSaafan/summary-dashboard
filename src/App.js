import logo from "./logo.svg";
import "./App.css";
import moment from "moment";
import { useRef, useState } from "react";
function App() {
  const [source, setSource] = useState(null);
  const textAreaRef = useRef(null);
  let venues;
  let data;
  if (source) {
    data = JSON.parse(`` + source);
    venues = Object.keys(data);
    console.log(source, "from source");
  }
  const Venue = ({ location }) => {
    const days = Object.keys(data[location]).sort((a, b) =>
      moment(a).isBefore(b) ? -1 : 1
    );
    return (
      <div className="location">
        <div className="location__heading">{location}</div>
        <div className="table">
          <div className="table__row">
            <h5 className="table__column table__day ">Day</h5>
            <h5 className="table__column table__date">Date</h5>
            <h5 className="table__column table__actual">Actual</h5>
            <h5 className="table__column table__budget">Budget</h5>
            <h5 className="table__column table__variance">Variance</h5>
            <h5 className="table__column table__26WKAverage">26 WK Average</h5>
            <h5 className="table__column table__variance">Variance</h5>
          </div>
          {days.map((day) => (
            <div className="table__row">
              <p className="table__column table__day">
                {moment(day).format("dddd")}
              </p>
              <p className="table__column table__date">{day}</p>
              <p className="table__column table__actual">
                {data[location][day].sales} $
              </p>
              <p className="table__column table__budget">-</p>
              <p className="table__column table__variance">
                {data[location][day].sales} $
              </p>
              <p className="table__column table__26WKAverage">
                {data[location][day].weekAverage} $
              </p>
              <p className="table__column table__variance">
                {Math.round(
                  data[location][day].weekAverage - data[location][day].sales
                )}{" "}
                $
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  console.log(venues, "from venues");
  const readClipboardText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setSource(text);
    } catch (error) {
      console.error("Error reading clipboard:", error);
    }
  };
  readClipboardText();
  return (
    <div className="App">
      <div className="form">
        <button onClick={() => readClipboardText()}>Submit Copied Data</button>
      </div>

      {data ? (
        venues.map((item) => <Venue location={item} key={item} />)
      ) : (
        <h1>Please Generate the Data from Retool First</h1>
      )}
    </div>
  );
}

export default App;
