/* DECLARO LAS CONSTANTES PARA GUARDAR LA INFORMACION DE LA API Y CDA UNA DE LAS
ETIQUETAS DE HTML EN LAS QUE QUIERO IMPRIMIR LA INFORMACION QUE ME ARROJE LA API */

const api_key = 'c29198fdf84d90b02c53b759d2ffa2b1', //API key
    // API MAPA
    map_api_key = 'AIzaSyD-wHLIGCNBrqNvblog3Ig55Upg4K2WQss',
    //Data API
    //url = 'https://openweathermap.org/api',
    //ELEMENTO CON BUSQUEDA DEL USUARIO (HEADER)
    inputElement = document.getElementById("busquedaUsuario"),
    //BOTON QUE DISPARA LA BUSQUEDA (HEADER)
    botonBusqueda = document.getElementById("botonBusqueda"),
    //ELEMENTO DONDE VOY A MOSTRAR EL NOMBRE DE LA CIUDAD QUE BUSCO EL USUARIO (MAIN)
    ciudadBuscada = document.getElementById("ciudadBuscada"),
    //ELEMENTO DONDE VOY A MOSTRAR LA CONDICION DEL CLIMA DE LA CIUDAD QUE BUSCO EL USUARIO (MAIN)
    condicionClima = document.getElementById("condicionClima"),
    //ELEMENTO DONDE VOY A MOSTRAR EL ICONO DE LA CONDICION DEL CLIMA DE LA CIUDAD QUE BUSCO EL USUARIO (MAIN)
    iconoClima = document.getElementById("iconoClima"),
    //ELEMENTO DONDE VOY A MOSTRAR LA TEMPERATURA DE LA CIUDAD QUE BUSCO EL USUARIO, EN EL MOMENTO QUE LA BUSCO (MAIN)
    temperaturaTiempoReal = document.getElementById("temperaturaTiempoReal"),
    // TEMPERATURA MAXIMA
    tempMax = document.getElementById("tempMax"),
    // TEMPERATURA MINIMA
    tempMin = document.getElementById("tempMin"),
    // SENSACION TERMICA
    sensacionTermica = document.getElementById("sensacionTermica"),
    // PRESION ATMOSFERICA
    presionAtmosferica = document.getElementById("presionAtmosferica"),
    // HUMEDAD
    humedad = document.getElementById("humedad"),
    // VELOCIDAD DEL VIENTO
    velViento = document.getElementById("velViento"),
    // MAPA
    mapa = document.getElementById("map");
    console.log(mapa)

// ----------------------------------------------------------------------------------------

/* LE DOY FUNCIONALIDAD AL BOTON PARA QUE DISPARE LA CONSULTA A LA API DEL CLIMA*/
    botonBusqueda.addEventListener("click", () => {
        buscarCiudad(inputElement.value);
    })

// FUNCION buscarCiudad CON LA QUE VOY A CONSUMIR LA API
function buscarCiudad(nombreCiudad){

    // MUESTRO EN CONSOLA LA CIUDAD QUE INGRESO EL USUARIO
    console.log('ciudad_consultada: ', nombreCiudad);

    // LLAMO A LA API
    const fetchPromise = fetch('https://api.openweathermap.org/data/2.5/weather?q='+ inputElement.value + '&appid='+ api_key + '&lang=Es&units=metric')

    // PROMESA
    fetchPromise.then(Response => {

        // MUESTRO EN CONSOLA LA RESPUESTA DE LA CONSULTA, SI ES EXITOSO PIDO QUE ME RETORNE LA INFORMACION EN UN JSON
        console.log('respuesta_api: ', Response);
        return Response.json();

        // ENTONCES MUESTRO EN LA CONSOLA EL JSON CON LA INFORMACION REQUERIDA DE LA CIUDAD BUSCADA
    }).then(resultado_consulta => {
        console.log('Informacion que arroja la API: ', resultado_consulta);

        // Y CONVOCO A LA FUNCION MOSTRAR PARA INTRODUCIR LA INFORMACION EN EL HTML
        mostrar(resultado_consulta);

        // SI HAY ERROR, SE INFORMA EN LA CONSOLA
    }).catch(err => {
        console.log('Falló la búsqueda', err);
        })
}

// FUNCION MOSTRAR: SE USA PARA INTRODUCIR EN EL HTML LOS DATOS OBTENIDOS, EN CADA ELEMENTO QUE GUARDE EN LAS CONSTANTES AL INICIO DE ESTE CODIGO.

