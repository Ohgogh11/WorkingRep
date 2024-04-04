import React, { useState } from 'react'
import PopDown from '../Components/PopDown';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function Appointments() {
  const [expandedSection, setExpandedSection] = useState(null);
  const maxSelectableDate = dayjs().add(1, 'month').endOf('month');

  const handleSectionToggle = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null); // Collapse if already expanded
    } else {
      setExpandedSection(section); // Expand if not expanded
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent container collapse
  };

  return (
    <div className="px-3 py-8 flex flex-col items-center gap-4">
      <div className={`section p-3 w-[clamp(350px,90%,500px)] bg-gray-500 shadow-md rounded-xl ${expandedSection === "where" ? "expanded" : ""}`} onClick={() => handleSectionToggle("where")}>
        {expandedSection !== "where" && <h3 className="section-title">Select Barber</h3>}
        {expandedSection === "where" && (
          <div className="section-content" onClick={handleContentClick}>
            <p className="section-label">Where to?</p>
            <input type="text" className="section-input" placeholder="Enter destination" />
            <div className="section-buttons">
              <button className="section-button">Location 1</button>
              <button className="section-button">Location 2</button>
              <button className="section-button">Location 3</button>
            </div>
          </div>
        )}
      </div>
      <div className={`section p-3 w-[clamp(350px,90%,500px)] bg-gray-500 shadow-md rounded-xl ${expandedSection === "when" ? "expanded" : ""}`} onClick={() => handleSectionToggle("when")}>
        {expandedSection !== "when" &&
          <h3 className="section-title">
            When
          </h3>
        }

        {expandedSection === "when" && (
          <div className="section-content" onClick={handleContentClick}>
            <p className="section-label">When's your trip?</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                views={['day']} // Restrict to day view only
                disablePast={true}
                maxDate={maxSelectableDate}
              />
            </LocalizationProvider>
          </div>
        )}
      </div>
      <div className={`section p-3 w-[clamp(350px,90%,500px)] bg-gray-500 shadow-md rounded-xl ${expandedSection === "who" ? "expanded" : ""}`} onClick={() => handleSectionToggle("who")}>
        {expandedSection !== "who" && <h3 className="section-title">Who</h3>}
        {expandedSection === "who" && (
          <div className="section-content" onClick={handleContentClick}>
            <p className="section-label">Who's traveling?</p>
            <input type="text" className="section-input" placeholder="Enter traveler's name" />
          </div>
        )}
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 w-[clamp(350px,90%,500px)] text-white font-semibold px-4 py-2 rounded mt-4">
        Search
      </button>
    </div>
  );
}

export default Appointments
