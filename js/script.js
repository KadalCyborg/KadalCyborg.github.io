const pokemonName = document.querySelector('.pokemonName__');
const pokemonNumber = document.querySelector('.pokemonNumber__');
const pokemonImage = document.querySelector('.pokemonImage__');

const form = document.querySelector('.form__');
const input = document.querySelector('.inputSearch__')
const prevBtn = document.querySelector('.prevBtn__')
const nextBtn = document.querySelector('.nextBtn__')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (response.status === 200) {
        const data = await response.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        searchPokemon = data.id;
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = "#"+data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = '';
    } else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Pokemon Not Found :('
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

prevBtn.addEventListener('click', ()=>{
    if(searchPokemon>1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
})

nextBtn.addEventListener('click', ()=>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon)