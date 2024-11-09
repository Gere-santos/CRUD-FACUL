// Função para buscar e exibir os clientes
const fetchClients = async () => {
    try {
        const response = await axios.get('http://localhost:8800/'); // Ajuste a URL conforme necessário
        const clients = response.data;
        updateTable(clients); // Atualiza a tabela com os dados recebidos
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
    }
};

// Função para criar um novo cliente
const createClient = async () => {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('celular').value.trim();
    const cidade = document.getElementById('cidade').value.trim();

    const newClient = { nome, email, telefone, cidade };

    try {
        const response = await axios.post('http://localhost:8800/', newClient); // Envia os dados do novo cliente
        console.log('Cliente criado com sucesso:', response.data);

        fetchClients(); // Atualiza a lista de clientes
        document.getElementById('form').reset(); // Limpa o formulário
        closeModal(); // Fecha o modal
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
    }
};

// Função para atualizar a tabela de clientes
const updateTable = (clients) => {
    const tableBody = document.querySelector('#tableClient tbody');
    tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

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

// Função para abrir o modal
const openModal = () => {
    document.getElementById('modal').classList.add('active');
    document.getElementById('form').reset(); // Limpa o formulário
   // document.getElementById('nome').dataset.index = 'new123'; // Define que estamos criando um novo cliente
};

// Função para fechar o modal
const closeModal = () => {
    document.getElementById('modal').classList.remove('active');
};

// Função para editar um cliente
const editClient = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8800/${id}`); // Busca o cliente pelo ID
        const client = response.data;

        // Preenche os campos do formulário com os dados do cliente
      
        console.log('Cliente render modal com sucesso!!!' + id);
        // Armazena o ID do cliente para a atualização
        document.getElementById('nome').dataset.index = id;

        openModal(); // Abre o modal com os dados preenchidos
        document.getElementById('nome').value = client.nome;
        document.getElementById('email').value = client.email;
        document.getElementById('celular').value = client.telefone;
        document.getElementById('cidade').value = client.cidade;
        
        
    } catch (error) {
        console.error('Erro ao buscar dados do cliente para edição:', error);
    }
};

// Função para atualizar um cliente
const updateClient = async () => {
    const id = document.getElementById('nome').dataset.index; // Obtém o ID do cliente a ser atualizado
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('celular').value.trim();
    const cidade = document.getElementById('cidade').value.trim();

    const updatedClient = { nome, email, telefone, cidade };

    try {
        await axios.get(`http://localhost:8800/${id}`); // Busca o cliente pelo ID
        await axios.put(`http://localhost:8800/${id}`, updatedClient); // Atualiza o cliente na API
        console.log('Cliente atualizado com sucesso!645465' + id );

        fetchClients(); // Atualiza a lista de clientes
        closeModal(); // Fecha o modal
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
    }
};

// Função para excluir um cliente
const deleteClient = async (id) => {
    if (confirm("Tem certeza que deseja excluir este cliente?")) { // Confirmação antes da exclusão
        try {
            await axios.delete(`http://localhost:8800/${id}`); // Envia a requisição DELETE
            console.log('Cliente excluído com sucesso!');

            fetchClients(); // Atualiza a lista de clientes após a exclusão
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
        }
    }
};



// Eventos para abrir e fechar o modal
document.getElementById('cadastrarCliente').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('cancelar').addEventListener('click', closeModal);

// Evento para salvar novo cliente
document.getElementById('salvar').addEventListener('click', (event) => {
    event.preventDefault();
    createClient(); // Cria um novo cliente
});


// Evento para atualizar cliente
document.getElementById('atualizar').addEventListener('click', (event) => {
    event.preventDefault();
    updateClient(); // Atualiza um cliente existente
});

// Carrega os clientes ao iniciar a página
document.addEventListener('DOMContentLoaded', fetchClients);
