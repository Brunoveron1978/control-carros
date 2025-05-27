import React, { useState, useEffect } from 'react';
import { cajonesCarroParo, turnosControl, itemsCarrosPisoUTH } from '../mock/controlInterno';
import { vehiculosData } from '../mock/vehiculos'; // Importar vehiculosData para obtener nombres

const ControlInternoForm = ({ onSave }) => {
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [responsable, setResponsable] = useState('');
  const [turno, setTurno] = useState('');
  const [carroSeleccionado, setCarroSeleccionado] = useState(''); // Estado para seleccionar carro
  
  // Determinar qué lista de ítems usar según el carro seleccionado
  const getItemsForCarro = (carroNombre) => {
    const carrosPisoUTH = ["5to Piso", "4to Piso", "3er Piso", "UTH"];
    if (carrosPisoUTH.includes(carroNombre)) {
      // Para carros de piso/UTH, usar la lista simplificada
      return [{
        nombre: "Control Exterior",
        color: "bg-blue-100",
        items: itemsCarrosPisoUTH.map(item => ({
          ...item,
          estado: null,
          cantidadFaltante: 0,
          observaciones: ''
        }))
      }];
    } else {
      // Para otros carros (UTIQ, UTI1, UTI2, Guardia), usar la lista completa por cajones
      return cajonesCarroParo.map(cajon => ({
        nombre: cajon.nombre,
        color: cajon.color,
        items: Array.isArray(cajon.items) ? cajon.items.map(item => ({
          ...item,
          estado: null,
          cantidadFaltante: 0,
          observaciones: ''
        })) : []
      }));
    }
  };

  // Inicializar verificaciones basado en el carro seleccionado
  const [verificaciones, setVerificaciones] = useState([]);

  // Efecto para actualizar verificaciones cuando cambia el carro seleccionado
  useEffect(() => {
    if (carroSeleccionado) {
      setVerificaciones(getItemsForCarro(carroSeleccionado));
    } else {
      setVerificaciones([]); // Limpiar si no hay carro seleccionado
    }
  }, [carroSeleccionado]);


  const handleCantidadChange = (cajonIndex, itemIndex, value) => {
    const newVerificaciones = [...verificaciones];
    if (newVerificaciones[cajonIndex] && newVerificaciones[cajonIndex].items[itemIndex]) {
      newVerificaciones[cajonIndex].items[itemIndex].cantidad = value;
      setVerificaciones(newVerificaciones);
    }
  };

  const handleEstadoChange = (cajonIndex, itemIndex, value) => {
    const newVerificaciones = [...verificaciones];
     if (newVerificaciones[cajonIndex] && newVerificaciones[cajonIndex].items[itemIndex]) {
      newVerificaciones[cajonIndex].items[itemIndex].estado = value;
      // Reset cantidad faltante if marked as Completo
      if (value === true) {
        newVerificaciones[cajonIndex].items[itemIndex].cantidadFaltante = 0;
      }
      setVerificaciones(newVerificaciones);
    }
  };

  const handleCantidadFaltanteChange = (cajonIndex, itemIndex, value) => {
    const newVerificaciones = [...verificaciones];
    if (newVerificaciones[cajonIndex] && newVerificaciones[cajonIndex].items[itemIndex]) {
      newVerificaciones[cajonIndex].items[itemIndex].cantidadFaltante = value;
      // Automatically mark as Falta if quantity > 0
      if (value > 0) {
         newVerificaciones[cajonIndex].items[itemIndex].estado = false;
      } else if (value === 0 && newVerificaciones[cajonIndex].items[itemIndex].estado === false) {
         // Optionally reset to null or true if quantity is 0 and was marked as Falta
         // For now, let's keep it as is unless explicitly marked Completo
      }
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
    if (!carroSeleccionado) {
      alert("Por favor, selecciona un carro.");
      return;
    }
    const nuevoControl = {
      carro: carroSeleccionado, // Guardar el carro al que pertenece el control
      fecha,
      responsable,
      turno,
      verificaciones
    };
    onSave(nuevoControl);
    // Reset form
    setFecha(new Date().toISOString().split('T')[0]);
    setResponsable('');
    setTurno('');
    setCarroSeleccionado('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-[#2a9d8f] mb-4">Control Interno Semanal</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
           <div>
            <label className="block text-gray-700 mb-1">Carro:</label>
            <select
              value={carroSeleccionado}
              onChange={(e) => setCarroSeleccionado(e.target.value)}
              className="w-full px-3 py-2 border border-[#2a9d8f]/50 rounded-md"
              required
            >
              <option value="">Seleccionar carro</option>
              {Array.isArray(vehiculosData) && vehiculosData.map((vehiculo, index) => (
                <option key={index} value={vehiculo.nombre}>{vehiculo.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Fecha:</label>
            <input
              type="date"
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
        </div>

        {carroSeleccionado && ( // Mostrar la lista de verificación solo si se seleccionó un carro
          <div className="space-y-4">
            {Array.isArray(verificaciones) && verificaciones.map((cajon, cajonIndex) => (
              <div key={cajonIndex} className={`${cajon.color} rounded-lg p-4 border border-gray-300`}>
                <h4 className="font-bold text-lg mb-3">{cajon.nombre}</h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-400">
                        <th className="text-left py-2">Insumo</th>
                        <th className="px-1 text-center">Cant. Inicial</th>
                        <th className="px-1 text-center">Comp.</th>
                        <th className="px-1 text-center">Falta</th>
                         <th className="px-1 text-center">Cant. Falta</th> {/* Nueva columna */}
                        <th className="px-1 text-center">Obs.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(cajon.items) && cajon.items.map((item, itemIndex) => (
                        <tr key={itemIndex} className="border-b border-gray-200">
                          <td className="py-2">{item.nombre}</td>
                          <td className="px-1 text-center">{item.cantidad}</td>
                          <td className="px-1 text-center">
                            <input
                              type="radio"
                              name={`estado-${cajonIndex}-${itemIndex}`}
                              checked={item.estado === true}
                              onChange={() => handleEstadoChange(cajonIndex, itemIndex, true)}
                              className="h-4 w-4"
                            />
                          </td>
                          <td className="px-1 text-center">
                            <input
                              type="radio"
                              name={`estado-${cajonIndex}-${itemIndex}`}
                              checked={item.estado === false}
                              onChange={() => handleEstadoChange(cajonIndex, itemIndex, false)}
                              className="h-4 w-4"
                            />
                          </td>
                           <td className="px-1 text-center"> {/* Campo Cant. Falta */}
                             {item.estado === false && ( // Solo mostrar si está marcado como Falta
                               <input
                                 type="number"
                                 min="0"
                                 value={item.cantidadFaltante}
                                 onChange={(e) => handleCantidadFaltanteChange(cajonIndex, itemIndex, parseInt(e.target.value) || 0)}
                                 className="w-12 px-1 py-1 border border-gray-300 rounded text-center"
                               />
                             )}
                           </td>
                          <td className="px-1">
                            <input
                              type="text"
                              value={item.observaciones}
                              onChange={(e) => handleObservacionChange(cajonIndex, itemIndex, e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
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
        )}


        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-[#2a9d8f] text-white rounded-md hover:bg-[#22867a]"
          >
            Guardar Control
          </button>
        </div>
      </form>
    </div>
  );
};

export default ControlInternoForm;

// DONE