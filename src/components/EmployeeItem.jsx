import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeesContext } from '../context/EmployeesContext';

export default function EmployeeItem({
  emp,
  showMoreInfo = true
}) {
  const { favorites, toggleFavorite } = useContext(EmployeesContext);
  const navigate = useNavigate();

  const isFav = favorites.some(
    (f) => f.login.uuid === emp.login.uuid
  );

  const goToEmployee = () => {
    navigate(`/employee/${emp.login.uuid}`);
  };

  return (
    <div className="employee-card">
      <img
        src={emp.picture?.large}
        alt={`${emp.name.first} ${emp.name.last}`}
      />

      <div className="info">
        <h4>
          {emp.name.first} {emp.name.last}
        </h4>
        <p>Age: {emp.dob.age}</p>
        <p>Country: {emp.location.country}</p>

        {showMoreInfo && (
          <button onClick={goToEmployee}>more info</button>
        )}
      </div>

      <span
        className="star"
        onClick={() => toggleFavorite(emp)}
        style={{
          color: isFav ? 'gold' : 'black',
          fontSize: '40px'
        }}
      >
        ★
      </span>
    </div>
  );
}
