import ListaAlumnos from "./Alumnos";
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Box, Image, Heading// Agrega la importación de Button

} from '@chakra-ui/react';
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
         <div > <button className="botones"><Link className="links" to={'/'}>Inicio</Link></button></div>
            
            <div className="centrarInicio">
            <Heading lineHeight='tall'>

Alumnos

</Heading>
<br></br><br></br>

                <table className="mesaCuerpo">
                    <thead >
                        <tr style={{backgroundColor:'rgb(100, 204, 200)'}}>
                            <th>Dni</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Acciones</th>
                            <th></th>

                        </tr>
                        <br></br>
                    </thead>
                    <tbody>
                        {alumno.map(alu => (
                             <React.Fragment key={alu.dni}>
                            <ListaAlumnos
                                key={alu.Dni}
                                dni={alu.Dni}
                                Nombre={alu.Nombre}
                                Apellido={alu.Apellido}
                            />
                               <tr style={{ height: '20px' }}></tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                    <br></br>
                </table >


            </div>
            <br />
           
        </>
    );

}