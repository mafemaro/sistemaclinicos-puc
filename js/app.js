// inicializa banco de dados local
function inicializarBanco() {
    const temUsuarios = localStorage.getItem('usuarios');

    if (!temUsuarios) {
        const usuariosIniciais = [
            { id: 1, nome: "Admin Sistema", email: "admin@puc.br", senha: "123", role: "admin" },
            { id: 2, nome: "Juliana Psicóloga", email: "psicologa@puc.br", senha: "123", role: "medico" },
            { id: 3, nome: "Recepção Central", email: "recepcao@puc.br", senha: "123", role: "recepcao" },
            { id: 4, nome: "Sofia Estagiária", email: "estagiaria@puc.br", senha: "123", role: "estagiaria" }
        ];
        localStorage.setItem('usuarios', JSON.stringify(usuariosIniciais));
    }

    const temConsultas = localStorage.getItem('consultas');

    if (!temConsultas) {
        const hoje = new Date();
        const dd = String(hoje.getDate()).padStart(2, '0');
        const mm = String(hoje.getMonth() + 1).padStart(2, '0');
        const aaaa = hoje.getFullYear();
        const dataHoje = `${dd}/${mm}/${aaaa}`;

        const consultasIniciais = [
            { id: 1, paciente: "Ana Beatriz Sousa", data: dataHoje, horario: "08:00", profissional: "Juliana (Psicologia)", status: "aguardando", pacienteId: 10 },
            { id: 2, paciente: "Carlos Eduardo Lima", data: dataHoje, horario: "09:00", profissional: "Juliana (Psicologia)", status: "presente", pacienteId: 11 },
            { id: 3, paciente: "João Pedro Silva", data: dataHoje, horario: "10:30", profissional: "Juliana (Psicologia)", status: "aguardando", pacienteId: 12 },
            { id: 4, paciente: "Mariana Costa", data: dataHoje, horario: "11:00", profissional: "Roberto (Psiquiatria)", status: "presente", pacienteId: 13 },
            { id: 5, paciente: "Fernanda Rocha", data: dataHoje, horario: "14:00", profissional: "Roberto (Psiquiatria)", status: "aguardando", pacienteId: 14 },
            { id: 6, paciente: "Lucas Mendes", data: dataHoje, horario: "15:30", profissional: "Juliana (Psicologia)", status: "aguardando", pacienteId: 15 }
        ];
        localStorage.setItem('consultas', JSON.stringify(consultasIniciais));
    }
}

// busca usuarios
function obterUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

// salva usuarios
function salvarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// busca consultas
function obterConsultas() {
    return JSON.parse(localStorage.getItem('consultas') || '[]');
}

// salva consultas
function salvarConsultas(consultas) {
    localStorage.setItem('consultas', JSON.stringify(consultas));
}

// busca registros de estagio
function obterRegistrosEstagio() {
    return JSON.parse(localStorage.getItem('registrosEstagio') || '[]');
}

// salva registros de estagio
function salvarRegistrosEstagio(registros) {
    localStorage.setItem('registrosEstagio', JSON.stringify(registros));
}

// calcula horas entre dois horarios
function calcularHoras(inicio, fim) {
    if (!inicio || !fim) return 0;
    const [hInicio, mInicio] = inicio.split(':').map(Number);
    const [hFim, mFim] = fim.split(':').map(Number);
    const totalMinutos = (hFim * 60 + mFim) - (hInicio * 60 + mInicio);
    if (totalMinutos <= 0) return 0;
    return parseFloat((totalMinutos / 60).toFixed(1));
}

// converte data iso para dd/mm/aaaa
function formatarData(dataISO) {
    if (!dataISO) return '';
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}

// converte dd/mm/aaaa para data iso
function dataParaISO(dataBR) {
    if (!dataBR) return '';
    const [dia, mes, ano] = dataBR.split('/');
    return `${ano}-${mes}-${dia}`;
}

// exibe notificacao
function mostrarToast(mensagem, tipo) {
    const existente = document.getElementById('toast-ativo');
    if (existente) existente.remove();

    const toast = document.createElement('div');
    toast.id = 'toast-ativo';
    toast.className = `toast ${tipo}`;

    const icone = tipo === 'sucesso' ? '✓' : '✕';
    toast.innerHTML = `<strong>${icone}</strong> ${mensagem}`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// abre modal de confirmacao de logout
function sair() {
    const existente = document.getElementById('modal-logout-temp');
    if (existente) return;

    const fundo = document.createElement('div');
    fundo.className = 'modal-fundo';
    fundo.id = 'modal-logout-temp';
    fundo.innerHTML = `
        <div class="modal-caixa" style="max-width: 380px;">
            <div class="modal-corpo" style="text-align: center;">
                <div style="width:56px;height:56px;background:var(--azul-claro);border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:24px;color:var(--azul-primario);">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </div>
                <h2 style="margin-bottom:8px;">Sair do sistema?</h2>
                <p style="color:var(--cinza);font-size:15px;margin-bottom:28px;">Você será redirecionado para a página inicial.</p>
                <div style="display:flex;gap:12px;">
                    <button class="btn btn-vazado" style="flex:1;" onclick="document.getElementById('modal-logout-temp').remove()">Cancelar</button>
                    <button class="btn" style="flex:1;" onclick="confirmarSaida()">Sair</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(fundo);
}

// executa saida
function confirmarSaida() {
    sessionStorage.removeItem('usuarioLogado');
    const emSubpagina = window.location.pathname.includes('/pages/');
    window.location.href = emSubpagina ? '../index.html' : 'index.html';
}

// carrega cabecalho padrao
function carregarCabecalho() {
    const dadosSessao = sessionStorage.getItem('usuarioLogado');
    const usuario = JSON.parse(dadosSessao);

    if (!usuario) {
        const emSubpagina = window.location.pathname.includes('/pages/');
        window.location.href = emSubpagina ? '../index.html' : 'index.html';
        return;
    }

    const elementoNome = document.getElementById('nome-usuario');
    const elementoAvatar = document.getElementById('avatar-letra');

    if (elementoNome) elementoNome.innerText = `Olá, ${usuario.nome.split(' ')[0]}`;
    if (elementoAvatar) elementoAvatar.innerText = usuario.nome.charAt(0).toUpperCase();
}

// retorna data de hoje em dd/mm/aaaa
function obterDataHoje() {
    const hoje = new Date();
    const dd = String(hoje.getDate()).padStart(2, '0');
    const mm = String(hoje.getMonth() + 1).padStart(2, '0');
    const aaaa = hoje.getFullYear();
    return `${dd}/${mm}/${aaaa}`;
}

// verifica acesso por perfil e redireciona se necessario
function verificarAcesso(role) {
    const dadosSessao = sessionStorage.getItem('usuarioLogado');
    if (!dadosSessao) {
        window.location.href = '../index.html';
        return false;
    }
    const usuario = JSON.parse(dadosSessao);
    if (usuario.role !== role) {
        window.location.href = '../index.html';
        return false;
    }
    return true;
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
