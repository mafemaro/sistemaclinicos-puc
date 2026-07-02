// abre modal dinamico
function abrirModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('oculto');
}

// fecha modal dinamico
function fecharModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add('oculto');
    
    // reseta forms
    const forms = document.querySelectorAll('form');
    forms.forEach((formulario) => {
        formulario.reset();
    });
    
    const grupoCpf = document.getElementById('grupo-cpf');
    if (grupoCpf) {
        grupoCpf.classList.remove('com-erro');
    }
}

// realiza cadastro paciente
function registrarPaciente(evento) {
    evento.preventDefault();
    
    const nome = document.getElementById('cad-nome').value;
    const cpf = document.getElementById('cad-cpf').value;
    const tel = document.getElementById('cad-tel').value;
    const email = document.getElementById('cad-email').value;

    const caixaForm = document.getElementById('form-cadastro-caixa');
    const caixaLoading = document.getElementById('loading-cadastro');
    
    caixaForm.classList.add('oculto');
    caixaLoading.classList.remove('oculto');

    setTimeout(() => {
        caixaLoading.classList.add('oculto');
        
        const stringUsuarios = localStorage.getItem('usuarios') || '[]';
        let usuarios = JSON.parse(stringUsuarios);
        
        const cpfExiste = usuarios.some((usuario) => {
            return usuario.cpf === cpf;
        });

        if (cpfExiste) {
            caixaForm.classList.remove('oculto');
            document.getElementById('grupo-cpf').classList.add('com-erro');
            return;
        }

        const novoPaciente = { 
            id: Date.now(), 
            nome: nome, 
            cpf: cpf, 
            telefone: tel, 
            email: email, 
            role: 'paciente' 
        };
        
        usuarios.push(novoPaciente);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        // cria consulta fake para popular dashboard do paciente
        const stringConsultas = localStorage.getItem('consultas') || '[]';
        let consultas = JSON.parse(stringConsultas);
        
        const novaConsulta = { 
            id: Date.now(), 
            paciente: nome, 
            data: "05/07/2026", 
            horario: "09:00", 
            profissional: "Juliana (Psicologia)", 
            status: "aguardando", 
            pacienteId: novoPaciente.id 
        };
        
        consultas.push(novaConsulta);
        localStorage.setItem('consultas', JSON.stringify(consultas));

        document.getElementById('sucesso-cadastro').classList.remove('oculto');
    }, 1500);
}

// redireciona apos sucesso
function irParaLoginPaciente() {
    fecharModal('modal-cadastro');
    abrirModal('modal-login-paciente');
}

// login pacientes
function loginPaciente(evento) {
    evento.preventDefault();
    
    const cpf = document.getElementById('log-cpf-paciente').value;
    const stringUsuarios = localStorage.getItem('usuarios') || '[]';
    const usuarios = JSON.parse(stringUsuarios);
    
    const paciente = usuarios.find((usuario) => {
        return usuario.cpf === cpf && usuario.role === 'paciente';
    });

    if (paciente) {
        sessionStorage.setItem('usuarioLogado', JSON.stringify(paciente));
        window.location.href = 'pages/paciente.html';
    } else {
        mostrarToast("CPF não encontrado.", "erro");
    }
}

// login funcionarios
function fazerLogin(evento) {
    evento.preventDefault();
    
    const email = document.getElementById('log-email').value;
    const senha = document.getElementById('log-senha').value;
    const radioSelecionado = document.querySelector('input[name="role"]:checked');
    const role = radioSelecionado.value;

    const stringUsuarios = localStorage.getItem('usuarios') || '[]';
    const usuarios = JSON.parse(stringUsuarios);
    
    const usuario = usuarios.find((u) => {
        return u.email === email && u.senha === senha && u.role === role;
    });

    if (usuario) {
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        
        if (role === 'admin') {
            window.location.href = 'pages/admin.html';
        }
        if (role === 'recepcao') {
            window.location.href = 'pages/recepcao.html';
        }
        if (role === 'medico') {
            window.location.href = 'pages/medico.html';
        }
    } else {
        mostrarToast("Credenciais ou perfil incorretos.", "erro");
    }
}