/* acoes do inicio */
function abrir() {
    const tela = document.getElementById('fundo');
    tela.classList.remove('oculto');
    tela.style.opacity = '0';
    setTimeout(() => {
        tela.style.opacity = '1';
        tela.style.transition = 'opacity 0.3s ease';
    }, 10);
    limpar();
}

function fechar() {
    const tela = document.getElementById('fundo');
    tela.style.opacity = '0';
    setTimeout(() => {
        tela.classList.add('oculto');
    }, 300);
}

function irAgenda() {
    fechar();
    setTimeout(() => {
        document.getElementById('inicio').classList.add('oculto');
        document.getElementById('agenda').classList.remove('oculto');
        window.scrollTo(0, 0);
    }, 300);
}

/* resetar modal */
function limpar() {
    document.getElementById('form-caixa').classList.remove('oculto');
    document.getElementById('carregando').classList.add('oculto');
    document.getElementById('sucesso').classList.add('oculto');
    document.getElementById('caixa-cpf').classList.remove('com-erro');
    document.getElementById('form-dados').reset();
}

/* regra de negocio */
function salvar(evento) {
    evento.preventDefault();

    const cpf = document.getElementById('cpf').value;
    const caixaCpf = document.getElementById('caixa-cpf');

    document.getElementById('form-caixa').classList.add('oculto');
    document.getElementById('carregando').classList.remove('oculto');

    setTimeout(() => {
        document.getElementById('carregando').classList.add('oculto');

        // Validacao do diagrama (Simulacao)
        if (cpf === '000') {
            document.getElementById('form-caixa').classList.remove('oculto');
            caixaCpf.classList.add('com-erro');
        } else {
            document.getElementById('sucesso').classList.remove('oculto');
        }
    }, 1800);
}