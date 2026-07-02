// inicializa banco de dados local
function inicializarBanco() {
    const temUsuarios = localStorage.getItem('usuarios');
    
    if (!temUsuarios) {
        const usuariosIniciais = [
            { id: 1, nome: "Admin Sistema", email: "admin@puc.br", senha: "123", role: "admin" },
            { id: 2, nome: "Juliana Psicóloga", email: "psicologa@puc.br", senha: "123", role: "medico" },
            { id: 3, nome: "Recepção Central", email: "recepcao@puc.br", senha: "123", role: "recepcao" }
        ];
        localStorage.setItem('usuarios', JSON.stringify(usuariosIniciais));
    }

    const temConsultas = localStorage.getItem('consultas');

    if (!temConsultas) {
        const consultasIniciais = [
            { id: 1, paciente: "Ana Beatriz Sousa", data: "02/07/2026", horario: "14:00", profissional: "Juliana (Psicologia)", status: "aguardando", pacienteId: 4 },
            { id: 2, paciente: "João Pedro Silva", data: "02/07/2026", horario: "15:30", profissional: "Carlos (Cardiologia)", status: "aguardando", pacienteId: 5 }
        ];
        localStorage.setItem('consultas', JSON.stringify(consultasIniciais));
    }
}

// exibe notificacao
function mostrarToast(mensagem, tipo) {
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerText = mensagem;
    
    document.body.appendChild(toast);
    
    setTimeout(() => { 
        toast.remove(); 
    }, 3000);
}

// realiza logout
function sair() {
    const confirmou = confirm("Deseja realmente sair?");
    
    if (confirmou) {
        sessionStorage.removeItem('usuarioLogado');
        window.location.href = '../index.html';
    }
}

// carrega cabecalho padrao
function carregarCabecalho() {
    const dadosSessao = sessionStorage.getItem('usuarioLogado');
    const usuario = JSON.parse(dadosSessao);
    
    if (!usuario) { 
        window.location.href = '../index.html'; 
        return; 
    }
    
    const elementoNome = document.getElementById('nome-usuario');
    const elementoAvatar = document.getElementById('avatar-letra');
    
    elementoNome.innerText = `Olá, ${usuario.nome}`;
    elementoAvatar.innerText = usuario.nome.charAt(0).toUpperCase();
}

// aplica mascara cpf
function mascaraCPF(input) {
    let valor = input.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = valor;
}

// aplica mascara telefone
function mascaraTelefone(input) {
    let valor = input.value.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    input.value = valor;
}

// executa ao carregar
document.addEventListener('DOMContentLoaded', inicializarBanco);