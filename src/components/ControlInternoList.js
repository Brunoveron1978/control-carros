import React from 'react';

const ControlInternoList = ({ controles }) => {
  // Asegurarse de que 'controles' sea un array antes de mapear
  if (!Array.isArray(controles)) {
    return <p className="text-gray-500">Error al cargar los controles.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-[#2a9d8f] mb-4">Historial de Controles</h3>
      
      {controles.length === 0 ? (
        <p className="text-gray-500">No hay controles registrados</p>
      ) : (
        <div className="space-y-4">
          {controles.map((control, index) => (
            <div key={index} className="border border-[#2a9d8f]/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <p className="font-medium">{control.fecha}</p>
                <p className="text-sm text-[#2a9d8f]">
                  {control.responsable} - {control.turno}
                </p>
              </div>
              
              <div className="space-y-4">
                {/* Asegurarse de que 'control.verificaciones' sea un array */}
                {Array.isArray(control.verificaciones) && control.verificaciones.map((cajon, cajonIndex) => (
                  <div key={cajonIndex} className={`${cajon.color} rounded-lg p-4 border border-gray-300`}>
                    <h4 className="font-bold text-lg mb-3">{cajon.nombre}</h4>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-400">
                            <th className="text-left py-2">Insumo</th>
                            <th className="px-2">Cant.</th>
                            <th className="px-2">Estado</th>
                            <th className="px-2">Obs.</th>
                          </tr>
                        </thead>
                        <tbody>
                           {/* Asegurarse de que 'cajon.items' sea un array */}
                          {Array.isArray(cajon.items) && cajon.items.map((item, itemIndex) => (
                            <tr key={itemIndex} className="border-b border-gray-200">
                              <td className="py-2">{item.nombre}</td>
                              <td className="px-2 text-center">{item.cantidad}</td>
                              <td className="px-2 text-center">
                                {item.estado === true ? (
                                  <span className="text-green-600">✓</span>
                                ) : (
                                  <span className="text-red-600">✗</span>
                                )}
                              </td>
                              <td className="px-2 text-xs text-gray-500">{item.observaciones}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ControlInternoList;