function mostrar (resultado_consulta){
    // GUARDO EN UNA VARIABLE NUEVA, PARA CADA DATO QUE QUIERO MOSTRAR EN EL HTML, EL DATO QUE ME ARROJO LA API PARA ESTE CAMPO.
    // ESTO LO HAGO PARA, MAS ADELANTE, PODER GUARDAR ESTOS DATOS EN LOCAL STORAGE
    var nombre_ciudad = resultado_consulta.name;
    console.log(nombre_ciudad);
    var descripcion_clima = resultado_consulta.weather[0].description;
    console.log(descripcion_clima);
    var icono_clima = resultado_consulta.weather[0].icon;
    console.log(icono_clima);
    var temperatura_hoy = resultado_consulta.main.temp;
    console.log(temperatura_hoy);
    var temperatura_maxima = resultado_consulta.main.temp_max;
    console.log(temperatura_maxima);
    var temperatura_minima = resultado_consulta.main.temp_min;
    console.log(temperatura_minima);
    var sens_termica = resultado_consulta.main.feels_like;
    console.log(sens_termica);
    var pres_atmosferica = resultado_consulta.main.humidity;
    console.log(pres_atmosferica);
    var humedad_api = resultado_consulta.main.humidity;
    console.log(humedad_api);
    var velocidad_viento = parseInt(resultado_consulta.wind.speed * 3.6);
    console.log(velocidad_viento);


    // MUESTRO PARA CADA DATO REQUERIDO, EL RESULTADO QUE ME ARROJO LA API
    ciudadBuscada.innerHTML = nombre_ciudad;
    condicionClima.innerHTML = descripcion_clima;
    iconoClima.src = `http://openweathermap.org/img/wn/${icono_clima}@2x.png`;
    iconoClima.alt = descripcion_clima;
    temperaturaTiempoReal.innerHTML = temperatura_hoy + '°';
    tempMax.innerHTML = temperatura_maxima + '°';
    tempMin.innerHTML = temperatura_minima + '°';
    sensacionTermica.innerHTML = sens_termica + '°';
    presionAtmosferica.innerHTML = pres_atmosferica + ' hp';
    humedad.innerHTML = humedad_api + ' %';
    velViento.innerHTML = velocidad_viento + ' km/h';
    mapa.src= "https://www.google.com/maps/embed/v1/place?key=" + map_api_key + "&q=" + nombre_ciudad;


    // LOCAL STORAGE
    // CREO UN OBJETO CON TODOS LOS DATOS QUE INFORMA EL SITIO
      var datosUltimaConsulta = {
          "ciudad": nombre_ciudad,
          "descripcion": descripcion_clima,
          "icono": `http://openweathermap.org/img/wn/${icono_clima}@2x.png`,
          "temperaturaMomentoConsulta": temperatura_hoy,
          "temperaturaMaxima": temperatura_maxima,
          "temperaturaMinima": temperatura_minima,
          "sensasionTermica": sens_termica,
          "humedad": humedad_api,
          "presionAtmosferica": pres_atmosferica,
          "velocidadDelViento": velocidad_viento,
        };

    // GUARDO EN LOCAL STORAGE CON LA CLAVE QUE INDIQUE QUE SE GUARDA Y CON LOS DATOS DE LA ULTIMA CONSULTA REALIZADA
    localStorage.setItem('ultima_ciudad_buscada', JSON.stringify(datosUltimaConsulta));
}
window.onload = function () {
        var recupero_ultima_consulta = JSON.parse(localStorage.getItem('ultima_ciudad_buscada'));
        console.log(recupero_ultima_consulta);
        ciudadBuscada.innerHTML = recupero_ultima_consulta.ciudad;
        condicionClima.innerHTML = recupero_ultima_consulta.descripcion;
        iconoClima.src = recupero_ultima_consulta.icono;
        temperaturaTiempoReal.innerHTML = recupero_ultima_consulta.temperaturaMomentoConsulta + '°';
        tempMax.innerHTML = recupero_ultima_consulta.temperaturaMaxima + '°';
        tempMin.innerHTML = recupero_ultima_consulta.temperaturaMinima + '°';
        sensacionTermica.innerHTML = recupero_ultima_consulta.sensasionTermica + '°';
        presionAtmosferica.innerHTML = recupero_ultima_consulta.presionAtmosferica + ' hp';
        humedad.innerHTML = recupero_ultima_consulta.humedad + ' %';
        velViento.innerHTML = recupero_ultima_consulta.velocidadDelViento + ' km/h';
        mapa.src= "https://www.google.com/maps/embed/v1/place?key=" + map_api_key + "&q=" + recupero_ultima_consulta.ciudad;
}