import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WorkingHoursComponent } from "../Components/WorkingHoursComponent";

async function ValidateToken(token) {
  const response = await axios.post(
    "/api/admin/BarberToken/verifyToken",
    {},
    {
      headers: { authorization: token },
    }
  );
  return response.status === 202 || response.data;
}

const pages = [
  {
    title: "Sign-in Information",
    completed: false,
    component: <SignupComponent />,
  },
  {
    title: "Working Hours",
    completed: false,
    component: <WorkingHoursComponent />,
  },
  {
    title: "Breaks",
    completed: false,
    component: <TimeSlotPicker />,
  },
  // Add more steps here if needed (e.g., step3: { title: 'Additional Info', completed: false })
];

function CreateBarber() {
  const { token } = useParams();
  const [successful, setSuccessful] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const func = async () => {
      setSuccessful(await ValidateToken(token));
    };
    func();

    return () => {};
  }, []);

  if (successful === false) {
    return <div> Error verifying Token </div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here (e.g., send data to backend)
    const form = new FormData(e.target);
    console.log(Object.fromEntries(form));
  };

  const nextPage = () => {
    setPage((prev) => {
      if (prev < pages.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  };

  const prevPage = () => {
    setPage((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  return (
    <div className='container mx-auto px-4 py-10 h-full-Screen max-w-3xl '>
      <form onSubmit={handleSubmit}>
        <h1>{pages[page].title}</h1>
        {pages[page].component}
        {page !== pages.length ? (
          <NextPreviousButtons
            onNext={nextPage}
            onPrevious={prevPage}
            currentPage={page}
          />
        ) : (
          <></> //TODO: add submit button
        )}
      </form>
    </div>
  );
}

function NextPreviousButtons({ onNext, onPrevious, currentPage }) {
  return (
    <div
      className={`flex ${
        currentPage > 0 ? " justify-between" : "justify-end"
      } mt-4 `}>
      {currentPage > 0 ? (
        <button
          type='button'
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center `}
          onClick={onPrevious}>
          <svg
            className='mr-2 h-6 w-6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 18l-6-6l6-6'
            />
          </svg>
          Prev
        </button>
      ) : null}
      {currentPage < pages.length - 1 ? (
        <button
          type='button'
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center `}
          onClick={onNext}>
          Next
          <svg
            className='ml-2 h-6 w-6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
}

function TimeSlotPicker() {
  const [timeSlots, setTimeSlots] = useState([]);

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { dayOfWeek: "", time: "" }]);
  };

  const removeTimeSlot = (index) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleDayChange = (index, e) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index].dayOfWeek = e.target.value;
    setTimeSlots(updatedTimeSlots);
  };

  const handleTimeChange = (index, e) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index].time = e.target.value;
    setTimeSlots(updatedTimeSlots);
  };

  return (
    <div className='container mx-auto mt-10'>
      <div className='mb-4'>
        <button
          type='button'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={addTimeSlot}>
          Add Time Slot
        </button>
      </div>
      {timeSlots.map((timeSlot, index) => (
        <div key={index} className='border border-gray-300 p-4 mb-4'>
          <button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
            onClick={() => removeTimeSlot(index)}>
            Remove
          </button>
          <label
            htmlFor={`dayOfWeek${index}`}
            className='block mb-2 font-bold text-gray-700'>
            Day of the Week:
          </label>
          <select
            id={`dayOfWeek${index}`}
            className='w-full border border-gray-300 rounded px-3 py-2 mb-3'
            value={timeSlot.dayOfWeek}
            onChange={(e) => handleDayChange(index, e)}>
            <option value=''>Select Day</option>
            <option value='Monday'>Monday</option>
            <option value='Tuesday'>Tuesday</option>
            <option value='Wednesday'>Wednesday</option>
            <option value='Thursday'>Thursday</option>
            <option value='Friday'>Friday</option>
            <option value='Saturday'>Saturday</option>
            <option value='Sunday'>Sunday</option>
          </select>
          <label
            htmlFor={`time${index}`}
            className='block mb-2 font-bold text-gray-700'>
            Time:
          </label>
          <input
            type='time'
            id={`time${index}`}
            className='w-full border border-gray-300 rounded px-3 py-2 mb-3'
            value={timeSlot.time}
            onChange={(e) => handleTimeChange(index, e)}
          />
        </div>
      ))}
    </div>
  );
}

function SignupComponent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  return (
    <div className='grid grid-cols-1 gap-4'>
      {/* First Name */}
      <div className='flex flex-col'>
        <label htmlFor='firstName' className='mb-2 text-sm font-medium'>
          First Name
        </label>
        <input
          type='text'
          id='firstName'
          className='rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* Last Name */}
      <div className='flex flex-col'>
        <label htmlFor='lastName' className='mb-2 text-sm font-medium'>
          Last Name
        </label>
        <input
          type='text'
          id='lastName'
          className='rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* Phone Number */}
      <div className='flex flex-col'>
        <label htmlFor='phoneNumber' className='mb-2 text-sm font-medium'>
          Phone Number
        </label>
        <input
          type='tel'
          id='phoneNumber'
          className='rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* Email */}
      <div className='flex flex-col'>
        <label htmlFor='email' className='mb-2 text-sm font-medium'>
          Email
        </label>
        <input
          type='email'
          id='email'
          className='rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* Password */}
      <div className='flex flex-col'>
        <label htmlFor='password' className='mb-2 text-sm font-medium'>
          Password
        </label>
        <input
          type='password'
          id='password'
          className='rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* Confirm Password */}
      <div className='flex flex-col'>
        <label htmlFor='confirmPassword' className='mb-2 text-sm font-medium'>
          Confirm Password
        </label>
        <input
          type='password'
          id='confirmPassword'
          className='rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  );
}

export default CreateBarber;
