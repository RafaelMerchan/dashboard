import {tiempoArr, precipitacionArr, uvArr, temperaturaArr} from './static_data.js';

let fechaActual = () => new Date().toISOString().slice(0,10);

let cargarPrecipitacion = () => {

    //Obtenga la fecha actual
    let actual = fechaActual();

    //Defina un arreglo temporal vacío
    let datos = []

    //Itere en el arreglo tiempoArr para filtrar los valores de precipitacionArr que sean igual con la fecha actual
    for (let index = 0; index < tiempoArr.length; index++) {
        const tiempo = tiempoArr[index];
        const precipitacion = precipitacionArr[index]

        if(tiempo.includes(actual)) {
        datos.push(precipitacion)
        }
    }

    //Con los valores filtrados, obtenga los valores máximo, promedio y mínimo
    let max = Math.max(...datos)
    let min = Math.min(...datos)
    let sum = datos.reduce((a, b) => a + b, 0);
    let prom = (sum / datos.length) || 0;

    //Obtenga la referencia a los elementos HTML con id precipitacionMinValue, precipitacionPromValue y precipitacionMaxValue 
    let precipitacionMinValue = document.getElementById("precipitacionMinValue")
    let precipitacionPromValue = document.getElementById("precipitacionPromValue")
    let precipitacionMaxValue = document.getElementById("precipitacionMaxValue")

    //Actualice los elementos HTML con los valores correspondientes
    precipitacionMinValue.textContent = `Min ${min} [mm]`
    precipitacionPromValue.textContent = `Prom ${ Math.round(prom * 100) / 100 } [mm]`
    precipitacionMaxValue.textContent = `Max ${max} [mm]`


}

cargarPrecipitacion()

let cargarFechaActual = () => {

    //Obtenga la referencia al elemento h6
    let coleccionHTML = document.getElementsByTagName("h6")

    let tituloH6 = coleccionHTML[0]

    //Actualice la referencia al elemento h6 con el valor de la función fechaActual()
    tituloH6.textContent = fechaActual()

}

cargarFechaActual()
//URL que responde con la respuesta a cargar
//* Guayaquil -> */let URL = 'https://api.open-meteo.com/v1/forecast?latitude=-1.671&longitude=-78.6471&hourly=temperature_2m,relativehumidity_2m,precipitation_probability&daily=uv_index_max&timezone=auto'; 
/* New York -> */let URL = 'https://api.open-meteo.com/v1/forecast?latitude=25.7743&longitude=-80.1937&hourly=temperature_2m,relativehumidity_2m,precipitation_probability&daily=uv_index_max&timezone=auto'; 
//* Burbank -> */let URL = 'https://api.open-meteo.com/v1/forecast?latitude=34.1808&longitude=-118.309&hourly=temperature_2m,relativehumidity_2m,precipitation_probability&daily=uv_index_max&timezone=auto'; 

    let cargarOpenMeteo = () => {
    
    fetch( URL )
      .then(responseText => responseText.json())
      .then(responseJSON => {
        
        //Respuesta en formato JSON
    
        //Referencia al elemento con el identificador plot
        let plotRef = document.getElementById('plot1');

        let ciudad = responseJSON.timezone.slice(8);

        //Etiquetas del gráfico
        let labels = responseJSON.hourly.time;
    
        //Etiquetas de los datos
        let data = responseJSON.hourly.temperature_2m;
    
        //Objeto de configuración del gráfico
        let config = {
          type: 'line',
          data: {
            labels: labels, 
            datasets: [
              {
                label: 'Temperature [2m]',
                data: data, 
              }
            ]
          },
          options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Temperatura en ' + ciudad
                }
            }
        }
        };
    
        //Objeto con la instanciación del gráfico
        new Chart(plotRef, config);
    
      })
      .catch(console.error);
  
  }

   
  
  
  cargarPrecipitacion()
  cargarFechaActual()
  cargarOpenMeteo()

  let cargarOpenMeteo2 = () => {
  
    fetch( URL )
      .then(responseText => responseText.json())
      .then(responseJSON => {
        let plotRef = document.getElementById('plot2');
    
        //Etiquetas del gráfico
        let labels = responseJSON.hourly.time;
        
        let ciudad = responseJSON.timezone.slice(8);
    
        //Etiquetas de los datos
        let data = responseJSON.hourly.precipitation_probability;
    
        //Objeto de configuración del gráfico
        let config = {
          type: 'line',
          data: {
            labels: labels, 
            datasets: [
              {
                label: 'Precipitation Probability',
                data: data, 
              }
            ]
          },
          options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Probabilidad de Precipitación en ' + ciudad
                }
            }
        }
        };
    
        //Objeto con la instanciación del gráfico
        new Chart(plotRef, config);
        
    
      })
      .catch(console.error);

  }

  cargarOpenMeteo2()
