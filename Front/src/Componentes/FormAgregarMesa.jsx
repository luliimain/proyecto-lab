import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Box, Image, Heading// Agrega la importación de Button

} from '@chakra-ui/react';
export default function AgregarMesa() {

    const[id,setId] = useState(1);
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

            fetch('http://127.0.0.1:8000/api/AgregarMesa', {
                method: 'POST',
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
            <div> <button className="botones"><Link className="links" to={'/Mesas'}>volver a mesas</Link></button></div>
            <div className="centrarInicio">
            <Heading lineHeight='tall'>

               Agregar una nueva mesa:

            </Heading>
            <form className="mesaDiv">
                <label className='Labels'>fecha:</label><span style={{ marginRight: '25px' }}></span>
                <DatePicker className='textBAgregarMesa'
                    selected={fecha}
                    onChange={date => SetFecha(date)}
                    dateFormat="yy-MM-dd"
                />
                <br /><br />
                <label className='Labels'>nombre:</label><span className="espacio"></span>
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
