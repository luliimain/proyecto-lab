import React, { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Box, Image, Heading// Agrega la importación de Button

} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
export default function AgregarMesa() {

    let {id} = useParams()
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
            const fechaFormateada = fecha.toLocaleString('es-AR',{ year: '2-digit', month: '2-digit', day: '2-digit'})
            console.log(fechaFormateada, nombre);

            fetch(`http://127.0.0.1:8000/api/EditarMesa/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    id : id,
                    Fecha: fechaFormateada,
                    Nombre: nombre
                })
            }).then(() => {
                setFecha(new Date())
                setNombre('')
                window.location.reload();
            }) .catch(error => {
                console.error('Error en la solicitud:', error.message);
                alert('no se pudo editar la mesa');
           
            });
        }
  
        
    }

    return (
        <>
            <div > <button className="botonVolverAtras"><Link className="links" to={'/Mesas'}>volver a mesas</Link></button></div>
            <div className="centrarInicio">
            <Heading lineHeight='tall'>

              Editar mesa: 

            </Heading>
         
            <form className="mesaDiv">
            <br />
                <label className='Labels'>fecha:</label><span style={{ marginRight: '25px' }}></span>
                <DatePicker className='textBAgregarMesa'
                    selected={fecha}
                    onChange={date => SetFecha(date)}
                    dateFormat="yy-MM-dd"
                />
                <br /><br />
                <label className='Labels'> nombre:</label><span className="espacio"></span>
                <input className="textBAgregarMesa" type="text" onChange={SetNombre} value={nombre} />
                <br /><br />
                <button className="botones" onClick={aceptar}><Link className="links" to={'/Mesas'}> aceptar</Link> </button><span className="espacio"></span>
                <button className="botones" ><Link className="links" to={'/Mesas'}> cancelar</Link></button>
                <Box boxSize='auto'> <br></br>
                    <Image src='https://enief2019.amcaonline.org.ar/images/partners/UTNParana.png' />
                </Box>
            </form>
            </div>
        </>
    );
}
