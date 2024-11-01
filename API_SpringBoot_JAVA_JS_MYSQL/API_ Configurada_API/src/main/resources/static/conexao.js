document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita o envio do formulário

        // Captura os valores dos campos do formulário
        const nome = document.querySelector("input[name='nome']").value;
        const login = document.querySelector("input[name='login']").value; // Campo de login
        const senha = document.querySelector("input[name='senha']").value;
        const email = document.querySelector("input[name='email']").value;

        // Cria um objeto com os dados do formulário
        const formData = {
            nome: nome,
            login: login, // Ajuste o nome do campo para "login"
            senha: senha,
            email: email,
        };

        async function cadastra(formData) {
            try {
                const response = await fetch("http://localhost:8080/usuario", { // Ajuste o URL conforme necessário
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }

                return await response.json();
            } catch (error) {
                console.error('Erro ao realizar a requisição:', error);
            }
        }

        function limpar() {
            document.querySelector("input[name='nome']").value = '';
            document.querySelector("input[name='login']").value = ''; // Limpa o campo de login
            document.querySelector("input[name='senha']").value = '';
            document.querySelector("input[name='email']").value = '';
           
            
        }

        // Chama a função para enviar os dados e limpa o formulário após o cadastro
        cadastra(formData)
            .then(response => {
                // Lida com a resposta da API
                console.log("Resposta da API:", response);
                alert("Cadastro realizado com sucesso!");
                limpar(); // Limpa o formulário após o sucesso
            })
            .catch(error => {
                console.error('Erro ao realizar o cadastro:', error);
                alert("Erro ao realizar o cadastro. Tente novamente.");
            });

        // Log dos dados para verificação
        console.log("Nome: " + nome);
        console.log("Login: " + login); // Log do campo de login
        console.log("Senha: " + senha);
        console.log("Email: " + email);
    });
});
