import "./App.scss";
import CalendarContainer from "./components/calendar/CalendarContainer/CalendarContainer";
import HeaderContainer from "./components/header/HeaderContainer/HeaderContainer";
import WeelyContainer from "./components/weekly/WeelyContainer/WeelyContainer";

function App() {
  return (
    <div className="app">
      <HeaderContainer />
      <div className="calendar-content">
        <CalendarContainer />
        <WeelyContainer />
      </div>
    </div>
  );
}

export default App;
