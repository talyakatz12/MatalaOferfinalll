import { useContext, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { EmployeesContext } from '../context/EmployeesContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;


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

  const list = company ? employees : monthEmployees;
  const emp = list[index];

  if (!emp) {
    return <p>Sorry employee not found</p>;
  }

  const rawLat = emp.location.coordinates.latitude;
  const rawLng = emp.location.coordinates.longitude;

  const lat = parseFloat(String(rawLat).trim());
  const lng = parseFloat(String(rawLng).trim());

  const isFav = favorites.some((f) => f.login.uuid === emp.login.uuid);

  return (
    <div className="employee-page"> 
    <div className="container">
      <h2>
        Info about {emp.name.first} {emp.name.last}
      </h2>

      <div className="employee-details">
        <img src={emp.picture?.large} alt="employee" />

        <div className="details">
          <p>Age: {emp.dob.age}</p>
          <p>Country: {emp.location.country}</p>
          <p>City: {emp.location.city}</p>
          <p>Email: {emp.email}</p>
          <p>Phone: {emp.phone}</p>
        </div>
      </div>
            </div>


     
      <span className="star"
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
        center={[lat, lng]}
        zoom={4}  
        style={{ height: '300px', width: '100%', marginTop: '20px' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[lat, lng]}>
          <Popup>
            {emp.location.city}, {emp.location.country}
          </Popup>
        </Marker>
      </MapContainer>

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
