import React, { useEffect } from "react";
import Icon from "../assets/AlphaMenLogo.jpeg";
import Tiktok from "../assets/tiktok_logo.png";
import Instagram from "../assets/instagram_logo.png";
import WhatsApp from "../assets/whatsapp_logo.png";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import SignOut from "../Components/SignOut";
import IsSignedIn from "../Components/IsSignedIn";
import AppointmentConfirmationLink from "../Components/TokenLinks/AppointmentConfirmationLink";

function Home() {
  const authUser = useAuthUser();
  const firstName = authUser?.firstName;

  return (
    <div className='bg-white flex justify-center overflow-x-hidden'>
      <div className='flex flex-col pt-6 items-center mss:w-full p-3 overflow-y-auto'>
        <img src={Icon} alt='icon' className='rounded-full size-32 mb-7' />
        <div className='font-bold pb-3 '>AlphaMen Barbershop</div>
        <div>AlphaMen Barbershopברוכים הבאים ל</div>
        <div id='socials' className='flex gap-2 py-3'>
          <a
            href='https://www.tiktok.com/'
            target='_blank'
            rel='noopener noreferrer'>
            <img
              src={Tiktok}
              alt='TikTok'
              style={{ width: "35px", marginRight: "10px" }}
            />
          </a>
          <a
            href='https://www.instagram.com/'
            target='_blank'
            rel='noopener noreferrer'>
            <img
              src={Instagram}
              alt='Instagram'
              style={{ width: "35px", marginRight: "10px" }}
            />
          </a>
          <a
            href='https://www.waze.com/'
            target='_blank'
            rel='noopener noreferrer'
            style={{ width: "35px", marginRight: "10px" }}>
            <svg id='Layer_1' x='0px' y='0px' viewBox='0 0 1024 1024'>
              <circle
                id='XMLID_1_'
                fill='#33CCFF'
                cx='512'
                cy='512'
                r='512'></circle>
              <g>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#FFFFFF'
                  d='M540.7,258.5c-70.1,0-135.4,31.5-179.5,87.4 c-30.7,39.4-47.2,88.2-47.2,137.8v41.7c0,18.1-7.1,35.4-18.9,48c-9.4,9.4-21.3,16.5-33.9,19.7c4.7,11.8,15.7,29.9,35.4,49.6 c16.5,17.3,36.2,31.5,57.5,41.7v-0.8c13.4-20.5,35.4-32.3,59.8-32.3c4.7,0,8.7,0.8,13.4,1.6c28.3,5.5,50.4,27.6,55.9,55.1h58.3 c60.6,0,118.1-25.2,159.8-66.1c64.6-64.6,84.2-161.4,48.8-244.8C714.7,312.8,632.9,258.5,540.7,258.5z'></path>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#191938'
                  d='M540.7,230.2c-77.9,0-151.1,34.6-200.7,96.8 c-35.4,44.9-54.3,100-54.3,157.4v40.9c0,21.3-15,40.9-44.1,42.5c-7.1,0-12.6,5.5-13.4,12.6c-0.8,18.9,19.7,54.3,48,82.7 c19.7,19.7,42.5,35.4,66.9,48c-7.9,43.3,26,82.7,70.1,82.7c0,0,0,0,0.8,0c33.9,0,62.2-23.6,69.3-55.9h59 c6.3,32.3,34.6,55.9,69.3,55.9c7.9,0,16.5-1.6,24.4-3.9c19.7-6.3,34.6-21.3,41.7-40.9c6.3-18.1,5.5-36.2,0-51.2 c15.7-10.2,29.9-21.3,43.3-34.6c48-47.2,74.8-111.8,74.8-178.7c0-67.7-26.8-130.7-74.8-178.7C673,256.1,608.4,230.2,540.7,230.2z M540.7,258.5c91.3,0,174,55.1,209.4,139.3c35.4,84.2,15.7,181.1-48.8,244.8c-41.7,41.7-99.2,66.1-159.8,66.1h-58.3 c-5.5-28.3-27.6-49.6-55.9-55.1c-4.7-0.8-8.7-1.6-13.4-1.6c-23.6,0-46.4,11.8-59.8,32.3v0.8c-21.3-11-40.1-25.2-57.5-41.7 c-19.7-19.7-30.7-38.6-35.4-49.6c13.4-3.1,24.4-10.2,33.9-19.7c11.8-13.4,18.9-29.9,18.9-48v-41.7c0-49.6,16.5-98.4,47.2-137.8 C405.3,289.2,470.7,258.5,540.7,258.5z'></path>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#191938'
                  d='M654.1,398.6c-15.7,0-28.3,12.6-28.3,28.3 c0,15.7,12.6,28.3,28.3,28.3c15.7,0,28.3-12.6,28.3-28.3C682.4,411.2,669.9,398.6,654.1,398.6z'></path>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#191938'
                  d='M484.1,398.6c-15.7,0-28.3,12.6-28.3,28.3 c0,15.7,12.6,28.3,28.3,28.3c15.7,0,28.3-12.6,28.3-28.3C512.4,411.2,499.8,398.6,484.1,398.6z'></path>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#191938'
                  d='M479.3,511.2c-10.2,0-17.3,10.2-12.6,19.7 c18.9,39.4,58.3,64.6,102.3,64.6s83.4-25.2,102.3-64.6c3.9-9.4-2.4-19.7-12.6-19.7l0,0c-5.5,0-10.2,3.1-12.6,7.9 c-14.2,29.1-44.1,48-76.4,48c-33.1,0-63-18.9-76.4-48l0,0C490.4,514.4,485.6,511.2,479.3,511.2z'></path>{" "}
              </g>{" "}
            </svg>
          </a>
          <a
            href='https://web.whatsapp.com/'
            target='_blank'
            rel='noopener noreferrer'>
            <img src={WhatsApp} alt='WhatsApp' style={{ width: "35px" }} />
          </a>
        </div>
        <hr className='w-full border-t border-gray-300 my-4 max-w-lg' />
        <div id='Comment'>
          <div className='text-end text-sm border-2 border-blue-300 border-dashed rounded-md max-w-lg p-2'>
            <div className='font-bold'>:שימו לב</div>
            <div className='text-[13px]'>
              חברים יקרים , נא לשים לב לנוהל ביטולים : לקוח שלא יגיע לתור / יבטל
              בזמן ( 3 שעות לפניי) יחוייב על תור מלא . אבקש להגיע 5 דק׳ לפני
              התור . איחור של 10 דק ' ומעלה מבטל את התור אוטומטית
            </div>
          </div>
        </div>
        <hr className='w-full border-t border-gray-300 my-4 max-w-lg' />
        <IsSignedIn
          logged={<UserOptions firstName={firstName} />}
          notLogged={<NonUserOptions />}
        />
        <hr className='w-full border-t border-gray-300 my-4 max-w-lg' />
        <div id='contacts'></div>
        <div className='w-full max-w-2xl flex flex-row-reverse justify-around text-end text-[13px]'>
          <a href='tel:050469922' className='flex items-center gap-2'>
            <div className='flex flex-col'>
              <h2 className='font-bold'>דברו איתנו</h2>
              <h3 className=''>050469922</h3>
            </div>
            <div className='text-xl'>
              <ion-icon name='call-outline'></ion-icon>
            </div>
          </a>
          <div className='flex items-center gap-2'>
            <div className='flex flex-col '>
              <h2 className='font-bold'>בקרו אותנו</h2>
              <h3 className=''>הרצל 42 , גן יבנה</h3>
            </div>
            <div className='text-xl'>
              <ion-icon name='location-outline'></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

function NonUserOptions() {
  return (
    <div className='flex gap-3 py-2 font-semibold'>
      <a href='/SignUp' className='border-b border-black'>
        הצטרפות
      </a>
      |
      <a href='/Login' className='border-b border-black'>
        התחברות
      </a>
    </div>
  );
}

function UserOptions({ firstName }) {
  return (
    <div className='text-sm flex flex-col text-end'>
      <div className='mb-3 md:mb-5 flex flex-row-reverse gap-1'>
        <div className='ml-1.5 md:ml-0 md:mb-1 flex gap-1'>
          <span> ?יש לך תור קיים</span>
          <span className='font-semibold'>,{firstName}</span>
          <span>היי</span>
        </div>
        <div className='flex text-sm'>
          <div className='flex flex-row-reverse items-center'>
            <AppointmentConfirmationLink className='border-b border-gray-800 hover:opacity-80 cursor-pointer mb-1'>
              לחץ לצפיה בתורים שלך
            </AppointmentConfirmationLink>
            <svg
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 24 24'
              height='16'
              width='16'
              xmlns='http://www.w3.org/2000/svg'>
              <g>
                <path fill='none' d='M0 0h24v24H0z'></path>
                <path d='M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z'></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className=' flex  flex-row-reverse'>
        <span className='ml-1'>?{firstName} לא</span>
        <SignOut
          className='border-b border-gray-800 cursor-pointer hover:opacity-80'
          to='/login'>
          התנתקות
        </SignOut>
      </div>
    </div>
  );
}
