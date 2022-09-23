let formulario = document.querySelector('form');

formulario.addEventListener('submit', function(e) {
    //bloqueia o refresh da pagina
    e.preventDefault()

    //url da pesquisa(api)
    let urlForm = 'https://pokeapi.co/api/v2/pokemon/'

    //valor do input name
    let nome = document.getElementById('name')

    //contatena a url com o input name
    urlForm = urlForm + this.name.value

    //transforma os valores em minusculas
    urlForm = urlForm.toLocaleLowerCase()

    //id content
    let resposta = document.getElementById('content')

    //id imgPokemon
    let imagem = document.getElementById('imgPokemon')

    //resposta em html
    let html = ''

    fetch(urlForm)
        .then(resposta => resposta.json())
        .then(function (data) {
            console.log(data)

            //importando o nome e tipo do pokemon
            html = 'Nome: ' + maiuscula(data.name) + '<br>'
            html = html + 'Tipo: ' + maiuscula(data.types[0].type.name) + '<br>'
            html = html + 'Peso: ' + data.weight + 'Kg'
            resposta.innerHTML = html

            //importando as imagens do pokemon
            imagem.innerHTML = "<img src='" + data.sprites.front_default + "'> <img src='"+ data.sprites.back_default + "'>"
        })
        //avisando caso o pokemon não exista ou de outro tipo de erro
        .catch(function (err) {
            if(err == 'SyntaxError: Unexpected token N in JSON at position 0') {
                html = 'Pokemon não encontrado :(';
                imagem.innerHTML = ''
            } else {
                html = err
            }
            resposta.innerHTML = html
        })
})

//transforma a primeira letra do nome e tipo do pokemon em maiusculas
function maiuscula(val) {
    return val[0].toUpperCase() + val.substr(1)
}