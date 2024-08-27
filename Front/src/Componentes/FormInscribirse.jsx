import { Outlet, Link, useParams, Form } from "react-router-dom"
import React, { useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button, Box, Image, Heading, Tooltip// Agrega la importación de Button

} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'
import Barra from "./BarraNavegacion";
export default function Inscribirse() {
  let { idMesa } = useParams();
  const [id, setId] = useState(1);

  const [dni, setDni] = useState('');

  function SetDni(e) {
    setDni(e.target.value);
  }
  function SetError(e) {
    setDni(e.target.value);
  }

  function aceptar(e) {
    console.log(idMesa, dni);
    e.preventDefault()

    if (dni != '' && idMesa != '') {
      fetch(`http://127.0.0.1:8000/api/Inscribirse/${idMesa}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          idMesa: idMesa,
          dniAlumno: dni
        })
      }).then(() => {
        setId(0)
        setDni('')
        window.location.reload();
      }).catch(error => {
        console.error('Error en la solicitud:', error.message);
        alert('DNI incorrecto');
        
      });

    }


  }
  return (
    <>
      <Barra></Barra>
      <div >   <Link className="links" to={'/'}>
        <Tooltip label='menu' fontSize='md'>
          <ArrowBackIcon />
        </Tooltip>
      </Link></div>
      <Heading lineHeight='tall'>

        Inscribirse a Mesa:

      </Heading>
      <div className='centrar'>
        <div className='centrarInicio'>
          <div className='divMesa'>
            <div className="mesaDiv">
              <div className='labelAgregar'>
                <label className="Labels" >dni:</label>
              </div>
              <div className='inputsAgregar'>
                <input className="textBAgregarMesa" type="input" onChange={SetDni} value={dni} />
                <br /><br />
                <div className='botonesAceptar'>
                  <button className="botones" onClick={aceptar}><Link className="links" to={`/Mesas/VerInscriptos/${idMesa}`}>aceptar</Link></button>
                  <span className="espacio"></span>
                  <button className="botones"><Link className="links" to={'/Mesas'}>cancelar</Link></button>
                </div>
              </div>

            </div>

          </div>
          < Box boxSize='auto'> <br></br>

            <Image src='https://enief2019.amcaonline.org.ar/images/partners/UTNParana.png' />
          </Box>
        </div>
      </div >

    </>);
}
