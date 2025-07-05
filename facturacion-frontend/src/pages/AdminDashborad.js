import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import CrearUsuarioForm from '../components/CrearUsuarioForm';
import FacturaForm from '../components/FacturaForm';
import BuscarUsuario from '../components/BuscarUsuario';
import EstadisticasAdmin from '../components/EstadisticasAdmin';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInvoices: 0,
    pendingPayments: 0,
    monthlyRevenue: 0
  });
  const location = useLocation();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">Panel de Administración</h6>
            </div>
            <div className="list-group list-group-flush">
              <Link 
                to="/admin" 
                className={`list-group-item list-group-item-action ${isActive('/admin') ? 'active' : ''}`}
              >
                📊 Dashboard
              </Link>
              <Link 
                to="/admin/usuarios" 
                className={`list-group-item list-group-item-action ${isActive('/admin/usuarios') ? 'active' : ''}`}
              >
                👥 Usuarios
              </Link>
              <Link 
                to="/admin/crear-usuario" 
                className={`list-group-item list-group-item-action ${isActive('/admin/crear-usuario') ? 'active' : ''}`}
              >
                ➕ Crear Usuario
              </Link>
              <Link 
                to="/admin/crear-factura" 
                className={`list-group-item list-group-item-action ${isActive('/admin/crear-factura') ? 'active' : ''}`}
              >
                📄 Crear Factura
              </Link>
              <Link 
                to="/admin/estadisticas" 
                className={`list-group-item list-group-item-action ${isActive('/admin/estadisticas') ? 'active' : ''}`}
              >
                📈 Estadísticas
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10">
          <Routes>
            <Route path="/" element={<AdminHome stats={stats} />} />
            <Route path="/usuarios" element={<BuscarUsuario />} />
            <Route path="/crear-usuario" element={<CrearUsuarioForm />} />
            <Route path="/crear-factura" element={<FacturaForm />} />
            <Route path="/estadisticas" element={<EstadisticasAdmin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AdminHome = ({ stats }) => {
  return (
    <div>
      <h2 className="mb-4">Dashboard Administrativo</h2>
      
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3>{stats.totalUsers}</h3>
              <p>Usuarios Registrados</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3>{stats.totalInvoices}</h3>
              <p>Facturas Emitidas</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3>{stats.pendingPayments}</h3>
              <p>Pagos Pendientes</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h3>${stats.monthlyRevenue}</h3>
              <p>Ingresos del Mes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Acciones Rápidas</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to="/admin/crear-usuario" className="btn btn-primary">
                  Crear Nuevo Usuario
                </Link>
                <Link to="/admin/crear-factura" className="btn btn-success">
                  Generar Factura
                </Link>
                <Link to="/admin/usuarios" className="btn btn-info">
                  Buscar Usuario
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Alertas del Sistema</h5>
            </div>
            <div className="card-body">
              <div className="alert alert-warning">
                <small>⚠️ {stats.pendingPayments} facturas pendientes de pago</small>
              </div>
              <div className="alert alert-info">
                <small>ℹ️ Sistema funcionando correctamente</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
