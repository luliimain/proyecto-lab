import { Outlet, Link } from "react-router-dom"
function eliminar (dni)
 {
  console.log(dni)
  fetch(`http://localHost:8000/api/EliminarAlumno/${dni}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      dni: dni
    })
  }).then(()=>{
    window.location.reload();
  })
 }
export default function ListaAlumnos({dni,Nombre,Apellido }) {
  const Eliminar = () => {
    eliminar(dni);
  };
    return (
      <tr className="mesa">
        <td>{dni}<span className="espacio"></span></td>
        <td>{Nombre}<span className="espacio"></span></td>
        <td>{Apellido}<span className="espacio"></span></td>
        <td><button className="botones" type="button" > <Link className="links" to={`/Mesas/EditarAlumno/${dni}`}>Editar</Link></button></td>
        <td><button className="botones" type="button" onClick={Eliminar}>
            Eliminar
          </button></td>
      </tr>
  
    );
  }