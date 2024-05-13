from sqlalchemy.orm import Session
from modelos import Mesa, Alumno, Inscripciones
from schemas import MesaData,AlumnoData, InscripcionesData

#filtros
def get_Mesa(db: Session):
    return db.query(Mesa).all()

def get_Alumnos(db:Session):
    return db.query(Alumno).all()

def VerificarMesa(db:Session, mesa:MesaData):
     return db.query(Mesa).filter(Mesa==mesa)



    

#Devuelve inscripciones //NO tocar
def get_alumnosxMesa(db:Session, idMesa: int):
      resultados = db.query(Inscripciones).filter(Inscripciones.idMesa == idMesa).all()
    
      return resultados


#hacer inscripcion//NO tocar
def Incribirse(db: Session, idMesa: int, dniAlumno: int):
    idNuevo =0
    alumnoviejo = db.query(Inscripciones).filter(Inscripciones.dniAlumno == dniAlumno).filter(Inscripciones.idMesa == idMesa).first()
    if alumnoviejo is None:
         mesa = db.query(Mesa).filter(Mesa.id == idMesa).first()
         alumno = db.query(Alumno).filter(Alumno.Dni == dniAlumno).first()
         inscr = db.query(Inscripciones).order_by(Inscripciones.id.desc()).first()
         if inscr:
            idNuevo = inscr.id +1
         else:
           idNuevo = 1
         inscrip = Inscripciones(id=idNuevo,idMesa=mesa.id, dniAlumno=alumno.Dni)  
         db.add(inscrip)
         db.commit()
         return inscrip
    else:
        return None

#agregarMesa//No tocar
def AgregarMesa(db :Session, fecha: int, nombre:str):
    mesaRep = db.query(Mesa).filter(Mesa.Fecha==fecha).filter(Mesa.Nombre== nombre).first()
    if mesaRep is None:
        idNuevo= 1
        mesita = db.query(Mesa).order_by(Mesa.id.desc()).first()
        if mesita:
              idNuevo= mesita.id +1
        else:
            idNuevo = 1
        MesaNueva = Mesa(id=idNuevo,Fecha=fecha,Nombre= nombre)
        db.add(MesaNueva)
        db.commit()
        return MesaNueva
    else:
        return None
   

#agregarAlumno//NO tocar FUnciona
def AgregarAlumno (db: Session, dni:int, apellido:str, nombre:str):
    if isinstance(dni,int):
         yaesta = db.query(Alumno).filter(Alumno.Dni==dni).first()
         if yaesta is None:
             alumNuevo = Alumno(Dni=dni,Nombre=nombre, Apellido=apellido)
             db.add(alumNuevo)
             db.commit()
             return alumNuevo
    else:
        return None
    

#eliminar//No TOcar Funciona
def EliminarMesa(db: Session, id:int):
    tieneIns = db.query(Inscripciones).filter(Inscripciones.idMesa==id).first()
    if tieneIns is None:
           eliminada = db.query(Mesa).filter(Mesa.id == id).first()
           db.delete(eliminada) 
           db.commit()
           return eliminada
    else:
        return None


#NO tocar FUnciona
def EliminarInscripcion(db: Session, id:int):
    eliminada = db.query(Inscripciones).filter(Inscripciones.id == id).first()
    if eliminada:
        db.delete(eliminada) 
        db.commit()
        return eliminada
    else: 
        return None


#no tocar ANDAA
def EliminarAlumno(db: Session, dni:int):
    tieneIns = db.query(Inscripciones).filter(Inscripciones.dniAlumno== dni).all()
    if tieneIns:
         for inscripcion in tieneIns:
             EliminarInscripcion(db=db, id=inscripcion.id)
    eliminado = db.query(Alumno).filter(Alumno.Dni== dni).first()
    db.delete(eliminado) 
    db.commit()
    return eliminado

#editar
def EditarAlumno(alumno:AlumnoData,dni:int, db: Session ):
    editado = db.query(Alumno).filter(Alumno.Dni== dni).first()
    if editado:
            editado.Nombre = alumno.Nombre
            editado.Apellido = alumno.Apellido
            editado.Dni = alumno.Dni
            db.commit()
            db.refresh(editado)
            return editado
    else:
         return None

def EditarMesa(db: Session, id: int,  mesa: MesaData ):
    editado = db.query(Mesa).filter(Mesa.id== id).first()
    if editado: 
        editado.Fecha = mesa.Fecha
        editado.Nombre= mesa.Nombre
        db.commit()
        db.refresh(editado)
        return editado
    else:
         return None

