from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2 


cadena_conexion= ('postgresql+psycopg2://postgres:luciamain@localhost/Mesas')
engine = create_engine(cadena_conexion)
SecionLocal = sessionmaker(autoflush=False,autocommit=False,bind=engine)

base=declarative_base()




 