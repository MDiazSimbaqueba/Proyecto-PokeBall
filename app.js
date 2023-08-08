const imgChange = document.querySelector('#img-change');
const searchInput = document.querySelector('#search-pokemon');
const pokemonsGlobal = [];
const pokemonGrid = document.querySelector('#pokemon-grid');


const cleanView = () => {
    pokemonGrid.innerHTML = '';
}

searchInput.addEventListener('keyup', () => {
    imgChange.onclick = function(){
    imgChange.style.zIndex = "-1";
    imgChange.src = "./assets/pokebolaabierta.png";
    imgChange.style.width = "390px";
    imgChange.style.padding = "60px";
    imgChange.style.margin = "0 0 0 750px";

    //Recargar página
    setTimeout(()=>{
        location.reload();
    }, "10000");
    }

    const inputValue = searchInput.value;
    // console.log(inputValue);
    let pokemonsGlobal2 = searchByName(inputValue);
    // console.log(pokemonsGlobal2);
    cleanView();
    renderPokemonCard(pokemonsGlobal2);
});
//.........................................................
const searchByName = (searchingParameter) => {
    const filteredPokemon = pokemonsGlobal.filter((pokemon)=> {
        if(pokemon.name.includes(searchingParameter)) {
            return pokemon
        }
    })
    return filteredPokemon
}

const getPokemons = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20');
    const responseJson = await response.json();
    const pokemons = responseJson.results;
    // console.log(pokemons);

    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        const pokemonUrl = pokemon.url;
        const response = await fetch(pokemonUrl);
        const responseJson = await response.json();
        normalizePokemons(responseJson, pokemon);
    }
    console.log(pokemonsGlobal);
    renderPokemonCard(pokemonsGlobal);
}

const normalizePokemons = (responseJson, pokemon) => {
    const img = responseJson.  
                    sprites.
                    other
                    ['official-artwork'].
                    front_default;
        const pokemonObject = {
            name: pokemon.name,
            img: img,
            stroke: responseJson.stats[1].base_stat,
            special: responseJson.stats[3].base_stat,
            defense: responseJson.stats[2].base_stat
        };
        pokemonsGlobal.push(pokemonObject);
}

const renderPokemonCard = (array) => {
    for(let i = 0; i < array.length; i++) {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList = 'pokemon-card';
        pokemonCard.innerHTML = `
        <h2>${array[i].name}</h2>
        <img
            src="${array[i].img}"
        />
        <h3>Ataque: ${array[i].stroke}</h3>
        <h3>Especial: ${array[i].special}</h3>
        <h3>Defensa: ${array[i].defense}</h3>`;
        pokemonGrid.appendChild(pokemonCard);
    }
}
getPokemons();