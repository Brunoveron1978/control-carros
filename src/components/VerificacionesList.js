import React from 'react';

const VerificacionesList = ({ vehiculo }) => {
  return (
    <div className="mt-4">
      <h4 className="font-medium text-[#2a9d8f] mb-2">Historial de verificaciones</h4>
      
      {vehiculo.verificaciones.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay verificaciones registradas</p>
      ) : (
        <div className="space-y-3">
          {vehiculo.verificaciones.map((verificacion, index) => (
            <div key={index} className={`p-3 rounded-lg border ${
              verificacion.aprobado 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{verificacion.fecha}</p>
                  <p className="text-sm text-[#2a9d8f]">
                    {verificacion.responsable} - {verificacion.turno}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  verificacion.aprobado 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {verificacion.aprobado ? 'Aprobado' : 'Desaprobado'}
                </span>
              </div>
              
              {!verificacion.aprobado && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-red-700 mb-1">Motivos:</p>
                  {verificacion.respuestas
                    .filter(respuesta => !respuesta.valor)
                    .map((respuesta, i) => (
                      <div key={i} className="flex items-start text-sm mb-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-red-500 mt-1.5 mr-2"></span>
                        <div>
                          <p>{respuesta.item}</p>
                          {respuesta.observaciones && (
                            <p className="text-gray-500 text-xs">({respuesta.observaciones})</p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerificacionesList;