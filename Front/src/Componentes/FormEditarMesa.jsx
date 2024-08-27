import React, { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Box, Image, Heading, Tooltip

} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'
import 'react-datepicker/dist/react-datepicker.css';
import Barra from './BarraNavegacion';
export default function AgregarMesa() {

    let { id } = useParams()
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

            fetch(`http://127.0.0.1:8000/api/EditarMesa/${id}`, {
                method: 'PUT',
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
                window.location.reload();
            }).catch(error => {
                console.error('Error en la solicitud:', error.message);
                alert('no se pudo editar la mesa');

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

                Editar mesa:

            </Heading>

            <div className='centrar'>
                <div className='centrarInicio'>
                    <div className='divMesa'>
                        <div className="mesaDiv">
                            <div className='labelAgregar'>
                                <label className='Labels'>fecha:</label><span style={{ marginRight: '25px' }}></span>
                                <label className='Labels'> nombre:</label><span className="espacio"></span>
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
