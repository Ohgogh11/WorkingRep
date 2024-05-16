import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import IsSignedIn from "../IsSignedIn";
import SignOut from "../SignOut";
import AdminComponent from "../AdminComponent";
import BarberCreationLink from "../TokenLinks/BarberCreationLink";
import AppointmentConfirmationLink from "../TokenLinks/AppointmentConfirmationLink";

function NavLinks({ className = "" }) {
  return (
    <div className={className}>
      <nav className=' text-lg'>
        <ul className='flex gap-5 content-center h-full items-center'>
          <li className=''>
            <Link to='/ScheduleAppointments' className=''>
              קביעת תור
            </Link>
          </li>
          <li className=''>
            <Link to='/Store' className=''>
              חנות
            </Link>
          </li>
          <IsSignedIn
            logged={
              <li className=''>
                <AppointmentConfirmationLink className=''>
                  התורים שלי
                </AppointmentConfirmationLink>
              </li>
            }
          />

          <AdminComponent>
            <li className=''>
              <BarberCreationLink className=''>
                הוספת ספר חדש
              </BarberCreationLink>
            </li>
            <li className=''>
              <Link to='/admin/barberLink' className=''>
                קישור לספר חדש
              </Link>
            </li>
          </AdminComponent>
        </ul>
      </nav>
      <div className='ml-4 flex justify-between'>
        <div className=' flex border rounded-md mr-4 my-1 items-center '>
          <IoIosSearch size={28} className='px-1 cursor-pointer' />
          <input
            type='search'
            name='search_bar'
            id=''
            placeholder='Search or jump to'
            className='text-center bg-transparent focus:outline-none w-64'
          />
        </div>
        <IsSignedIn
          logged={
            <SignOut
              to='/Login'
              className='border rounded-md border-white px-2 py-1 flex items-center'>
              התנתקות
            </SignOut>
          }
          notLogged={
            <>
              <Link to='/Login' className='mr-4 flex items-center'>
                התחברות
              </Link>
              <Link
                to='/Signup'
                className='border rounded-md border-white px-2 py-1 flex items-center'>
                הצטרפות
              </Link>
            </>
          }
        />
      </div>
    </div>
  );
}

export default NavLinks;
