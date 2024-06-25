
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
    Tooltip,
    TableContainer, Heading// Agrega la importación de Button

} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'
import Barra from './BarraNavegacion';

function eliminar(dni) {
    console.log(dni)
    fetch(`http://localHost:8000/api/EliminarAlumno/${dni}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dni: dni
        })
    }).then(() => {
        window.location.reload();
    })
}
function ListaAlumnos({ dni, Nombre, Apellido }) {
    const Eliminar = () => {
        eliminar(dni);
    };
    return (
        <Tr>
            <Td >{dni}</Td>
            <Td>{Nombre}</Td>
            <Td>{Apellido}</Td>
            <Td><button className="botones" type="button" > <Link className="links" to={`/Mesas/EditarAlumno/${dni}`}>Editar</Link></button></Td>
            <Td><button className="botones" type="button" onClick={Eliminar}>eliminar</button></Td>
        </Tr>
    );
}
export default function ListaDeAlumnos() {
    const [alumno, setAlumnos] = useState([]);
    useEffect(() => {
        fetch('http://localHost:8000/api/Alumnos')
            .then(res => res.json())
            .then(data => {
                setAlumnos(data);
            })
    }, []);
    return (
        <>
            <Barra></Barra>
            <div >   <Link className="links" to={'/'}>
                <Tooltip label='menu' fontSize='md'>
                    <ArrowBackIcon />
                </Tooltip>
            </Link></div>
            <div className='tituloTabla'><Heading lineHeight='tall'>

                Lista de alumnos en la facultad

            </Heading></div>
            <div className="otro">
                <div className="centrarInicio">

                    <br></br><br></br>
                    <TableContainer className="tablaContainer">
                        <Table variant='simple' className="tabla">
                            <Thead>
                                <Tr>
                                    <Th style={{ color: "black" }}>Dni</Th>
                                    <Th style={{ color: "black" }}>Nombre</Th>
                                    <Th style={{ color: "black" }}>Apellido</Th>
                                    <Th style={{ color: "black" }}>Acciones</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {alumno.map(alu => (
                                    <React.Fragment key={alu.Dni}>
                                        <ListaAlumnos
                                            dni={alu.Dni}
                                            Nombre={alu.Nombre}
                                            Apellido={alu.Apellido}
                                        />
                                        <tr style={{ height: '20px' }}></tr>
                                    </React.Fragment>
                                ))}
                            </Tbody>
                            <br></br>
                        </Table >
                    </TableContainer>


                </div>
            </div>
            <br />

        </>
    );

}