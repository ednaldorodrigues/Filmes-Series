const apiKey = '558887b3'
const btn = document.querySelector('#btn')
const filmes = document.querySelector('#filmes')
const input = document.querySelector('#input')
const titulo = document.querySelector('#titulo')
const erro = document.querySelector('#erro')
const ajuda = document.querySelector('#ajuda')
const container = document.querySelector('#container')



function animation(element) {
    const textoTitulo = element.innerHTML.split('')
    element.innerHTML = ''
    textoTitulo.forEach((letra, i) => {
        setTimeout(() => {
            element.innerHTML += letra
        }, 75 * i)
    })
}
animation(titulo);



function pesquisa(e) {
    filmes.innerHTML = ''
    erro.innerHTML = ''
    e.preventDefault()

    fetch(`https://omdbapi.com/?apikey=${apiKey}&s=${input.value.toLowerCase()}`)
    .then(r => r.json()
    .then(json => {
        const poster = []
        json.Search.forEach(filme => {
            if(filme.Poster !== "N/A") {
                poster.push(filme)
            }
        })
        
        poster.forEach(filme =>  {
            filmes.innerHTML += `
        <div class= "bg">
            <img src="${filme.Poster}" alt="">
            <p>${filme.Title}</p>
        </div>`
        })
        
        }).catch(() => {
        erro.innerHTML = `Resultado para "${input.value}" não encontrado`;
    }))
    
}

function help() {
    ajuda.classList.add('ajuda')
    ajuda.innerHTML = 'Atenção !!! Por favor, pesquise o nome do seu filme ou série em inglês.'
}

function limpaHelp(event) {
    if(event.target !== input || event.keyCode === 13) {
    ajuda.classList.remove('ajuda')
    ajuda.innerHTML = ''
    }

}

container.addEventListener('click', limpaHelp);
input.addEventListener('click', help);
btn.addEventListener('click', pesquisa);
input.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        pesquisa(event);
        limpaHelp(event);
    }
});