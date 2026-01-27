import { useContext, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { EmployeesContext } from '../context/EmployeesContext';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function EmployeePage() {
  useEffect(() => {
  window.scrollTo(0, 0);
 }, []);

  const { employees, monthEmployees, favorites, toggleFavorite } =
    useContext(EmployeesContext);

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const company = params.get('company');
  const index = Number(params.get('index'));

  // כשעושים אחורה אם כבר חיפשנו משהו מחזירים עובדים מהחיפוש אם עדיין לא חיפשנו חוזרים לדף הבית
  const list = company ? employees : monthEmployees;

  const realIndex = list.findIndex((_, i) => i === index);
  const emp = list[realIndex];

  if (!emp) {
    return <p>Sorry employee not found</p>;
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
          src={emp.picture?.large }
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
