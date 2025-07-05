import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserConsulta from '../components/UserConsulta';

const UserPortal = ({ user }) => {
  const [userInvoices, setUserInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalDebt, setTotalDebt] = useState(0);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/usuarios/${user.cedula}/facturas`);
      setUserInvoices(response.data);
      
      // Calcular deuda total
      const debt = response.data
        .filter(invoice => invoice.status === 'pendiente')
        .reduce((total, invoice) => total + parseFloat(invoice.total), 0);
      setTotalDebt(debt);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Bienvenido, {user.name}</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6>Información Personal</h6>
                  <p><strong>Cédula:</strong> {user.cedula}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Teléfono:</strong> {user.telefono}</p>
                </div>
                <div className="col-md-6">
                  <h6>Estado de Cuenta</h6>
                  <p><strong>Deuda Total:</strong> 
                    <span className={`ms-2 ${totalDebt > 0 ? 'text-danger' : 'text-success'}`}>
                      ${totalDebt.toFixed(2)}
                    </span>
                  </p>
                  <p><strong>Facturas Pendientes:</strong> 
                    <span className="ms-2 badge bg-warning">
                      {userInvoices.filter(inv => inv.status === 'pendiente').length}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <UserConsulta cedula={user.cedula} />
        </div>
      </div>
    </div>
  );
};

export default UserPortal;