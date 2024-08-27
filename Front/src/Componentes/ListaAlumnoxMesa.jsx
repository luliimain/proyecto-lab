
import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import ListaDeInscriptos from "./Inscriptos";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Box, Image, Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
    Tooltip,
    TableContainer, Heading// Agrega la importación de Button

} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Barra from './BarraNavegacion';
export default function AlumnosxMesa() {
    let { idMesa } = useParams();
    const [inscriptos, setInscripciones] = useState([]);
    useEffect(() => {
        fetch(`http://localHost:8000/api/GetAlumnoxMesa/${idMesa}`)
            .then(res => res.json())
            .then(data => {
                setInscripciones(data);
            })
    }, [idMesa]);
    return (
        <>
        <Barra></Barra>
            <div >   <Link className="links" to={'/'}>
                <Tooltip label='menu' fontSize='md'>
                    <ArrowBackIcon />
                </Tooltip>
            </Link></div>
            <Heading lineHeight='tall'>

                Alumnos inscriptos por mesa:

            </Heading>
            <div className="otro">
                <div className="centrarInicio">

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <TableContainer className="tablaContainer">
                        <Table variant='simple' className="tabla">
                            <Thead>
                                <Tr>
                                    <Th style={{ color: "black" }}>id inscripcion:</Th>
                                    <Th style={{ color: "black" }}>id mesa:</Th>
                                    <Th style={{ color: "black" }}>dni alumno:</Th>
                                    <Th style={{ color: "black" }}>acciones:</Th>

                                </Tr>
                            </Thead>
                            <Tbody>
                                {inscriptos.map(alu => (
                                    <React.Fragment key={alu.id}>
                                        <ListaDeInscriptos

                                            id_insc={alu.id}
                                            idMesa={alu.idMesa}
                                            DniAlu={alu.dniAlumno}
                                        />
                                        <tr style={{ height: '20px' }}></tr>
                                    </React.Fragment>
                                ))}
                            </Tbody>
                            <br /><br />
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <br />
        </>);

}