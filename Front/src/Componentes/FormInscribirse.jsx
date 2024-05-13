import { Outlet, Link, useParams, Form } from "react-router-dom"
import React, { useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button, Box, Image, Heading// Agrega la importación de Button

} from '@chakra-ui/react';
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
        alert('dni desconocido');

      });

    }


  }
  return (
    <>
      <div > <button className="botones"><Link className="links" to={'/Mesas'}>volver a mesas</Link></button></div>

      <div className="centrarInicio">
        <Heading lineHeight='tall'>

          Inscribirse a Mesa:

        </Heading>
        <form className="mesaDiv">
        <label className="Labels" >dni:</label>  <input className="textBAgregarMesa" type="input" onChange={SetDni} value={dni} />
        <br /><br />
        <button className="botones" onClick={aceptar}><Link className="links" to={'/Mesas'}>aceptar</Link></button>
        <span className="espacio"></span>
        <button className="botones"><Link className="links" to={'/Mesas'}>cancelar</Link></button>
        <Box boxSize='auto'> <br></br>
           <Image src='https://enief2019.amcaonline.org.ar/images/partners/UTNParana.png' />
        </Box>
        </form>
        </div>
  
    </>);
}
