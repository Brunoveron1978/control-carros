import React from 'react';

const StatusSummary = ({ vehiculos }) => {
  const totalListos = vehiculos.filter(v => !v.necesitaMantenimiento).length;
  const totalMantenimiento = vehiculos.filter(v => v.necesitaMantenimiento).length;

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 className="font-medium text-gray-700 mb-3">Resumen de Estado</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-green-800 font-medium">Listos para uso</p>
          <p className="text-2xl font-bold">{totalListos}</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="text-yellow-800 font-medium">Requieren mantenimiento</p>
          <p className="text-2xl font-bold">{totalMantenimiento}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusSummary;