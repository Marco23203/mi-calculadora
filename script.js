// Tu clave de API de WolframAlpha
const apiKey = "E9KHL6-T432HY429J";  // Tu clave real de API

// Función para resolver derivadas e integrales
function resolver(tipo) {
  const entrada = document.getElementById("input").value;
  let resultado;

  try {
    if (tipo === "derivada") {
      // Derivada simbólica utilizando math.js
      const expr = math.parse(entrada);
      const derivada = math.derivative(expr, 'x'); // Derivada con respecto a 'x'
      resultado = derivada.toString();
    } else if (tipo === "integral") {
      // Integral indefinida simbólica utilizando math.js
      const expr = math.parse(entrada);
      const integral = math.integral(expr, 'x'); // Integral con respecto a 'x'
      resultado = integral.toString();
    }

    document.getElementById("resultado").innerText = resultado;
  } catch (err) {
    document.getElementById("resultado").innerText = "Error: " + err.message;
  }
}

// Función para mostrar las instrucciones
function mostrarInstrucciones() {
  const instrucciones = document.getElementById("instrucciones");
  instrucciones.style.display = instrucciones.style.display === "none" ? "block" : "none";
}

// Función para consultar WolframAlpha
function consultarWolfram() {
  const consulta = document.getElementById("consulta").value;
  const url = `https://api.wolframalpha.com/v2/query?input=${encodeURIComponent(consulta)}&format=plaintext&output=JSON&appid=${apiKey}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const pods = data.queryresult.pods;
      if (pods && pods.length > 0) {
        const resultado = pods.map(pod => pod.subpods[0].plaintext).join('\n');
        document.getElementById("resultadoWolfram").innerText = resultado;
      } else {
        document.getElementById("resultadoWolfram").innerText = "No se pudo obtener un resultado.";
      }
    })
    .catch(error => {
      document.getElementById("resultadoWolfram").innerText = "Hubo un error al consultar WolframAlpha.";
      console.error(error);
    });
}
