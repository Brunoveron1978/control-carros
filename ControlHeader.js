import React from 'react';
import NotificationBell from './NotificationBell'; // Importar la campana

const ControlHeader = ({ notifications }) => {
  return (
    <header className="bg-[#2a9d8f] text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0fdGGHU3c6iCVp94hHM5LR1QUayJxrzbk73XZ" 
            alt="Logo" 
            className="h-12 w-12 object-cover rounded-full mr-3 border-2 border-white"
          />
          <div>
            <h1 className="text-xl font-bold">Control Carros de Paro IAF</h1>
            <p className="text-sm opacity-90">Sistema de gestión y verificación - Papel 0</p>
          </div>
        </div>
        <NotificationBell notifications={notifications} />
      </div>
    </header>
  );
};

export default ControlHeader;