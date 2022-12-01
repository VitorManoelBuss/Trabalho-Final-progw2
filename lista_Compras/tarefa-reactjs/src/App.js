import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';


function App() {

  const [codigo, setCodigo] = useState();
  const [descricao, setDescricao] = useState('');
  const [listaTarefa, setListaTarefa] = useState([]);

  useEffect(() => {
    buscar();
  }, []);

  function buscar() {
    axios.get('http://localhost:3100/tarefa').then(resultado => {
      console.log(resultado.data);
      setListaTarefa(resultado.data);
    });
  }


  function salvar(event) {
    event.preventDefault();
    let tarefa = {
      codigo: codigo,
      //id: id,
      descricao: descricao
    };
    console.log('tarefa', tarefa);

    axios.put('http://localhost:3100/tarefa', tarefa).then(() => {
      buscar();

      setCodigo();
      setDescricao('');
    });
  }

  function excluir(tarefa) {
      axios.delete(`http://localhost:3100/tarefa/${tarefa.codigo}`).then(() => {
      buscar();
      })
}

  function editar(tarefa) {
      axios.get(`http://localhost:3100/tarefa/${tarefa.codigo}`).then((result) => {
        setCodigo(result.data.codigo)
        setDescricao(result.data.descricao)
      })
  }

  return (
    <div className='container'>
     
      <form onSubmit={(event) => salvar(event)}>
        <div className="mb-3">
          <label className="from-label">Adicione seus itens a lista de compras</label>
          <input type="text" className="form-control"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}></input>
        </div>

        <button type="submit" className="btn btn-dark">Adicionar</button>

      </form>

      <h3>Lista De Compras</h3>

      <table className='table'>
        <thead>
          <tr>
            <td>Itens Adicionados</td>
            <td>Opções</td>
          </tr>
        </thead>
        <tbody>
          {
            listaTarefa.map((tarefa, index) => (
              <tr key={index}>
                <td>{tarefa.descricao}</td>
                <td>
                <button type="submit" className="btn btn-dark" onClick={(event) => editar(tarefa)}>Editar</button>
                <button type="submit" className="btn btn-dark" onClick={(event) => excluir(tarefa)}>Excluir</button><p></p>
                <input type="checkbox" id="topping" name="topping" value="Paneer" /> Item já coletado
                </td>
                </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}


export default App;
