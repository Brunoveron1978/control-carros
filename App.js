import React, { useState, useEffect } from 'react';
import { vehiculosData } from './mock/vehiculos';
import ControlHeader from './components/ControlHeader';
import VehiculoCard from './components/VehiculoCard';
import ControlInternoForm from './components/ControlInternoForm';
import ControlInternoList from './components/ControlInternoList';
import RegistroUrgenciaForm from './components/RegistroUrgenciaForm';
import { exportVerificacionesToCSV } from './utils/exportData';

const App = () => {
  // Estados
  const [vehiculos, setVehiculos] = useState(() => {
    const saved = localStorage.getItem('carrosParoIAF');
    return saved ? JSON.parse(saved) : vehiculosData;
  });

  const [controles, setControles] = useState(() => {
    const saved = localStorage.getItem('controlesIAF');
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  });

  const [registrosUrgencia, setRegistrosUrgencia] = useState(() => {
    const saved = localStorage.getItem('registrosUrgenciaIAF');
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  });

  const [notifications, setNotifications] = useState([]); // Estado para las notificaciones
  const [view, setView] = useState('carros');

  // Efectos para guardar en localStorage
  useEffect(() => {
    localStorage.setItem('carrosParoIAF', JSON.stringify(vehiculos));
  }, [vehiculos]);

  useEffect(() => {
    localStorage.setItem('controlesIAF', JSON.stringify(controles));
  }, [controles]);

  useEffect(() => {
    localStorage.setItem('registrosUrgenciaIAF', JSON.stringify(registrosUrgencia));
  }, [registrosUrgencia]);

  // Efecto para generar notificaciones
  useEffect(() => {
    const newNotifications = [];
    controles.forEach(control => {
      control.verificaciones.forEach(cajon => {
        cajon.items.forEach(item => {
          if (item.estado === false && item.cantidadFaltante > 0) {
            newNotifications.push({
              carro: control.carro,
              tipo: 'Faltante',
              mensaje: `${item.nombre}: Faltan ${item.cantidadFaltante} unidades.`,
              fecha: control.fecha
            });
          }
          // Aquí se podría agregar lógica para vencimientos si se implementan fechas de vencimiento
        });
      });
    });
    setNotifications(newNotifications);
  }, [controles]); // Depende de los controles para actualizar notificaciones

  // Handlers
  const handleVerificacionSubmit = (vehiculoId, nuevaVerificacion) => {
    setVehiculos(prev => 
      prev.map(v => v.id === vehiculoId ? { 
        ...v, 
        verificaciones: [nuevaVerificacion, ...v.verificaciones],
        ultimaRevision: nuevaVerificacion.fecha
      } : v)
    );
  };

  const handleControlSubmit = (nuevoControl) => {
    setControles(prev => [nuevoControl, ...prev]);
  };

  const handleRegistroUrgenciaSubmit = (nuevoRegistro) => {
    setRegistrosUrgencia(prev => [nuevoRegistro, ...prev]);
  };

  const handleExport = () => {
    exportVerificacionesToCSV(vehiculos);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ControlHeader notifications={notifications} /> {/* Pasar notificaciones al header */}
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => setView('carros')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              view === 'carros' ? 'bg-[#2a9d8f] text-white' : 'bg-white text-[#2a9d8f] border border-[#2a9d8f]'
            }`}
          >
            Carros de Paro
          </button>
          <button
            onClick={() => setView('verificaciones')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              view === 'verificaciones' ? 'bg-[#2a9d8f] text-white' : 'bg-white text-[#2a9d8f] border border-[#2a9d8f]'
            }`}
          >
            Verificaciones
          </button>
          <button
            onClick={() => setView('control-semanal')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              view === 'control-semanal' ? 'bg-[#2a9d8f] text-white' : 'bg-white text-[#2a9d8f] border border-[#2a9d8f]'
            }`}
          >
            Control Semanal
          </button>
          <button
            onClick={() => setView('historial-control')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              view === 'historial-control' ? 'bg-[#2a9d8f] text-white' : 'bg-white text-[#2a9d8f] border border-[#2a9d8f]'
            }`}
          >
            Historial Control
          </button>
          <button
            onClick={() => setView('registro-urgencia')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              view === 'registro-urgencia' ? 'bg-[#2a9d8f] text-white' : 'bg-white text-[#2a9d8f] border border-[#2a9d8f]'
            }`}
          >
            Registro Urgencia
          </button>
          {view === 'verificaciones' && (
            <button
              onClick={handleExport}
              className="ml-auto px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 whitespace-nowrap"
            >
              Exportar Historial
            </button>
          )}
        </div>

        {view === 'carros' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {vehiculos.map(vehiculo => (
              <VehiculoCard 
                key={vehiculo.id} 
                vehiculo={vehiculo} 
                onVerificacionSubmit={handleVerificacionSubmit}
                showVerificaciones={false}
              />
            ))}
          </div>
        )}

        {view === 'verificaciones' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {vehiculos.map(vehiculo => (
              <VehiculoCard 
                key={vehiculo.id} 
                vehiculo={vehiculo} 
                onVerificacionSubmit={handleVerificacionSubmit}
                showVerificaciones={true}
              />
            ))}
          </div>
        )}

        {view === 'control-semanal' && (
          <ControlInternoForm onSave={handleControlSubmit} />
        )}

        {view === 'historial-control' && (
          <ControlInternoList controles={controles} />
        )}

        {view === 'registro-urgencia' && (
          <RegistroUrgenciaForm onSave={handleRegistroUrgenciaSubmit} />
        )}
      </div>
    </div>
  );
};

export default App;

// DONE