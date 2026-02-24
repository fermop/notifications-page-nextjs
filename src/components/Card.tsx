'use client';
import { useState } from "react";
import { data } from "@/utils/data";

export default function Card() {
  const [ notificationsData, setNotificationsData ] = useState(data.notifications);

  const handleMarkAllAsRead = () => {
    data.numberOfNotificationsNotRead = 0
    const updatedNotifications = notificationsData.map(notification => ({
      ...notification,
      isRead: true
    }));

    setNotificationsData(updatedNotifications);
  };

  const handleMarkAsRead = (index: number) => {
    if (!notificationsData[index].isRead) {
      data.numberOfNotificationsNotRead -= 1;
    }
    const updatedNotifications = [...notificationsData];
    updatedNotifications[index] = { ...updatedNotifications[index], isRead: true };
    setNotificationsData(updatedNotifications);
  };

  return (
    <div className='flex flex-col justify-between gap-8 bg-white rounded-xl shadow-md p-3 md:px-8 md:pt-8 max-w-183 w-full md:min-h-210'>
      <header className="flex justify-between">
        <h2 className="text-neutral-navy-950 font-bold text-lg">Notifications <span className="bg-primary-blue-950 px-3 rounded text-white">{data.numberOfNotificationsNotRead}</span></h2>
        
        <button
          onClick={handleMarkAllAsRead}
          disabled={data.numberOfNotificationsNotRead === 0}
          className={`text-neutral-gray-500 ${data.numberOfNotificationsNotRead === 0 ? 'opacity-50' : 'hover:text-primary-blue-950 cursor-pointer duration-300'} font-medium`}>
            Mark all as read
        </button>
      </header>

      <ul className="space-y-2">
        {notificationsData.map((notification, index) => (
          <li key={index} onClick={() => handleMarkAsRead(index)} className={`flex ${notification.isRead ? '' : 'bg-neutral-blue-100'} items-start gap-4 p-4 rounded-lg cursor-pointer`}>
            <img src={`${notification.userImg}`} alt={`Avatar ${index + 1}`} className="w-10 h-10 rounded-full" />

            <div className={`${notification.type === 'commented' ? 'w-full flex justify-between gap-4' : ''}`}>
              <div>
                <p className="w-full text-neutral-navy-950 text-sm md:text-base">
                  <span className="font-bold hover:text-primary-blue-950 cursor-pointer duration-300">{notification.userName} </span>{notification.typeDetails} {notification.type === 'privateMessage' ? '' : <span className="hover:text-primary-blue-950 font-medium duration-300"> {notification.content}</span>} {!notification.isRead && <span className="inline-block w-2 h-2 bg-primary-red-500 text-red rounded-full ml-1"></span>}
                </p>
                <p className="text-neutral-gray-500 text-xs mt-1">{notification.time}</p>
              </div>

              {notification.type === 'commented' && <img className="w-10 h-10 rounded hover:border hover:border-neutral-gray-500 duration-300" src={notification.url} alt="Commented image" />}

              {notification.type === 'privateMessage' && <p className="text-sm md:text-base text-neutral-gray-600 mt-2 p-3 md:p-5 bg-neutral-gray-100 hover:bg-neutral-blue-100 rounded border border-neutral-navy-100 duration-300">{notification.content}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
