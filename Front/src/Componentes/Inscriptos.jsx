

function eliminar(id_insc) {
  console.log(id_insc)
  fetch(`http://localHost:8000/api/EliminarInscripcion/${id_insc}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id_ins: id_insc
    })
  }).then(()=>{
    window.location.reload();
  }).catch(error => {
    alert('no se puede borrar');
});
}
export default function ListaDeInscriptos({ id_insc, idMesa, DniAlu }) {
  const Eliminar = () => {
    eliminar(id_insc);
  };
  console.log(id_insc)
  return (
    <tr>
      <td>{id_insc}< span className="espacio"> </span></td>
      <td>{idMesa}<span className="espacio"> </span></td>
      <td>{DniAlu}<span className="espacio"> </span></td>
      <td><button className="botones" type="button" onClick={Eliminar}>
          Eliminar
        </button>
        </td>
     
     
    </tr>
  );
}