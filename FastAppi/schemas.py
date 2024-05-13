from pydantic import BaseModel


try:
   class MesaData(BaseModel):
     id:int
     Fecha:str
     Nombre:str
   class AlumnoData(BaseModel):   
     Dni:int
     Nombre:str
     Apellido:str
   class InscripcionesData(BaseModel):
      id:int
      idMesa:int
      dniAlumno:int
except Exception as exc_info:
    print(f"Ocurrió un error: {exc_info}")