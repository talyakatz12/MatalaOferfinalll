import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { EmployeesContext } from '../context/EmployeesContext';

export default function EmployeeItem({
  emp,
  index,
  showMoreInfo = true
}) {
  const { favorites, toggleFavorite } = useContext(EmployeesContext);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const company = params.get('search');

  const isFav = favorites.some(
    (f) => f.login.uuid === emp.login.uuid
  );

  const goToEmployee = () => {
    navigate(
      `/employee?${company ? `company=${company}&` : ''}index=${index}`
    );
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
          cursor: 'pointer',
          color: isFav ? 'gold' : 'black',
          fontWeight: 'bold',
          fontSize: '50px'
        }}
      >
        *
      </span>
    </div>
  );
}
