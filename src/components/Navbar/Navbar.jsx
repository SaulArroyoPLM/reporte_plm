import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BsNavbar, Dropdown, Container,NavDropdown } from 'react-bootstrap';
import './Navbar.css';
import logo from '../../img/plm_blanco_10.svg';
import colombiaFlag from '../../img/iconos_menu/colombia.png';
import mexicoFlag from '../../img/iconos_menu/mexico.png';
import centroamericaFlag from '../../img/iconos_menu/centroamerica.png';
import { faGlobe, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Navbar() {

    
    const handleCountrySelect = (country) => {
    console.log('País seleccionado:', country);
  };


    return (
    <>


    <BsNavbar expand="lg" className="colorCuatro navbar-desktop backgroundUno" style={{height: '80px'}}>
        <Container>
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" height="40" />
          </Link>
                 <div className="menu_header" >
                   <NavDropdown title="Banners" id="basic-nav-dropdown">
              <NavDropdown.Item href="/formato-banner">Formato de banner</NavDropdown.Item>
              <NavDropdown.Item href="/subir-banner">
              Formato de banner reporte
              </NavDropdown.Item>
             
            </NavDropdown>
                           <NavDropdown title="Mailing" id="basic-nav-dropdown">
              <NavDropdown.Item href="/formato-envio">Formato de envio</NavDropdown.Item>
              <NavDropdown.Item href="/formato-reporte">
              Formato de reporte
              </NavDropdown.Item>
             
            </NavDropdown>
                           <NavDropdown title="Diseño" id="basic-nav-dropdown">
              <NavDropdown.Item href="/ps">PS</NavDropdown.Item>
              <NavDropdown.Item href="/ValidadorBanners">
             Validadorbanners
              </NavDropdown.Item>
             
            </NavDropdown>
                 </div>


          <div className="d-flex">
            <Dropdown>
              <Dropdown.Toggle as="a" className="nav-link p-3" id="countryDropdownDesktop">
                <FontAwesomeIcon icon={faGlobe} />
              </Dropdown.Toggle>

              <Dropdown.Menu className="banderas">
                <Dropdown.Item onClick={() => handleCountrySelect('co')}>
                  <img src={colombiaFlag} alt="Colombia" /> Colombia
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleCountrySelect('mx')}>
                  <img src={mexicoFlag} alt="México" /> México
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleCountrySelect('ca')}>
                  <img src={centroamericaFlag} alt="Centroamérica" /> Centroamérica
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Link to="/perfil" className="nav-link p-3">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
        </Container>
      </BsNavbar>
    </>
  );
}

export default Navbar;