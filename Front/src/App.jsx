import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import './App.css';
import AgregarMesa from './Componentes/FormAgregarMesa';
import AgregarAlumno from './Componentes/FormAgregarAlumnos';
import Menu from './Componentes/MenuPrincipal';
import { Route, Router, Routes } from 'react-router-dom'
import ListaDeMesas from './Componentes/FormularioMesas';
import ListaDeAlumnos from './Componentes/FormularioAlumnos';
import AlumnosxMesa from './Componentes/ListaAlumnoxMesa';
import Inscribirse from './Componentes/FormInscribirse';
import EditarMesa from './Componentes/FormEditarMesa';
import EditarAlumno from './Componentes/FormEditarAlumno';
import 'bootstrap/dist/css/bootstrap.min.css';




  
  function App() {
  
    return (
      <>
       <ChakraProvider>
        <div className='body'>
          <Routes>
            <Route path='/' element ={<Menu/>}>
            </Route>
            <Route path='/Mesas' element={<ListaDeMesas></ListaDeMesas>}></Route>
            <Route path='/Alumnos' element={<ListaDeAlumnos></ListaDeAlumnos>}></Route>
            <Route path='/Mesas/AgregarMesa' element={<AgregarMesa></AgregarMesa>}></Route>
            <Route path='/Alumnos/AgregarAlumno' element={<AgregarAlumno></AgregarAlumno>}></Route>
            <Route path='/Mesas/VerInscriptos/:idMesa' element={<AlumnosxMesa></AlumnosxMesa>}></Route>
            <Route path='/Mesas/Inscribirse/:idMesa' element={<Inscribirse></Inscribirse>}></Route>
            <Route path='/Mesas/EliminarMesa/:idMesa' element={<ListaDeMesas></ListaDeMesas>}></Route>
            <Route path='/Mesas/EliminarInscripcion/:idIns' element={<ListaDeMesas></ListaDeMesas>}></Route>
            <Route path='/Alumnos/EliminarALumno/:dni' element={<ListaDeAlumnos></ListaDeAlumnos>}></Route>
            <Route path='/Mesas/EditarMesa/:id' element={<EditarMesa></EditarMesa>}></Route>
            <Route path='/Mesas/EditarAlumno/:dni' element={<EditarAlumno></EditarAlumno>}></Route>
          </Routes>
        </div>
        </ChakraProvider>
      </>
    )
  }

     

    
  


export default App;
