import { useContext } from 'react';
import { EmployeesContext } from '../context/EmployeesContext';
import EmployeeItem from '../components/EmployeeItem';

export default function Favorites() {
  const { favorites } = useContext(EmployeesContext);

  return (
    <div className="page">
      <h2>Your favorite employees</h2>

      <div className="grid">
        {favorites.map((emp, i) => (
          <EmployeeItem
            key={emp.login.uuid}
            emp={emp}
            index={i}
            showMoreInfo={false}
          />
        ))}
      </div>
    </div>
  );
}
