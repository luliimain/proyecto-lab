import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Box, Image, Heading, Tooltip

} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'
import Barra from './BarraNavegacion';
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
            <Barra></Barra>
            <div >   <Link className="links" to={'/'}>
                <Tooltip label='menu' fontSize='md'>
                    <ArrowBackIcon />
                </Tooltip>
            </Link></div>
            <Heading lineHeight='tall'>

                Agregar alumno:

            </Heading>
            <div className='centrar'>
                <div className='centrarInicio'>
                    <div className='divMesa'>
                        <div className="mesaDiv">
                            <div className='labelAgregar'>
                                <label className='Labels'>Dni:</label>
                                <label className='Labels'>nombre:</label>
                                <label className='Labels'>apellido:</label>
                            </div>
                            <div className='inputsAgregar'>
                                <input className="textBAgregarMesa" type="text" onChange={SetDni} value={dni} />
                                <br /><br />

                                <input className="textBAgregarMesa" type="text" onChange={SetNombre} value={nombre} />
                                <br /><br />

                                <input className="textBAgregarMesa" type="text" onChange={SetApellido} value={apellido} />
                                <br /><br />
                                <span style={{ marginRight: '70px' }}></span>

                                <div className='botonesAceptar'>
                                    <button className="botones" onClick={aceptar}> <Link className="links" to={'/Alumnos'}>aceptar</Link> </button><span className="espacio"></span>
                                    <button className="botones"><Link className="links" to={'/Alumnos'}>cancelar</Link> </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Box boxSize='auto'> <br></br>
                        <Image src='https://enief2019.amcaonline.org.ar/images/partners/UTNParana.png' />
                    </Box>
                </div>
            </div>
        </>
    );
}
