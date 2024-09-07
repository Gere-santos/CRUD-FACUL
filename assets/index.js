'use strict'
// abre e fecha o pop up de cadastrar novos clientes
const openModal = ()=> document.querySelector('#modal').classList.add('active');
const closeModal = () => {document.querySelector('#modal').classList.remove('active');
clearFields();
}


const tempClient = {
nome:'Gere',
email:'gere_cte@hotmail.com',
celular: '11 970728181',
cidade: 'São mateus'
};

const getLocalStorage = ()=> JSON.parse(localStorage.getItem('db_client')) ?? [] // aqui pega o valor do local storage. o ?? serve com um if se o comando anterior não for valido retorno um [] vazio
const setLocalStorage =(dbClient)=>  localStorage.setItem("db_client", JSON.stringify(dbClient)); // aqui inser o valor convertido para string no localStorange

const createClient = (client)=>{
    const dbClient = getLocalStorage();
    dbClient.push (client) // aqui pega os dados e insere  no final do db client
    setLocalStorage(dbClient);

  }
  const readClient=  () => getLocalStorage ();

  const updateClient = (index, client) =>{
    const dbClient = getLocalStorage();
    dbClient[index] = client;
    setLocalStorage (dbClient);
  }
const deleteClient= (index) =>{
  const dbClient = readClient();
 dbClient.splice(index, 1)
 setLocalStorage(dbClient);
}

const verificaCliente = () =>{
  return document.querySelector('#form').reportValidity(); // aqui verifica se todos os campos do formulários foram preenchidos
}

const clearFields = () =>{
  const fiedls = document.querySelectorAll('.modal-field');
  fiedls.forEach((valor)=>valor.value ='');                  //limpa os campors apos o preenchimento do form e quando cadastrar novo
}

const geraCliente = () =>{
  if(verificaCliente()){
    const obj = {
      nome: document.querySelector('#nome').value,
      email:document.querySelector('#email').value,   // cria o novo cliente pegando os inputs do formulário
      celular: document.querySelector('#celular').value,
      cidade: document.querySelector('#cidade').value
      }
      const index = document.querySelector('#nome').dataset.index;
      if(index === 'new'){
  clearFields();
  createClient(obj);
  updateTable();
      }    else{
        updateClient(index, obj)
        updateClient();
        closeModal();
        updateTable();
      }
}

}

const createRow = (client, index) =>{
  const newRow = document.createElement('tr')
  newRow.innerHTML = ` <td>${client.nome}</td>
  <td>${client.email}</td>
  <td>${client.celular}</td>
  <td>${client.cidade}</td>
  <td>
      <button type="button" class="button green" id = 'edit-${index}'>Editar</button>
      <button type="button" class="button red" id ='excluir-${index}'>Excluir</button>
  </td>`
document.querySelector('#tableClient>tbody').appendChild(newRow);
}

const updateTable = () =>{
  const dbClient = readClient();
  clearTable();
  dbClient.forEach(createRow);
  
}


const clearTable = () =>{
const rows = document.querySelectorAll('#tableClient>tbody tr');
rows.forEach((valor)=>valor.parentNode.removeChild (valor));
}

const editDelete = (evento) =>{
if(evento.target.type == 'button'){
const [action, index] = evento.target.id.split('-');
    if(action == 'edit'){
     editClient(index);
  } else{
    const client = readClient()[index]
    const response = confirm(`Deseja realmente excluir ${client.nome}`)
    if(response) {
      deleteClient()
      updateTable()
    }
  }

}
}

const editClient = (index) =>{
  const client= readClient() [index]
 client.index = index;
  preencherModal(client);
  openModal();

}

const preencherModal = (client) =>{
document.querySelector('#nome').value= client.nome;
document.querySelector('#email').value= client.email;
document.querySelector('#celular').value= client.celular;
document.querySelector('#cidade').value= client.cidade;
document.querySelector('#nome').dataset.index=client.index;
openModal();
}
updateTable();

document.querySelector("#salvar").addEventListener('click', geraCliente)
document.querySelector('#cadastrarCliente').addEventListener('click', openModal);
document.querySelector('#modalClose').addEventListener('click', closeModal);
document.querySelector('#cancelar').addEventListener('click', closeModal);
document.querySelector('#tableClient>tbody').addEventListener('click', editDelete);