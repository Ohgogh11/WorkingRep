import React, { useEffect, useMemo, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import BarbersComp from "../Components/BarbersComp";

function ExpandableSection({ title, content, expanded, onToggle, State }) {
  return (
    <div
      className={`section p-3 w-[clamp(350px,90%,500px)] bg-gray-500 shadow-md rounded-xl cursor-pointer`}
      onClick={onToggle}>
      {expanded ? (
        <div className="section-content" onClick={(e) => e.stopPropagation()}>
          <p className="section-label">{title}</p>
          {content}
        </div>
      ) : (
        <div className="flex justify-between px-1">
          <h3 className="section-title">{title}</h3>
          <h3>{State}</h3>
        </div>
      )}
    </div>
  );
}

const FormStage = {
  BARBER: 0,
  DATE: 1,
  TIME: 2,
};

function Appointments() {
  const [form, setForm] = useState({
    Barber: "",
    Date: "",
    Time: "",
  });
  const [expandedSection, setExpandedSection] = useState(FormStage.BARBER);
  const maxSelectableDate = useMemo(() =>
    dayjs().add(1, "month").endOf("month")
  );
  const [availableBarbers, setAvailableBarbers] = useState([]);
  //useState(async () => {
  //   try {
  //     // Make a request to fetch product details using the productId
  //     const response = await fetch(`https://fakestoreapi.com/users`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch product");
  //     }
  //     const data = await response.json();
  //     console.table(data);
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching product:", error);
  //     return null;
  //   }
  // });

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/users"); // Use Axios.get
        // console.table(response.data);
        // response.data.map((user) => console.log(user.username));
        setAvailableBarbers(response.data); // Update state after successful fetch
      } catch (error) {
        console.error("Error fetching barbers:", error);
      }
    };

    fetchBarbers(); // Call the function to fetch data on component mount
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleSectionToggle = (section) => {
    if (expandedSection !== section) {
      setExpandedSection(section); // Expand if not expanded
    }
  };

  const handleBarberSelect = (selectedBarber) => {
    setForm((prevState) => ({ ...prevState, Barber: selectedBarber }));
  };

  return (
    <div className="px-3 py-8 flex flex-col items-center gap-4">
      <ExpandableSection
        title="Select Barber"
        content={
          <div className="grid grid-cols-3 gap-2 py-4 place-items-center">
            {availableBarbers.map((barber) => (
              <BarbersComp
                key={barber.id}
                barber={barber}
                onSelect={handleBarberSelect}
              />
            ))}
          </div>
        }
        expanded={expandedSection === FormStage.BARBER}
        onToggle={() => handleSectionToggle(FormStage.BARBER)} // Pass handleSectionToggle directly
        State={form.Barber}
      />
      <ExpandableSection
        title="Date"
        content={
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              views={["day"]}
              disablePast={true}
              maxDate={maxSelectableDate}
              onChange={(e) => {
                setForm((prevState) => ({
                  ...prevState,
                  Date: dayjs(e).format("YYYY-MM-DD"),
                }));
                console.log("date:" + dayjs(e).format("DD-MM")); //! delete
              }}
            />
          </LocalizationProvider>
        }
        expanded={expandedSection === "Date"}
        onToggle={() => handleSectionToggle("Date")} // Pass handleSectionToggle directly
        State={form.Date}
      />
      <ExpandableSection
        title="Time"
        content={
          <input
            type="text"
            className="section-input"
            placeholder="Enter traveler's name"
          />
        }
        expanded={expandedSection === "Time"}
        onToggle={() => handleSectionToggle("Time")} // Pass handleSectionToggle directly
        State={form.Time}
      />
      <button className="bg-blue-500 hover:bg-blue-600 w-[clamp(350px,90%,500px)] text-white font-semibold px-4 py-2 rounded mt-4">
        Search
      </button>
    </div>
  );

  // return (
  //   <div className="px-3 py-8 flex flex-col items-center gap-4">
  //     <div className={`section p-3 w-[clamp(350px,90%,500px)] bg-gray-500 shadow-md rounded-xl ${expandedSection === "where" ? "expanded" : ""}`} onClick={() => handleSectionToggle("where")}>
  //       {expandedSection !== "where" && <h3 className="section-title">Select Barber</h3>}
  //       {expandedSection === "where" && (
  //         <div className="section-content" onClick={handleContentClick}>
  //           <p className="section-label">Where to?</p>
  //           <input type="text" className="section-input" placeholder="Enter destination" />
  //           <div className="section-buttons">
  //             <button className="section-button">Location 1</button>
  //             <button className="section-button">Location 2</button>
  //             <button className="section-button">Location 3</button>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //     <div className={`section p-3 w-[clamp(350px,90%,500px)] bg-gray-500 shadow-md rounded-xl ${expandedSection === "when" ? "expanded" : ""}`} onClick={() => handleSectionToggle("when")}>
  //       {expandedSection !== "when" &&
  //         <h3 className="section-title">
  //           When
  //         </h3>
  //       }

  //       {expandedSection === "when" && (
  //         <div className="section-content" onClick={handleContentClick}>
  //           <p className="section-label">When's your trip?</p>
  //           <LocalizationProvider dateAdapter={AdapterDayjs}>
  //             <DateCalendar
  //               views={['day']} // Restrict to day view only
  //               disablePast={true}
  //               maxDate={maxSelectableDate}
  //             />
  //           </LocalizationProvider>
  //         </div>
  //       )}
  //     </div>
  //     <div className={`section p-3 w-[clamp(350px,90%,500px)] bg-gray-500 shadow-md rounded-xl ${expandedSection === "who" ? "expanded" : ""}`} onClick={() => handleSectionToggle("who")}>
  //       {expandedSection !== "who" && <h3 className="section-title">Who</h3>}
  //       {expandedSection === "who" && (
  //         <div className="section-content" onClick={handleContentClick}>
  //           <p className="section-label">Who's traveling?</p>
  //           <input type="text" className="section-input" placeholder="Enter traveler's name" />
  //         </div>
  //       )}
  //     </div>
  //     <button className="bg-blue-500 hover:bg-blue-600 w-[clamp(350px,90%,500px)] text-white font-semibold px-4 py-2 rounded mt-4">
  //       Search
  //     </button>
  //   </div>
  // );
}

export default Appointments;
