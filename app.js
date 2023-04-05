let pagina = 1;

const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if(pagina < 1000){
        pagina++;
        cargarPeliculas();
    }
})

btnAnterior.addEventListener('click', () => {
    if(pagina > 1){
        // console.log('hola')
        pagina--;
        cargarPeliculas();
    }
})

const cargarPeliculas = async()=>{
    try{
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=092ec7dbf1f73152445a3bc8280071bf&language=es-MX&page=${pagina}`);
        console.log(res);

        if (res.status === 200){
            const data = await res.json();
            console.log(data);

            let peliculas = '';
            data.results.forEach(pelicula => {
                console.log(pelicula.title);
                peliculas += 
                `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>
                `;

                document.getElementById('contenedor').innerHTML=peliculas;
            });

        }else if(res.status === 401){
            console.log('pusiste mal el id de la pelicula');
        }else if(res.status === 404){
            console.log('no se encontro la pelicula');
        }else{
            console.log('algo salio mal');
        }

    }catch(error){
        console.log(error);
    }
};

cargarPeliculas();