import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EmployeesContext } from '../context/EmployeesContext';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function EmployeePage() {
  const { employees, favorites, toggleFavorite } = useContext(EmployeesContext);
  const { company, uuid } = useParams();
  const navigate = useNavigate();

  const [emp, setEmp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        let list = employees;

        if (!list || list.length === 0) {
          const res = await fetch(`https://randomuser.me/api/?results=10&seed=${company}`);
          const data = await res.json();
          list = data.results;
        }

        const found = list.find((item) => item.login.uuid === uuid);
        setEmp(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [company, uuid, employees]);

  if (loading) return <p>Loading...</p>;
  if (!emp) return <p>Employee not found</p>;

  const lat = parseFloat(emp.location.coordinates.latitude);
  const lng = parseFloat(emp.location.coordinates.longitude);

  return (
    <div className="employee-page">
      <h2>info about {emp.name.first} {emp.name.last}</h2>

      <MapContainer
        center={[lat, lng]}
        zoom={10}
        style={{ height: '300px', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]}>
          <Popup>{emp.location.city}, {emp.location.country}</Popup>
        </Marker>
      </MapContainer>

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
