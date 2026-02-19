import { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { EmployeesContext } from '../context/EmployeesContext';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function EmployeePage() {
  const { employees, monthEmployees, favorites, toggleFavorite } =
    useContext(EmployeesContext);

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const company = params.get('company');
  const index = Number(params.get('index'));

  const [emp, setEmp] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadEmployee = async () => {
      let list = company ? employees : monthEmployees;

      if (!list || list.length === 0) {
        const url = company
          ? `https://randomuser.me/api/?results=10&seed=${company}`
          : `https://randomuser.me/api/?results=2&seed=month`;

        const res = await fetch(url);
        const data = await res.json();
        list = data.results;
      }

      setEmp(list[index]);
    };

    loadEmployee();
  }, [company, index, employees, monthEmployees]);

  if (!emp) {
    return <p>Loading...</p>;
  }

  const isFav = favorites.some(
    (f) => f.login.uuid === emp.login.uuid
  );

  return (
    <div className="employee-page">
      <h2>
        info about {emp.name.first} {emp.name.last}
      </h2>

      <div className="employee-details">
        <img
          src={emp.picture?.large}
          alt="employee"
        />

        <div className="details">
          <p>Age: {emp.dob.age}</p>
          <p>Country: {emp.location.country}</p>
          <p>City: {emp.location.city}</p>
          <p>Email: {emp.email}</p>
          <p>Phone: {emp.phone}</p>
        </div>
      </div>

      <span
        className="star"
        onClick={() => toggleFavorite(emp)}
        style={{
          cursor: 'pointer',
          color: isFav ? 'gold' : 'black',
          fontWeight: 'bold',
          fontSize: '50px'
        }}
      >
        *
      </span>

      <MapContainer
        center={[
          Number(emp.location.coordinates.latitude),
          Number(emp.location.coordinates.longitude)
        ]}
        zoom={10}
        style={{ height: '300px', width: '100%', marginTop: '20px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[
            Number(emp.location.coordinates.latitude),
            Number(emp.location.coordinates.longitude)
          ]}
        >
          <Popup>
            {emp.location.city}, {emp.location.country}
          </Popup>
        </Marker>
      </MapContainer>

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
