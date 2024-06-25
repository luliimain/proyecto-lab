from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import ABM
from baseDeDatos import engine, SecionLocal
from schemas import AlumnoData, MesaData, InscripcionesData
from modelos import base

base.metadata.create_all(bind=engine)

def getDB():
    db= SecionLocal()
    try:
        yield db
    finally:
        db.close()

app= FastAPI()
origen = [
    'http://localhost:5173',
]
app.add_middleware(CORSMiddleware, allow_origins=origen,
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE", "OPTIONS", "PUT"], 
    allow_headers=["*"],)
@app.get('/')
def root():
    return "hola mundo"

#no tocar ANDAA
@app.get("/api/mesas", response_model=list[MesaData])
def get_Mesas(db: Session= Depends(getDB)):
    return ABM.get_Mesa(db=db)
#no tocar ANDAA
@app.get("/api/Alumnos", response_model=list[AlumnoData])
def get_Alumnos(db: Session= Depends(getDB)):
    return ABM.get_Alumnos(db=db)
#no tocar ANDAA
@app.get("/api/GetAlumnoxMesa/{idMesa}", response_model=list[InscripcionesData])
def getalumnosxMesa(idMesa:int, db: Session= Depends(getDB)):
    return ABM.get_alumnosxMesa(db=db, idMesa=idMesa)
#no tocar ANDAA
@app.post("/api/AgregarMesa", response_model=MesaData)
def AgregarMesa(mesa:MesaData,db: Session= Depends(getDB)):
    mesaNueva = ABM.AgregarMesa(db=db, fecha= mesa.Fecha, nombre= mesa.Nombre)
    return mesaNueva
#no tocar ANDAA
@app.post("/api/AgregarAlumno", response_model=AlumnoData)
def AgregarMesa(alumno:AlumnoData ,db: Session= Depends(getDB)):
   
    aluNuevo = ABM.AgregarAlumno(db=db,dni=alumno.Dni, nombre=alumno.Nombre, apellido= alumno.Apellido)
    return aluNuevo
#no tocar ANDAA
@app.post("/api/Inscribirse/{idMesa}", response_model=InscripcionesData)
def Inscribirse(insc :InscripcionesData,db: Session = Depends(getDB)):
    inscrip= ABM.Incribirse(db=db,idMesa=insc.idMesa, dniAlumno=insc.dniAlumno)
    return inscrip


#eliminar
#Elimina Mesa //NO tocar
@app.delete("/api/EliminarMesa/{id_mesa}", response_model=MesaData)
def EliminarMesa( id_mesa =int, db: Session = Depends(getDB)):
    mesa = ABM.EliminarMesa(db=db,id = id_mesa)
    return mesa

#no tocar ANDAA
@app.delete("/api/EliminarInscripcion/{id_insc}", response_model=InscripcionesData)
def EliminarInscripcion(id_insc=int, db: Session = Depends(getDB)):
    insc = ABM.EliminarInscripcion(db=db,id = id_insc)
    return insc

#no tocar ANDAA
@app.delete("/api/EliminarAlumno/{dni}", response_model=AlumnoData)
def EliminarAlumno( dni=int, db: Session = Depends(getDB)):
    alum = ABM.EliminarAlumno(db=db,dni = dni)
    return alum

#editar
#Anda no tocar
@app.put("/api/EditarMesa/{id}", response_model=MesaData)
def EditarMesa(id: int, mesa_data: MesaData, db: Session = Depends(getDB)):
    mesa_ed = ABM.EditarMesa(mesa=mesa_data, id=id, db=db)
    return mesa_ed

@app.put("/api/EditarAlumno/{dni}", response_model=AlumnoData)
def EditarAlumno(alumno:AlumnoData, dni:int, db:Session=Depends(getDB)):
    aluEd= ABM.EditarAlumno(alumno=alumno,dni=dni,db=db)
    return aluEd
