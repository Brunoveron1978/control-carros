import React, { useState, useEffect } from 'react';
import { cajonesCarroParo, turnosControl } from '../mock/controlInterno';

const RegistroUrgenciaForm = ({ onSave }) => {
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [responsable, setResponsable] = useState('');
  const [turno, setTurno] = useState('');
  const [motivo, setMotivo] = useState('');
  
  // Inicializar verificaciones asegurando que cajonesCarroParo sea un array
  const [verificaciones, setVerificaciones] = useState(() => {
    if (!Array.isArray(cajonesCarroParo)) {
      console.error("cajonesCarroParo no es un array.");
      return [];
    }
    return cajonesCarroParo.map(cajon => ({
      nombre: cajon.nombre,
      color: cajon.color,
      items: Array.isArray(cajon.items) ? cajon.items.map(item => ({
        nombre: item.nombre,
        cantidad: item.cantidad,
        usado: 0, // Cantidad usada
        observaciones: ''
      })) : []
    }));
  });

  const handleCantidadUsadaChange = (cajonIndex, itemIndex, value) => {
    const newVerificaciones = [...verificaciones];
    if (newVerificaciones[cajonIndex] && newVerificaciones[cajonIndex].items[itemIndex]) {
      newVerificaciones[cajonIndex].items[itemIndex].usado = value;
      setVerificaciones(newVerificaciones);
    }
  };

  const handleObservacionChange = (cajonIndex, itemIndex, value) => {
    const newVerificaciones = [...verificaciones];
     if (newVerificaciones[cajonIndex] && newVerificaciones[cajonIndex].items[itemIndex]) {
      newVerificaciones[cajonIndex].items[itemIndex].observaciones = value;
      setVerificaciones(newVerificaciones);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoRegistro = {
      tipo: 'urgencia',
      fecha,
      responsable,
      turno,
      motivo,
      verificaciones
    };
    onSave(nuevoRegistro);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-[#2a9d8f] mb-4">Registro de Uso en Urgencia</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-1">Fecha:</label>
            <input
              type="datetime-local"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-3 py-2 border border-[#2a9d8f]/50 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Responsable:</label>
            <input
              type="text"
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              className="w-full px-3 py-2 border border-[#2a9d8f]/50 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Turno:</label>
            <select
              value={turno}
              onChange={(e) => setTurno(e.target.value)}
              className="w-full px-3 py-2 border border-[#2a9d8f]/50 rounded-md"
              required
            >
              <option value="">Seleccionar turno</option>
              {Array.isArray(turnosControl) && turnosControl.map((turno, index) => (
                <option key={index} value={turno}>{turno}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Motivo:</label>
            <input
              type="text"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full px-3 py-2 border border-[#2a9d8f]/50 rounded-md"
              required
              placeholder="Ej: Paro cardiorrespiratorio"
            />
          </div>
        </div>

        <div className="space-y-4">
          {Array.isArray(verificaciones) && verificaciones.map((cajon, cajonIndex) => (
            <div key={cajonIndex} className={`${cajon.color} rounded-lg p-4 border border-gray-300`}>
              <h4 className="font-bold text-lg mb-3">{cajon.nombre}</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-400">
                      <th className="text-left py-2">Insumo</th>
                      <th className="px-2">Cant. Inicial</th>
                      <th className="px-2">Usado</th>
                      <th className="px-2">Obs.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(cajon.items) && cajon.items.map((item, itemIndex) => (
                      <tr key={itemIndex} className="border-b border-gray-200">
                        <td className="py-2">{item.nombre}</td>
                        <td className="px-2 text-center">{item.cantidad}</td>
                        <td className="px-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max={item.cantidad}
                            value={item.usado}
                            onChange={(e) => handleCantidadUsadaChange(cajonIndex, itemIndex, parseInt(e.target.value) || 0)}
                            className="w-12 px-1 py-1 border border-[#2a9d8f]/50 rounded text-center"
                          />
                        </td>
                        <td className="px-2">
                          <input
                            type="text"
                            value={item.observaciones}
                            onChange={(e) => handleObservacionChange(cajonIndex, itemIndex, e.target.value)}
                            className="w-full px-2 py-1 border border-[#2a9d8f]/50 rounded text-xs"
                            placeholder="Observación"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-[#2a9d8f] text-white rounded-md hover:bg-[#22867a]"
          >
            Registrar Uso
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistroUrgenciaForm;

// DONE