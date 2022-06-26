import "./App.scss";
import CalendarContainer from "./components/calendar/CalendarContainer/CalendarContainer";
import HeaderContainer from "./components/header/HeaderContainer/HeaderContainer";
import ModalList from "./components/modal/ModalList/ModalList";
import WeelyContainer from "./components/weekly/WeelyContainer/WeelyContainer";

function App() {
  return (
    <div className="app">
      <HeaderContainer />
      <div className="calendar-content">
        <CalendarContainer />
        <WeelyContainer />
      </div>
      <ModalList />
    </div>
  );
}

export default App;
