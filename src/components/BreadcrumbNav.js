import React, { useState, useEffect } from 'react';
import { Link , useLocation } from 'react-router-dom';
import './BreadcrumbNav.css'
const BreadcrumbNav = () => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  let location = useLocation();
  useEffect(() => {
    const pathnames = location.pathname.split('/').filter(x => x);
    const crumbList = pathnames.map((value, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      return { name: value, path };
    });
    setBreadcrumbs(crumbList);
  }, [location]);

  return (
    <div>
      <ul className='bcn' style={{ display: 'flex', listStyleType: 'none' }}>
      <li key='0' style={{ marginLeft: 10 }}>
            <Link className='Blink' to="/Dashboard">
              &lt;
            </Link>
          </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={index} style={{ marginLeft: 10 }}>
            <Link className='Blink' to={crumb.path}>
              {crumb.name.charAt(0).toUpperCase() + crumb.name.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreadcrumbNav;