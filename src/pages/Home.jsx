import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EmployeesContext } from '../context/EmployeesContext';
import EmployeeItem from '../components/EmployeeItem';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const { employees, setEmployees, monthEmployees } =
    useContext(EmployeesContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('search') || '';

  const [company, setCompany] = useState(q);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEmployees = async () => {
      if (!q) {
        setEmployees([]);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          `https://randomuser.me/api/?results=10&seed=${q}`
        );
        const data = await res.json();
        setEmployees(data.results);
      } catch (err) {
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, [q, setEmployees]);

  const searchEmployees = () => {
    if (!company.trim()) return;
    setSearchParams({ search: company.trim() });
  };

  const isSearchMode = !!q;
  const listToShow = isSearchMode ? employees : monthEmployees;

  return (
    <>
      <div className="strip"></div>

      <div className="page">
        <SearchBar
          value={company}
          onChange={setCompany}
          onSearch={searchEmployees}
        />

        <h3>
          {isSearchMode
            ? `Search for employees of ${q.toUpperCase()}`
            : 'Employees of the month:'}
        </h3>

        {loading && <p>Loading...</p>}

        {!loading && (
          <div className="grid">
            {listToShow.map((emp) => (
              <EmployeeItem
                key={emp.login.uuid}
                emp={emp}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
