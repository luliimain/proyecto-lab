import { Outlet, Link } from "react-router-dom"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Box, Image, Heading// Agrega la importación de Button

} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons'
import { color } from "framer-motion";


export default function Links() {
    return (
        <>
            <div className="centrarInicio">
                <Heading lineHeight='tall'>

                    Universidad Tecnologica Nacional.
                    F.R.P

                </Heading>
                <br />
                <div>
                    <Menu >
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} style={{ marginRight: '20px' }} >
                            Facultad
                        </MenuButton>
                        <MenuList>
                            <MenuItem><Link className="links" to={'/Mesas'}>Mesas</Link></MenuItem>
                            <MenuItem><Link className="links" to={'/Mesas/AgregarMesa'}>Agregar mesa</Link></MenuItem>
                        </MenuList>
                    </Menu>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            Alumnos
                        </MenuButton>
                        <MenuList>
                            <MenuItem><Link className="links" to={'/Alumnos'}>Alumnos</Link></MenuItem>
                            <MenuItem><Link className="links" to={'/Alumnos/AgregarAlumno'}>Agregar alumno</Link></MenuItem>
                        </MenuList>
                    </Menu>
                </div>
                <Box boxSize='auto'>
                    <Image src='https://enief2019.amcaonline.org.ar/images/partners/UTNParana.png' />
                </Box>
                <Outlet />
            </div>
        </>
    )
}