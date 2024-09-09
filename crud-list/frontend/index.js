

const fetchClients = async () => {
    try {
        const response = await axios.get('http://localhost:8800/');
        const clients = response.data;
        updateTable(clients);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
    }
};

const createClient = async () => {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('celular').value;
    const cidade = document.getElementById('cidade').value;

    const newClient = { nome, email, telefone, cidade };

    try {
        const response = await axios.post('http://localhost:8800/', newClient);
        console.log('Cliente criado com sucesso:', response.data);

        fetchClients();
        document.getElementById('form').reset();
        closeModal();
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
    }
};

const updateTable = (clients) => {
    const tableBody = document.querySelector('#tableClient tbody');
    tableBody.innerHTML = ''; 

    clients.forEach(client => {
        const row = `
            <tr>
                <td>${client.nome}</td>
                <td>${client.email}</td>
                <td>${client.telefone}</td>
                <td>${client.cidade}</td>
                <td>
                    <button class="button green" onclick="editClient(${client.id})">Editar</button>
                    <button class="button red" onclick="deleteClient(${client.id})">Excluir</button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
};

const openModal = () => {
    document.getElementById('modal').classList.add('active');
    document.getElementById('nome').dataset.index = 'new'; // Novo cliente
    document.getElementById('form').reset(); // Limpa o formulário
};

const closeModal = () => {
    document.getElementById('modal').classList.remove('active');
};

document.getElementById('cadastrarCliente').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('cancelar').addEventListener('click', closeModal);

document.getElementById('salvar').addEventListener('click', (event) => {
    event.preventDefault();
    createClient();
});

document.addEventListener('DOMContentLoaded', fetchClients);