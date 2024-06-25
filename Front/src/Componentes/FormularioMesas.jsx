
import { Outlet, Link } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
    Tooltip,
    TableContainer, Heading

} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'
import Barra from "./BarraNavegacion";

function eliminar(id) {
    console.log(id)
    fetch(`http://localHost:8000/api/EliminarMesa/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    }).then(() => {
        window.location.reload();
    }).catch(error => {
        alert('La mesa posee inscripciones, no se puede borrar');
    });
}

function ListaMesas({ id, Nombre, Fecha }) {
    const Eliminar = () => {
        eliminar(id);
    };

    return (
        <Tr>

            <Td>{Fecha}< span className="espacio"> </span></Td>
            <Td>{Nombre}<span className="espacio"> </span></Td>
            <Td><button className="botones">
                <Link className="links" to={`/Mesas/Inscribirse/${id}`}>
                    Inscribirse
                </Link>
            </button>
                <span className="espacio"></span></Td>
            <Td><button className="botones" type="button"> <Link className="links" to={`/Mesas/EditarMesa/${id}`}>Editar</Link> </button>
                <span className="espacio"></span></Td>
            <Td><button className="botones" type="button" onClick={Eliminar}>
                Eliminar
            </button>
                <span className="espacio"></span></Td>
            <Td> <button className="botones" type="button"> <Link className="links" to={`/Mesas/VerInscriptos/${id}`}>inscriptos</Link></button></Td>

        </Tr>

    );
}
export default function ListaDeMesas() {
    const [mesas, setMesas] = useState([]);
    useEffect(() => {
        fetch('http://localHost:8000/api/mesas')
            .then(res => res.json())
            .then(data => {
                setMesas(data);
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
            <div className="tituloTabla">
                <Heading lineHeight='tall'>

                    Lista de mesas disponibles:

                </Heading>
            </div>

            <div className="otro">
                <div className="centrarInicio">

                    <br></br><br></br>
                    <TableContainer className="tablaContainer">
                        <Table variant='simple' className="tabla">
                            <Thead>
                                <Tr>
                                    <Th style={{ color: "black" }}>Fecha</Th>
                                    <Th style={{ color: "black" }}>Nombre</Th>
                                    <Th style={{ color: "black" }}>Acciones</Th>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {mesas.map(mesa => (
                                    <React.Fragment key={mesa.id}>
                                        <ListaMesas
                                            id={mesa.id}
                                            Fecha={mesa.Fecha}
                                            Nombre={mesa.Nombre}
                                        />
                                        <tr style={{ height: '20px' }}></tr>
                                    </React.Fragment>
                                ))}
                            </Tbody>
                        </Table >
                    </TableContainer>

                </div>
            </div>
        </>
    );

}