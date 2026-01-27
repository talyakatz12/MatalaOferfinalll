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

  useEffect(() => {
    if (!q) {
      setCompany('');
      setEmployees([]);
    } else {
      setCompany(q);
    }
  }, [q, setEmployees]);

  const searchEmployees = async () => {
    if (!company.trim()) return;

    setSearchParams({ search: company.trim() });

    try {
      const res = await fetch(
        `https://randomuser.me/api/?results=10&seed=${company.trim()}`
      );

      if (!res.ok) {
        throw new Error('API error');
      }

      const data = await res.json();
      setEmployees(data.results);
    } catch (err) {
      alert('Failed to load employees');
      setEmployees([]);
    }
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

        <div className="grid">
          {listToShow.map((emp, i) => (
            <EmployeeItem
              key={emp?.login?.uuid || i}
              emp={emp}
              index={i}
            />
          ))}
        </div>
      </div>
    </>
  );
}
