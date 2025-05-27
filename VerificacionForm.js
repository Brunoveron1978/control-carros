import React, { useState, useEffect } from 'react';
import { checklistItemsCompleto, checklistItemsSimplificado, turnos } from '../mock/vehiculos';

const VerificacionForm = ({ vehiculo, onSave, onCancel }) => {
  const [responsable, setResponsable] = useState('');
  const [turno, setTurno] = useState('');
  
  // Determinar qué lista de ítems usar según el carro
  const getChecklistItems = (carroNombre) => {
    const carrosPisoUTH = ["5to Piso", "4to Piso", "3er Piso", "UTH"];
    if (carrosPisoUTH.includes(carroNombre)) {
      return checklistItemsSimplificado;
    } else {
      return checklistItemsCompleto;
    }
  };

  const currentChecklistItems = getChecklistItems(vehiculo.nombre);

  const [respuestas, setRespuestas] = useState(
    currentChecklistItems.map(item => ({
      item: item,
      valor: item === "3 últimos N° precinto" ? '' : null, // Campo de texto para precinto
      observaciones: ''
    }))
  );

  // Reset form state when vehiculo changes
  useEffect(() => {
     const newChecklistItems = getChecklistItems(vehiculo.nombre);
     setRespuestas(
       newChecklistItems.map(item => ({
         item: item,
         valor: item === "3 últimos N° precinto" ? '' : null,
         observaciones: ''
       }))
     );
  }, [vehiculo.nombre]);


  const handleChange = (index, value) => {
    const newRespuestas = [...respuestas];
    newRespuestas[index].valor = value;
    setRespuestas(newRespuestas);
  };

  const handleObservacionChange = (index, value) => {
    const newRespuestas = [...respuestas];
    newRespuestas[index].observaciones = value;
    setRespuestas(newRespuestas);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaVerificacion = {
      fecha: new Date().toISOString().split('T')[0],
      responsable,
      turno,
      respuestas: respuestas.map(r => ({
        item: r.item,
        valor: r.valor,
        observaciones: r.observaciones
      })),
      // La aprobación ahora depende de que todos los ítems Sí/No sean Sí
      // y que el campo de texto del precinto no esté vacío si aplica
      aprobado: respuestas.every(r => {
        if (r.item === "3 últimos N° precinto") {
          return r.valor !== ''; // Campo de texto no vacío
        } else {
          return r.valor === true; // Campo Sí/No es Sí
        }
      })
    };
    onSave(nuevaVerificacion);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-[#2a9d8f]">
        <h3 className="text-xl font-bold text-[#2a9d8f] mb-4">Verificación: {vehiculo.nombre}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Responsable:</label>
              <input
                type="text"
                value={responsable}
                onChange={(e) => setResponsable(e.target.value)}
                className="w-full px-3 py-2 border border-[#2a9d8f]/50 rounded-md focus:ring-2 focus:ring-[#2a9d8f]"
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
                {Array.isArray(turnos) && turnos.map((turno, index) => (
                  <option key={index} value={turno}>{turno}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {respuestas.map((respuesta, index) => (
              <div key={index} className="border-b border-[#2a9d8f]/20 pb-4">
                <p className="font-medium text-[#2a9d8f] mb-2">{respuesta.item}</p>
                
                {respuesta.item === "3 últimos N° precinto" ? (
                   <input
                     type="text"
                     value={respuesta.valor}
                     onChange={(e) => handleChange(index, e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                     placeholder="Ingresar números de precinto"
                     required // Hacer este campo requerido
                   />
                ) : (
                  <div className="flex space-x-4 mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`item-${index}`}
                        checked={respuesta.valor === true}
                        onChange={() => handleChange(index, true)}
                        className="h-4 w-4 text-[#2a9d8f] focus:ring-[#2a9d8f]"
                      />
                      <span className="ml-2">Sí</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`item-${index}`}
                        checked={respuesta.valor === false}
                        onChange={() => handleChange(index, false)}
                        className="h-4 w-4 text-[#2a9d8f] focus:ring-[#2a9d8f]"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                )}
                
                <textarea
                  placeholder="Observaciones..."
                  value={respuesta.observaciones}
                  onChange={(e) => handleObservacionChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  rows="2"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-[#2a9d8f] text-[#2a9d8f] rounded-md hover:bg-[#2a9d8f]/10"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2a9d8f] text-white rounded-md hover:bg-[#22867a]"
            >
              Guardar Verificación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificacionForm;

// DONE