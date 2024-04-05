let participantes = [
   {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: new Date(2024, 2, 25, 20, 20)
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 3, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2023, 11, 4, 19, 23),
    dataCheckIn: new Date(2023, 11, 5, 20, 20)
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2023, 10, 5, 19, 23),
    dataCheckIn: new Date(2023, 10, 6, 20, 20)
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2023, 9, 6, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Carla Lima",
    email: "carla@gmail.com",
    dataInscricao: new Date(2023, 8, 7, 19, 23),
    dataCheckIn: new Date(2023, 8, 8, 20, 20)
  },
  {
    nome: "Lucas Sousa",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2023, 7, 8, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Paula Costa",
    email: "paula@gmail.com",
    dataInscricao: new Date(2023, 6, 9, 19, 23),
    dataCheckIn: new Date(2023, 6, 10, 20, 20)
  },
  {
    nome: "Gabriel Almeida",
    email: "gabriel@gmail.com",
    dataInscricao: new Date(2023, 5, 10, 19, 23),
    dataCheckIn: new Date(2023, 5, 11, 20, 20)
  }
]

const criarNovoParticipante = (participante) =>{
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);
  //${participante.nome} - Interpolação, dar pra usar quando se usa o crase
  
  if(participante.dataCheckIn == null){
    dataCheckIn = `
      <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
        Confirmar check-in
      </button>
    `
  }
  return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>${participante.email}</small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document.querySelector('tbody').innerHTML = output
}
atualizarLista(participantes)

const adicionarParticipante = (event) =>{
  //Utilizado para não fazer a rotina padrão do botão de realizar inscrição que dentro de 
  // um formulário, ele envia os dados para algum lugar;
  event.preventDefault();

  const dadosFormulario = new FormData(event.target)
  const participante = {
    nome: dadosFormulario.get('nome'),
    email: dadosFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }
  //Verificar se o participante já existe 

  const participanteExiste = participantes.find(
    (p) => {
    return p.email == participante.email
  }
  )
  if(participanteExiste){
    //Limpar formulário 
    event.target.querySelector('[name="nome"]').value = "";
    event.target.querySelector('[name="email"]').value = "";
    alert('Emial já cadastrado')
    return
  }
  //... Utilizando o spread para espalhar os antigos registros do array participantes junto com os nosos dados que incluir. 

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //Limpar formulário 
  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[name="email"]').value = "";
  
}

const fazerCheckIn = (event) => {
  //Confirmar se realemnte quer fazer o checkin 
  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?";

  if(confirm(mensagemConfirmacao) ==  false){
    return 
  }

  //Encontrar o particpante dentro da lista 
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  //atualizar o checkin do participante 
  participante.dataCheckIn =  new Date();
  //atualziar a lista de particpantes
  atualizarLista(participantes)
}