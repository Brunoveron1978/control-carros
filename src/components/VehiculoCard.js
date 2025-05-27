import React, { useState } from 'react';
import VerificacionForm from './VerificacionForm';
import VerificacionesList from './VerificacionesList';

const VehiculoCard = ({ vehiculo, onVerificacionSubmit, showVerificaciones }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-[#2a9d8f]/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-[#2a9d8f]">{vehiculo.nombre}</h3>
          <span className="text-gray-600 text-xs">
            Última verificación: {vehiculo.ultimaRevision || 'N/A'}
          </span>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="w-full py-2 bg-[#2a9d8f] text-white rounded-md hover:bg-[#22867a] transition-colors"
        >
          Realizar Verificación
        </button>

        {showVerificaciones && <VerificacionesList vehiculo={vehiculo} />}
      </div>

      {showForm && (
        <VerificacionForm
          vehiculo={vehiculo}
          onSave={(verificacion) => {
            onVerificacionSubmit(vehiculo.id, verificacion);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </>
  );
};

export default VehiculoCard;