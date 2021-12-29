import NavBar from "./NavBar";
import DateCalendar from "./DateCalendar";
import './MainPage.css'

function MainPage() {
  return (
    <div className="main-container">
      <NavBar />
      <DateCalendar />
    </div>
  );
}

export default MainPage;
