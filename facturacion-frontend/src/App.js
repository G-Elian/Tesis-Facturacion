// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CrearUsuarioForm from './components/CrearUsuarioForm';
import FacturaForm from './components/FacturaForm';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h2>Sistema de Facturación de Agua</h2>
        <nav className="mb-3">
          <Link to="/" className="btn btn-primary me-2">Inicio</Link>
          <Link to="/crear-usuario" className="btn btn-success me-2">Crear Usuario</Link>
          <Link to="/crear-factura" className="btn btn-warning">Crear Factura</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h4>Bienvenido al sistema</h4>} />
          <Route path="/crear-usuario" element={<CrearUsuarioForm />} />
          <Route path="/crear-factura" element={<FacturaForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
