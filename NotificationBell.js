import React, { useState } from 'react';

const NotificationBell = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasNewNotifications = notifications.length > 0;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-[#22867a] focus:outline-none focus:ring-2 focus:ring-white"
      >
        {/* Icono de campana SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {hasNewNotifications && (
          <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-[#2a9d8f] bg-red-500"></span>
        )}
      </button>

      {isOpen && hasNewNotifications && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10 border border-[#2a9d8f]/30">
          <div className="block px-4 py-2 text-sm text-gray-700 font-bold border-b border-gray-200">
            Notificaciones
          </div>
          {notifications.map((notif, index) => (
            <div key={index} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
              <p className="font-medium">{notif.carro}: {notif.tipo}</p>
              <p className="text-xs text-gray-600">{notif.mensaje}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;