from sqlalchemy import Column, Integer, String,ForeignKey
from sqlalchemy.orm import relationship

from baseDeDatos import base

class Mesa(base):
    __tablename__ = 'mesa'
    id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    Fecha=Column(String(30))
    Nombre= Column(String(30))
    
class Alumno(base):
    __tablename__ ='alumnos'
    Dni = Column(Integer,primary_key=True,  unique=True)
    Nombre = Column(String(30))
    Apellido = Column(String(30))
    

   
class Inscripciones(base):
    __tablename__ ='inscripciones'
    id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    idMesa = Column(Integer, ForeignKey('mesa.id'))
    dniAlumno = Column(Integer, ForeignKey('alumnos.Dni'))
    
    mesa = relationship("Mesa", foreign_keys=[idMesa])
    alumno = relationship("Alumno", foreign_keys=[dniAlumno])


  
