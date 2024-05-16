import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { StepperContext } from "../../contexts/StepperContext";
import { formatDate } from "../formatDate";

async function fetchAvailableHours(selectedDate, first_name, headerAuth) {
  const response = await axios.get("/api/Appointments/getAvailableHours", {
    params: {
      first_name: first_name,
      selectedDate: selectedDate, // YYYY-MM-DD
    },
    headers: { authorization: headerAuth },
  });
  return response.data;
}

function DateTimeSelection() {
  const { formData, setFormData, setFinishedStep, headerAuth } =
    useContext(StepperContext);
  const mounted = useRef(false);

  useEffect(() => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, date: dayjs().format("YYYY-MM-DD") };
      console.table(updatedFormData);
      return updatedFormData;
    });
  }, []);
  // const [selectedDate, setSelectedDate] = useState(() => {
  //   return dayjs().format("YYYY-MM-DD");
  // });
  const [showAll, setShowAll] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const maxSelectableDate = useMemo(() => dayjs().add(1, "month"));

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["AvailableHours"],
    queryFn: () =>
      fetchAvailableHours(
        formData.date || dayjs().format("YYYY-MM-DD"),
        formData.barbersName,
        headerAuth
      ),
    enabled: false,
  });

  useEffect(() => {
    if (mounted.current) {
      refetch();
    }
    mounted.current = true;
  }, [formData.date]);

  useEffect(() => {
    formData.time === "" ? setFinishedStep(false) : setFinishedStep(true);
  }, [formData.time]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data + {error.message}</div>;
  }

  const handleDateChange = (e) => {
    if (dayjs(e).format("YYYY-MM-DD") !== formData.date) {
      setFormData((prev) => {
        const updatedFormData = {
          ...prev,
          date: dayjs(e).format("YYYY-MM-DD"),
          time: "",
        };
        console.table(updatedFormData);
        setSelectedItemIndex(null);
        return updatedFormData;
      });
    }
  };
  const handleTimeChange = (time, index) => {
    if (time !== formData.time) {
      setFormData((prev) => {
        const updatedFormData = { ...prev, time: time };
        console.table(updatedFormData);
        return updatedFormData;
      });
      setSelectedItemIndex(index);
    }
  };
  const toggleShow = () => {
    setShowAll((prev) => {
      return !prev;
    });
  };

  return (
    <div className=' flex flex-col items-center'>
      <div className='mb-5 text-end max-w-[320px] w-full '>
        <h1 className='font-bold text-xl '>?מתי תרצו להגיע</h1>
        <mark className=' bg-yellow-200 text-sm px-1 rounded-md text-red-950 font-semibold'>
          יש לקבוע תור מינימום שעה מראש
        </mark>
      </div>
      <div className='border-2 rounded-md shadow-lg m-3'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            views={["day"]}
            disablePast={true}
            maxDate={maxSelectableDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </div>
      <div className='flex flex-col items-center justify-center pb-5'>
        <h2 className='flex gap-1 text-sm items-center'>
          אפשרויות הגעה
          <div className='font-bold text-green-600 text-base'>
            {data?.length}
          </div>
        </h2>
        <h1 className='font-semibold text-gray-800'>
          {formatDate(formData.date)}
        </h1>
      </div>
      <div className='w-full flex flex-col items-center'>
        <div className='grid grid-cols-3 gap-3 max-w-[320px] w-full'>
          {data?.slice(0, showAll ? data?.length : 12).map((time, index) => {
            return (
              <button
                key={index}
                onClick={() => handleTimeChange(time, index)}
                className={`py-1 border-2 text-sm  rounded-md ${
                  selectedItemIndex === index
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}>
                <div className='font-semibold'>{time}</div>
                <div className='text-xs'> עד </div>
              </button>
            );
          })}
        </div>
        {data?.length > 6 && (
          <button
            onClick={toggleShow}
            className='bg-blue-500 text-white px-4 py-2 rounded-md w-full max-w-[320px] mt-3'>
            {showAll ? "Show Less" : "Show All"}
          </button>
        )}
      </div>
    </div>
  );
}

export default DateTimeSelection;
