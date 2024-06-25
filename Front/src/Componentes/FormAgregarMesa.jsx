import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Box, Image, Heading, Tooltip// Agrega la importación de Button

} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'
import Barra from './BarraNavegacion';
export default function AgregarMesa() {

    const [id, setId] = useState(1);
    const [fecha, setFecha] = useState(new Date());
    const [nombre, setNombre] = useState("");

    function SetNombre(e) {
        setNombre(e.target.value);
    }


    function SetFecha(date) {
        setFecha(date);
    }

    function aceptar(e) {

        e.preventDefault()

        if (fecha != null && nombre != '') {
            const fechaFormateada = fecha.toLocaleString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' })
            console.log(fechaFormateada, nombre);

            fetch('http://127.0.0.1:8000/api/AgregarMesa', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    Fecha: fechaFormateada,
                    Nombre: nombre
                })
            }).then(() => {
                setFecha(new Date())
                setNombre('')
                setId(id)
                window.location.reload();
            }).catch(error => {

                console.error('Error en la solicitud:', error.message);

                alert('Mesa ya existente');

            });

        }


    }

    return (
        <>
            <Barra></Barra>
            <div >
                <Link className="links" to={'/'}>
                    <Tooltip label='menu' fontSize='md'>
                        <ArrowBackIcon />
                    </Tooltip>
                </Link>
            </div>
            <Heading lineHeight='tall'>

                Agregar una nueva mesa:

            </Heading>
            <div className='centrar'>
                <div className='centrarInicio'>
                    <div className='divMesa'>
                        <div className="mesaDiv">
                            <div className='labelAgregar'>
                                <label className='Labels'>fecha:</label>
                                <label className='Labels'>nombre:</label>
                            </div>

                            <div className='inputsAgregar'>
                                <DatePicker className='textBAgregarMesa'
                                    selected={fecha}
                                    onChange={date => SetFecha(date)}
                                    dateFormat="yy-MM-dd"
                                />
                                <br /><br />
                                <input className="textBAgregarMesa" type="text" onChange={SetNombre} value={nombre} />
                                <br /><br />
                                <span style={{ marginRight: '70px' }}></span>
                                <div className='botonesAceptar'>
                                    <button className="botones" onClick={aceptar}><Link className="links" to={'/Mesas'}> aceptar</Link> </button><span className="espacio"></span>
                                    <button className="botones" ><Link className="links" to={'/Mesas'}> cancelar</Link></button>
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
