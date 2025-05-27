export const exportVerificacionesToCSV = (vehiculos) => {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Carro,Fecha,Responsable,Turno,Estado,Item,Valor,Observaciones\n";

  vehiculos.forEach(vehiculo => {
    vehiculo.verificaciones.forEach(verificacion => {
      verificacion.respuestas.forEach(respuesta => {
        const row = [
          `"${vehiculo.nombre}"`,
          `"${verificacion.fecha}"`,
          `"${verificacion.responsable}"`,
          `"${verificacion.turno}"`,
          `"${verificacion.aprobado ? 'Aprobado' : 'Desaprobado'}"`,
          `"${respuesta.item}"`,
          `"${respuesta.valor ? 'Sí' : 'No'}"`,
          `"${respuesta.observaciones.replace(/"/g, '""')}"` // Escape double quotes
        ].join(",");
        csvContent += row + "\n";
      });
    });
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "historial_verificaciones.csv");
  document.body.appendChild(link); // Required for FF
  link.click();
  document.body.removeChild(link);
};