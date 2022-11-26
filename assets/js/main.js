const pokemonList = document.getElementById('pokemonList')
const loadMore = document.getElementById('loadMore')
const limit = 10
const maxRecord = 151
let offset = 0

// function convertPokemonToLi(pokemon) {
//     return ` <li class="pokemon ${pokemon.type}">
//         <span class="number">#${pokemon.number}</span>
//         <span class="name">${pokemon.name}</span>
//         <div class="detail">
//             <ol class="types">
//                 ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
//             </ol>
//             <img src="${pokemon.photo}"
//             alt="${pokemon.name}">
//     </div>
// </li>`}

// pokeApi.getPokemons().then((pokemons = []) => {
//     pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
// })

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"alt="${pokemon.name}">
                        
                </div>
            </li>`).join('')
            pokemonList.innerHTML += newHtml
        })
}

loadPokemonItens(offset, limit)

loadMore.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecord){
        const newLimit = maxRecord - offset
        
        loadPokemonItens(offset, newLimit)
        

        loadMore.parentElement.removeChild(loadMore)
    }else{
        loadPokemonItens(offset, limit)
    }
})