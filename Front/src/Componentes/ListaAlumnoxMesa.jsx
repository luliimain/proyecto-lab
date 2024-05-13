
import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import ListaDeInscriptos from "./Inscriptos";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Box, Image, Heading// Agrega la importación de Button

} from '@chakra-ui/react';
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
            <div > <button className="botones"><Link className="links" to={'/Mesas'}>volver a mesas</Link></button></div>
            <div className='centrarInicio'>
                <Heading lineHeight='tall'>

                    Alumnos inscriptos por mesa:

                </Heading>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div>
                    <table className='mesaCuerpo'>
                        <thead>
                            <tr style={{backgroundColor:'rgb(100, 204, 200)'}}>
                                <th>id inscripcion:</th>
                                <th>id mesa:</th>
                                <th>dni alumno:</th>
                                <th>acciones:</th>

                            </tr>
                        </thead>
                        <tbody>
                            {inscriptos.map(alu => (
                                <React.Fragment key={alu.id}>
                                    <ListaDeInscriptos
                                        key={alu.id}
                                        id_insc={alu.id}
                                        idMesa={alu.idMesa}
                                        DniAlu={alu.dniAlumno}
                                    />
                                    <tr style={{ height: '20px' }}></tr>
                                </React.Fragment>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <br />
        </>);

}