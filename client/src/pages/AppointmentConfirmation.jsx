import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Icon from "../assets/AlphaMenLogo.jpeg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppointmentConfirmation() {
  const { token } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["AppointmentDetails"],
    queryFn: async () => {
      const response = await axios.get("/api/Appointments/getAppointment", {
        headers: { authorization: token },
      });
      return response.data;
    },
  });

  const confirmAppointmentMutation = useMutation({
    mutationKey: ["ConfirmAppointments"],
    mutationFn: async () => {
      const response = await axios.put(
        "/api/Appointments/confirmAppointment",
        {},
        {
          headers: { authorization: token },
        }
      );
      return response.data;
    },
    onMutate: (variables) => {
      queryClient.cancelQueries({ queryKey: ["AppointmentDetails"] });

      // Add optimistic todo to todos list
      queryClient.setQueryData(["AppointmentDetails"], (old) => [
        ...(old[0].status = "confirmed"),
      ]);

      // Return context with the optimistic todo
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["AppointmentDetails"], (old) => [
        ...(old[0].status = "pending"),
      ]);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["AppointmentDetails"] });
    },
    retry: 3,
    retryDelay: 1000, //
  });

  const deleteAppointmentMutation = useMutation({
    mutationKey: ["CancelAppointments"],
    mutationFn: async () => {
      const response = await axios.delete(
        "/api/Appointments/deleteAppointment",
        {
          headers: { authorization: token },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast("Successfully deleted Appointment");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
    onError: () => {
      toast("Error deleting Appointment");
    },
  });

  if (isError) {
    return <div>there was and error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess || !data || (Array.isArray(data) && data.length === 0)) {
    return <div>something went wrong</div>;
  }

  const { status, first_name, name, date, time } = data[0];

  return (
    <>
      <div className='sm:px-2 mx-auto tracking-tight max-w-2xl mt-28 mb-10 sm:mt-36'>
        <div className='px-2 sm:border rounded-md sm:shadow-sm flex w-full'>
          <div>
            <div className='absolute right-0 left-0  top-32 sm:top-40'>
              <div className='text-center mx-auto w-32 h-32'>
                <img
                  alt='Business Logo'
                  className=' bg-white rounded-full border border-gray-200 shadow object-center object-cover'
                  src={Icon}
                />
              </div>
            </div>
            <div className='p-2 sm:p-5 pt-16'>
              <div className='text-center text-xl font-medium sm:pt-12 tracking-tight'>
                <span>Alphamen Barbershop</span>
                <span className=''>התור שלך ל</span>
              </div>
              <div className='text-center font-normal justify-center  text-gray-600 space-x-1 space-x-reverse flex flex-row-reverse'>
                <span className=''>{first_name} היי</span>
                <span>אלו פרטי התור שלך.</span>
                <span>הגעתך אושרה.</span>
              </div>
              <hr className='my-6 sm:my-7' />
              <div>
                <div className='flex flex-row-reverse text-end items-center space-x-3 sm:space-x-5 sm:space-x-reverse space-x-reverse'>
                  {status !== "pending" ? (
                    <div className='border space-y-1 w-28 sm:w-32  border-green-400 p-3 sm:p-3 rounded-md tracking-tight leading-tight flex justify-center items-center text-center flex-col'>
                      <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 1024 1024'
                        className='text-green-400'
                        height='28'
                        width='28'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path d='M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z'></path>
                      </svg>
                      <div className='text-gray-700'>מוזמן</div>
                    </div>
                  ) : (
                    <button
                      className='h-full border border-green-500 p-4 rounded-lg'
                      onClick={() => confirmAppointmentMutation.mutate()}>
                      אשר הגעה
                    </button>
                  )}
                  <div className='space-y-2'>
                    <div className='tracking-tight'>
                      <div className='font-medium text-gray-800'>{name}</div>
                    </div>
                    <div className='flex flex-row-reverse items-center text-sm text-gray-600'>
                      <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 24 24'
                        height='15'
                        width='15'
                        xmlns='http://www.w3.org/2000/svg'>
                        <g>
                          <path fill='none' d='M0 0h24v24H0z'></path>
                          <path d='M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2zm11 9H4v9h16v-9zm-4.964 1.136l1.414 1.414-4.95 4.95-3.536-3.536L9.38 12.55l2.121 2.122 3.536-3.536zM7 5H4v3h16V5h-3v1h-2V5H9v1H7V5z'></path>
                        </g>
                      </svg>
                      <div className='mr-2 text-gray-600 text-sm'>
                        {formatDateTime(date, time)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className='my-6 sm:my-7' />
              <div className='tracking-tight space-y-4 text-end'>
                <div className='space-y-2'>
                  <h3 className='font-medium text-gray-800 tracking-tight leading-none'>
                    ביטול התור
                  </h3>
                  <p className='text-sm bg-yellow-50 text-yellow-800 p-2 px-3 rounded-lg inline-block'>
                    לקוח יקר, אבקש להגיע לתור 5 דק לפני הזמן שנקבע. איחור מעל 10
                    דק מבטל את התור אוטומטית. אי הגעה/ביטול בזמן יוביל לתשלום על
                    תור מלא
                  </p>
                  <p className='text-sm text-gray-500 font-normal tracking-tight space-x-1 space-x-reverse'>
                    <span>לא יכולים להגיע? אנא בטלו את התור עד</span>
                    <span className='font-bold underline'>3 שעות מראש </span>
                    <span>בכדי לאפשר ללקוחות אחרים להגיע במקומכם.</span>
                  </p>
                </div>
                <button
                  className='hover:opacity-75 p-2 px-8 bg-white text-sm text-gray-700 border border-gray-700 rounded'
                  onClick={() => deleteAppointmentMutation.mutate()}>
                  ביטול התור
                </button>
              </div>
              <hr className='w-full border-t border-gray-300 my-4 ' />
              <div className='flex flex-col items-end text-end tracking-tight space-y-4'>
                <div className='space-y-2'>
                  <h3 className='font-medium text-gray-800 tracking-tight leading-none'>
                    צרו קשר
                  </h3>
                  <p className='text-sm text-gray-500 font-normal tracking-tight'>
                    צריכים עזרה? יש שאלות? דברו איתנו.
                  </p>
                </div>
                <div className='flex flex-row-reverse space-x-2 space-x-reverse'>
                  <a
                    className='bg-white hover:bg-gray-50 text-sm inline-flex items-center text-center justify-center flex-row-reverse  text-gray-700 p-2 w-32 border border-gray-700 rounded space-x-2 space-x-reverse'
                    href='tel:0507569955'>
                    <svg
                      stroke='currentColor'
                      fill='none'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'></path>
                    </svg>
                    <span className=''>התקשרו</span>
                  </a>
                  <a
                    className='bg-white hover:bg-gray-50 text-sm md:hidden inline-flex items-center text-center justify-center flex-row-reverse text-gray-700 p-2 w-32 border border-gray-700 rounded space-x-2 space-x-reverse'
                    target='_blank'
                    href=''>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth='0'
                      role='img'
                      viewBox='0 0 24 24'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'>
                      <title></title>
                      <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z'></path>
                    </svg>
                    <span className=''>וואטסאפ</span>
                  </a>
                  <a
                    className='bg-white hover:bg-gray-50 text-sm hidden md:inline-flex items-center text-center justify-center flex-row-reverse  text-gray-700 p-2 w-32 border border-gray-700 rounded space-x-2 space-x-reverse'
                    target='_blank'
                    href='/redirect?external=true&amp;link=https://wa.me/9720507569955'>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth='0'
                      role='img'
                      viewBox='0 0 24 24'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'>
                      <title></title>
                      <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z'></path>
                    </svg>
                    <span className=''>וואטסאפ</span>
                  </a>
                </div>
              </div>
              <hr className='my-6 sm:my-7' />
              <div className='tracking-tight space-y-4 text-end'>
                <div className='space-y-2'>
                  <h3 className='font-medium text-gray-800 tracking-tight leading-none'>
                    איך מגיעים?
                  </h3>
                  <p className='text-sm text-gray-500 font-normal tracking-tight'>
                    כתובתנו היא{" "}
                    <span className='font-medium text-gray-500'>
                      הרצל 42 , גן יבנה
                    </span>
                  </p>
                </div>
                <div className='flex flex-row-reverse space-x-2 space-x-reverse'>
                  <a
                    className='bg-white hover:bg-gray-50 text-sm inline-flex items-center text-center justify-center text-gray-700 flex-row-reverse p-2 w-32 border border-gray-700 rounded space-x-2 space-x-reverse'
                    target='_blank'
                    href='https://waze.com/ul?q=הרצל 42 , גן יבנה&amp;navigate=yes'>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth='0'
                      viewBox='0 0 512 512'
                      height='16'
                      width='16'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path d='M502.17 201.67C516.69 287.53 471.23 369.59 389 409.8c13 34.1-12.4 70.2-48.32 70.2a51.68 51.68 0 0 1-51.57-49c-6.44.19-64.2 0-76.33-.64A51.69 51.69 0 0 1 159 479.92c-33.86-1.36-57.95-34.84-47-67.92-37.21-13.11-72.54-34.87-99.62-70.8-13-17.28-.48-41.8 20.84-41.8 46.31 0 32.22-54.17 43.15-110.26C94.8 95.2 193.12 32 288.09 32c102.48 0 197.15 70.67 214.08 169.67zM373.51 388.28c42-19.18 81.33-56.71 96.29-102.14 40.48-123.09-64.15-228-181.71-228-83.45 0-170.32 55.42-186.07 136-9.53 48.91 5 131.35-68.75 131.35C58.21 358.6 91.6 378.11 127 389.54c24.66-21.8 63.87-15.47 79.83 14.34 14.22 1 79.19 1.18 87.9.82a51.69 51.69 0 0 1 78.78-16.42zM205.12 187.13c0-34.74 50.84-34.75 50.84 0s-50.84 34.74-50.84 0zm116.57 0c0-34.74 50.86-34.75 50.86 0s-50.86 34.75-50.86 0zm-122.61 70.69c-3.44-16.94 22.18-22.18 25.62-5.21l.06.28c4.14 21.42 29.85 44 64.12 43.07 35.68-.94 59.25-22.21 64.11-42.77 4.46-16.05 28.6-10.36 25.47 6-5.23 22.18-31.21 62-91.46 62.9-42.55 0-80.88-27.84-87.9-64.25z'></path>
                    </svg>
                    <span className=''>ניווט למקום</span>
                  </a>
                  <a
                    className='bg-white hover:bg-gray-50 flex-row-reverse text-sm inline-flex items-center text-center justify-center text-gray-700 p-2 w-32 border border-gray-700 rounded space-x-2 space-x-reverse'
                    target='_blank'
                    href='https://www.google.com/maps?q=הרצל 42 , גן יבנה&amp;iwloc=output=embed&amp;hl=he'>
                    <svg
                      stroke='currentColor'
                      fill='none'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      height='16'
                      width='16'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
                      <circle cx='12' cy='10' r='3'></circle>
                    </svg>
                    <span className=''>הצג מפה</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
}

export default AppointmentConfirmation;

function formatDateTime(date, time) {
  date = new Date(date);
  time = String(time);
  // Day names in Hebrew
  const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

  // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const dayOfWeek = date.getDay();

  // Convert the day of the week to Hebrew
  const hebrewDay = dayNames[dayOfWeek];

  // Format the date in DD/MM/YYYY format
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const formattedTime = time.substring(0, time.lastIndexOf(":"));
  // Combine the formatted date and time
  const dateTimeSentence = `יום ${hebrewDay}, ${formattedDate}, ${formattedTime}`;

  return dateTimeSentence;
}
