// src/components/FacturaForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FacturaForm() {
  const [cedula, setCedula] = useState('');
  const [cliente, setCliente] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [mes, setMes] = useState('');
  const [mensaje, setMensaje] = useState('');

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const buscarCliente = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/usuarios/${cedula}`);
      if (res.data) {
        setCliente(res.data);
        setMensaje(`Cliente encontrado: ${res.data.nombre}`);
      } else {
        setCliente(null);
        setMensaje('Cliente no encontrado');
      }
    } catch (err) {
      console.error(err);
      setMensaje('Error al buscar cliente');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cliente) return setMensaje('Debes buscar y seleccionar un cliente válido.');
    if (!monto || !mes) return setMensaje('Debes ingresar el monto y seleccionar un mes.');

    try {
      const res = await axios.post('http://localhost:3001/api/facturas', {
        cedula,
        descripcion: `${descripcion} (${mes})`,
        monto
      });
      setMensaje(`Factura registrada con ID: ${res.data.id}`);
      setDescripcion('');
      setMonto('');
      setMes('');
    } catch (err) {
      console.error(err);
      setMensaje('Error al registrar factura');
    }
  };

  return (
    <div className="card p-4">
      <h4>Registrar Factura</h4>
      <div className="mb-3">
        <label className="form-label">Cédula del cliente:</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
          <button className="btn btn-outline-secondary" onClick={buscarCliente}>
            Buscar
          </button>
        </div>
      </div>

      {cliente && (
        <div className="alert alert-success">
          Cliente seleccionado: <strong>{cliente.nombre}</strong>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <input
            type="text"
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Monto:</label>
          <input
            type="number"
            className="form-control"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mes:</label>
          <select
            className="form-select"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
          >
            <option value="">Selecciona un mes</option>
            {meses.map((m, index) => (
              <option key={index} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          Registrar Factura
        </button>
      </form>

      {mensaje && <div className="mt-3 alert alert-info">{mensaje}</div>}
    </div>
  );
}

export default FacturaForm;
