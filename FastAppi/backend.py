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
    try:
        return ABM.get_Mesa(db=db)
    except Exception as ex:
        raise HTTPException(status_code=400, detail=f"Error al ver mesas: {str(ex)}")
#no tocar ANDAA
@app.get("/api/Alumnos", response_model=list[AlumnoData])
def get_Alumnos(db: Session= Depends(getDB)):
    try:
        return ABM.get_Alumnos(db=db)
    except Exception as ex:
        raise HTTPException(status_code=400, detail=f"Error al ver alumnos: {str(ex)}")
#no tocar ANDAA
@app.get("/api/GetAlumnoxMesa/{idMesa}", response_model=list[InscripcionesData])
def getalumnosxMesa(idMesa:int, db: Session= Depends(getDB)):
    try:
        return ABM.get_alumnosxMesa(db=db, idMesa=idMesa)
    except Exception as ex:
        raise HTTPException(status_code=400, detail=f"Error al ver alumnos por mesa: {str(ex)}")
#no tocar ANDAA
@app.post("/api/AgregarMesa", response_model=MesaData)
def AgregarMesa(mesa:MesaData,db: Session= Depends(getDB)):
    try:
        mesaNueva = ABM.AgregarMesa(db=db, fecha= mesa.Fecha, nombre= mesa.Nombre)
        return mesaNueva
    except Exception as ex:
        raise HTTPException(status_code=400, detail=f"Error al agregar la mesa: {str(ex)}")
#no tocar ANDAA
@app.post("/api/AgregarAlumno", response_model=AlumnoData)
def AgregarAlumno(alumno:AlumnoData ,db: Session= Depends(getDB)):
    try:
        aluNuevo = ABM.AgregarAlumno(db=db,dni=alumno.Dni, nombre=alumno.Nombre, apellido= alumno.Apellido)
        return aluNuevo
    except Exception as ex:
        raise HTTPException(status_code=400, detail=f"Error al agregar alumno nuevo: {str(ex)}")
#no tocar ANDAA
@app.post("/api/Inscribirse/{idMesa}", response_model=InscripcionesData)
def Inscribirse(insc :InscripcionesData,db: Session = Depends(getDB)):
    try:
       inscrip= ABM.Incribirse(db=db,idMesa=insc.idMesa, dniAlumno=insc.dniAlumno)
       return inscrip
    except Exception as ex:
       raise HTTPException(status_code=400, detail=f"Error al hacer inscripcion: {str(ex)}")
#eliminar
#Elimina Mesa //NO tocar
@app.delete("/api/EliminarMesa/{id_mesa}", response_model=MesaData)
def EliminarMesa( id_mesa =int, db: Session = Depends(getDB)):
    try:
        mesa = ABM.EliminarMesa(db=db,id = id_mesa)
        return mesa
    except Exception as ex:
        raise HTTPException(status_code=400, detail=f"Error al borrar mesa de examenes: {str(ex)}")
#no tocar ANDAA
@app.delete("/api/EliminarInscripcion/{id_insc}", response_model=InscripcionesData)
def EliminarInscripcion(id_insc=int, db: Session = Depends(getDB)):
    try:
        insc = ABM.EliminarInscripcion(db=db,id = id_insc)
        return insc
    except Exception as ex:
        raise HTTPException(status_code=400, detail=f"Error al borrar inscripcion: {str(ex)}")
#no tocar ANDAA
@app.delete("/api/EliminarAlumno/{dni}", response_model=AlumnoData)
def EliminarAlumno( dni=int, db: Session = Depends(getDB)):
    try:
        alum = ABM.EliminarAlumno(db=db,dni = dni)
        return alum
    except Exception as ex:
        raise HTTPException(status_code=400, detail=f"Error al borrar alumno: {str(ex)}")
#editar
#Anda no tocar
@app.put("/api/EditarMesa/{id}", response_model=MesaData)
def EditarMesa(id: int, mesa_data: MesaData, db: Session = Depends(getDB)):
    try:
        mesa_ed = ABM.EditarMesa(mesa=mesa_data, id=id, db=db)
        return mesa_ed
    except Exception as ex:
        raise HTTPException(status_code=400, detail=f"Error al editar mesa: {str(ex)}")
@app.put("/api/EditarAlumno/{dni}", response_model=AlumnoData)
def EditarAlumno(alumno:AlumnoData, dni:int, db:Session=Depends(getDB)):
    try:
        aluEd= ABM.EditarAlumno(alumno=alumno,dni=dni,db=db)
        return aluEd
    except Exception as ex:
        raise HTTPException(status_code=400, detail=f"Error al editar alumno: {str(ex)}")