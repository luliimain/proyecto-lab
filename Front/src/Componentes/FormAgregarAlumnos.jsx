import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Box, Image, Heading

} from '@chakra-ui/react';
export default function AgregarAlumno() {

    const [dni, setDni] = useState(null);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");

    function SetDni(e) {
        setDni(e.target.value);
    }

    function SetNombre(e) {
        setNombre(e.target.value);
    }

    function SetApellido(e) {
        setApellido(e.target.value);
    }

    function aceptar(e) {
        e.preventDefault();
      
            if (dni != null, apellido != '', nombre != '') {
                console.log(dni, nombre);
                fetch('http://127.0.0.1:8000/api/AgregarAlumno', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        Dni: dni,
                        Nombre: nombre,
                        Apellido: apellido
                    })
                }).then(() => {
                    setApellido('');
                    setNombre('');
                    setDni('');
                    window.location.reload();
                }).catch(error => {

                    console.error('Error en la solicitud:', error.message);
                    alert('Alumno ya existente');
                });
            }
    }

    return (
        <>
            <div> <button className="botones"><Link className="links" to={'/Alumnos'}>volver a alumnos</Link></button></div>
<div className='centrarInicio'>
            <Heading lineHeight='tall'>

Agregar alumno:

</Heading>
            <form className="mesaDiv">
                <label className='Labels'>Dni:</label><span style={{ marginRight: '40px' }}></span>
                <input className="textBAgregarMesa" type="text" onChange={SetDni} value={dni} />
                <br /><br />
                <label className='Labels'>nombre:</label><span className="espacio"></span>
                <input className="textBAgregarMesa" type="text" onChange={SetNombre} value={nombre} />
                <br /><br />
                <label className='Labels'>apellido:</label><span className="espacio"></span>
                <input className="textBAgregarMesa" type="text" onChange={SetApellido} value={apellido} />
                <br /><br />
                <span style={{ marginRight: '70px' }}></span>
                <button className="botones" onClick={aceptar}> <Link className="links" to={'/Alumnos'}>aceptar</Link> </button><span className="espacio"></span>
                <button className="botones"><Link className="links" to={'/Alumnos'}>cancelar</Link> </button>
                <Box boxSize='auto'> <br></br>
                    <Image src='https://enief2019.amcaonline.org.ar/images/partners/UTNParana.png' />
                </Box>
            </form>
            </div>
        </>
    );
}
