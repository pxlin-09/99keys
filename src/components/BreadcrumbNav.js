import React, { useState, useEffect } from 'react';
import { Link , useLocation } from 'react-router-dom';
import './BreadcrumbNav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPeopleGroup, faFile, faMessage, faClapperboard, faChartPie, faGear } from '@fortawesome/free-solid-svg-icons';
import { faHive } from '@fortawesome/free-brands-svg-icons';
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
    <div className='bnav'>
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
      <div className='nav-icons'>
        <FontAwesomeIcon className='bell' icon={faBell} />
        <select
                className="group-select"
                >
                    <option value=""></option>
                    <option value="Studio">aaa group</option>
                    <option value="One Bed One Bath">bbb group</option>
                    <option value="Two Bed One Bath">ccc group</option>
                </select>
      </div>
    </div>
  );
};

export default BreadcrumbNav;