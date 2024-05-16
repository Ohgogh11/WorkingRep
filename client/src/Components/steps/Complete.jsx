import React, { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";
import { formatDate } from "../formatDate";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SuccessfulAppointment } from "../SuccessfulAppointment";

const CreateAppointment = async (data, accessToken) => {
  try {
    const response = await axios.post(
      "/api/Appointments/InsertAppointment",
      { ...data },
      {
        headers: { authorization: accessToken },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message || error);
  }
};

function Complete({ handleClick }) {
  const { formData, setFormData, setFinishedStep, headerAuth, authUser } =
    useContext(StepperContext);
  const firstName = authUser.firstName;

  const CreateAppointmentMutation = useMutation({
    mutationFn: () => CreateAppointment(formData, headerAuth),
    mutationKey: ["Schedule Appointment"],
  });

  const handleSubmit = () => {
    CreateAppointmentMutation.mutate(); // TODO: add to check if insertion was successful and then show status
  };

  return (
    <div>
      <div className=''>
        <div className='flex justify-end mb-3 gap-2'>
          <h1 className='font-bold text-[17px] flex items-center'>
            נא אשרו את הזמנתכם
          </h1>
          {!CreateAppointmentMutation.isSuccess ? (
            <button
              onClick={() => handleClick()}
              className='flex items-center pt-0.5 text-[16px] border px-1.5 rounded-md'>
              <ion-icon name='chevron-forward-outline'></ion-icon>
            </button>
          ) : null}
        </div>
        <div className=' container border rounded-md flex flex-col items-end gap-2 justify-end p-2 text-[13px] font-bold '>
          <h2 className='flex'>
            <div>{formData.service.name}</div>
            <div>תור ל</div>
          </h2>
          <h3 className='flex flex-col items-end'>
            <div className='flex items-center text-xs'>
              <div className='flex'>
                <div>{formData.time} בשעה </div>
                <div className='pl-1'>,{formatDate(formData.date)}</div>
              </div>
              <div className='relative top-[1px] ml-1'>
                <FaRegCalendarCheck />
              </div>
            </div>
            <div className=' pt-2 flex gap-1'>
              <small className=' bg-gray-200 rounded-md px-1 text-[11px]'>
                30min
              </small>
              <small className=' bg-gray-200 rounded-md text-[11px] px-1'>
                &#x20AA;{formData.service.initial_cost}
              </small>
            </div>
          </h3>
          {!CreateAppointmentMutation.isSuccess ? (
            <textarea
              className='w-full h-20 bg-yellow-100  border rounded-sm border-orange-200 text-xs text-end focus:outline-none p-1 resize-none'
              placeholder='כאן תוכלו להוסיף הערה לבעל העסק לגבי התור שלכם'
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, comment: e.target.value }))
              }
            />
          ) : null}
        </div>
        <div className='container pt-2 flex flex-col gap-3'>
          {!CreateAppointmentMutation.isSuccess ? (
            <>
              <div className='w-full text-center font-bold text-xl pt-4'>
                !{firstName} ,ברוך הבאה
              </div>
              <div className=' text-center text-[12px] font-semibold'>
                וודאו כי פרטי התור תקינית ולחצו על{" "}
                <span className='text-green-500'> "קבע תור" </span>לסיום התהליך
                וקביעת התור שלכם
              </div>
            </>
          ) : null}
          {CreateAppointmentMutation.isLoading ? (
            "Adding todo..." // TODO: add spinner
          ) : (
            <>
              {CreateAppointmentMutation.isError ? (
                <div>
                  An error occurred: {CreateAppointmentMutation.error.message}
                </div>
              ) : null}

              {CreateAppointmentMutation.isSuccess ? (
                <SuccessfulAppointment />
              ) : (
                <button
                  onClick={handleSubmit}
                  type='submit'
                  className='button animate-bounce mt-10 w-full h-12 bg-green-600 rounded-lg cursor-pointer select-none active:border-b-[0px] 
            transition-all duration-1000 [box-shadow:0_5px_0_0_green] border-b-[1px] border-green-400'>
                  <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>
                    קבע תור
                  </span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Complete;
