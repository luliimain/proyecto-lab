import ListaMesas from "./Mesas";
import { Outlet, Link } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Box, Image, Heading// Agrega la importación de Button

} from '@chakra-ui/react';
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
         <div> <button className="botones"><Link className="links" to={'/'}>Inicio</Link></button></div>
          <div className="centrarInicio">
           

            <Heading lineHeight='tall'>

                Lista de mesas disponibles:

            </Heading>
           
            <br></br><br></br>
            <div>
                <table className="mesaCuerpo">
                    <thead>
                        <tr style={{backgroundColor:'rgb(100, 204, 200)'}}>
                            <th>Fecha</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                            <th></th> 
                            <th></th>
                            <th></th>
                        </tr>
                        <br></br>
                    </thead>
                    <tbody>
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
                      
                    </tbody>
                    <br></br>
                </table >


            </div>
            </div>
        </>
    );

}