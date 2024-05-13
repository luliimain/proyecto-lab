import React, { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Box, Image, Heading// Agrega la importación de Button

} from '@chakra-ui/react';
export default function EditarAlumno() {

    let { dni } = useParams();
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");



    function SetNombre(e) {
        setNombre(e.target.value);
    }

    function SetApellido(e) {
        setApellido(e.target.value);
    }

    function aceptar(e) {
        e.preventDefault();
        console.log(dni, nombre);
      
            if (dni != null && nombre != '' && apellido != '') {
                fetch(`http://127.0.0.1:8000/api/EditarAlumno/${dni}`, {
                    method: 'PUT',
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
                    window.location.reload();
                }).catch(error => {

                    console.error('Error en la solicitud:', error.message);
                    alert('error la editar');

                });
            }
         
        
    }

    return (
        <>
            <div > <button className="botones"><Link className="links" to={'/Alumnos'}>volver a alumnos</Link></button></div>
<div className='centrarInicio'>
            <Heading lineHeight='tall'>

Editar

</Heading>
            <form className="mesaDiv">
                <label className='Labels'>nombre:</label><span className="espacio"></span>
                <input className="textBAgregarMesa" type="text" onChange={SetNombre} value={nombre} />
                <br /><br />
                <label>apellido:</label><span className="espacio"></span>
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
