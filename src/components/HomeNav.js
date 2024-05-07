import './HomeNav.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPeopleGroup, faFile, faMessage, faClapperboard, faChartPie, faGear } from '@fortawesome/free-solid-svg-icons';
import { faHive } from '@fortawesome/free-brands-svg-icons';

function HomeNav() {

    const navigationItems = [
        ["Dashboard", faHouse],
        ["Teams", faPeopleGroup],
        ["Hive", faHive],
        ["File", faFile],
        ["Chart", faChartPie],
        ["Chat", faMessage],
        ["Board", faClapperboard],
        ["Gear", faGear]
    ];
  
    return (
      <nav className="navbar-menu">
        <ul className="navbar__list">
          {navigationItems.map((item, index) => (
            <li key={index} className="navbar__li-box" >
                <Link className='link' to={`/${item[0]}`} >
                    <FontAwesomeIcon icon={item[1]}/>
                </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
  
  export default HomeNav;
  