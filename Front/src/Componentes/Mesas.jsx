import { Outlet, Link } from "react-router-dom"

 function eliminar (id)
 {
  console.log(id)
  fetch(`http://localHost:8000/api/EliminarMesa/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id
    })
  }).then(()=>{
    window.location.reload();
  }).catch(error => {
    alert('La mesa posee inscripciones, no se puede borrar');
});
 }
 
export default function ListaMesas({ id, Nombre, Fecha}) {
  const Eliminar = () => {
    eliminar(id);
  };

  return (
    <tr>
      
      <td>{Fecha}< span className="espacio"> </span></td>
      <td>{Nombre}<span className="espacio"> </span></td>
      <td><button className="botones">
        <Link className="links" to={`/Mesas/Inscribirse/${id}`}>
            Inscribirse
          </Link>
        </button>
        <span className="espacio"></span></td>
      <td><button className="botones" type="button"> <Link className="links" to={`/Mesas/EditarMesa/${id}`}>Editar</Link> </button>
        <span className="espacio"></span></td>
      <td><button className="botones" type="button" onClick={Eliminar}>
            Eliminar
          </button>
        <span className="espacio"></span></td>
      <td> <button className="botones" type="button"> <Link className="links" to={`/Mesas/VerInscriptos/${id}`}>inscriptos</Link></button></td>
    
    </tr>

  );
}