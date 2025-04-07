// Función para resolver derivadas e integrales
function resolver(tipo) {
  const entrada = document.getElementById("input").value;
  const variable = document.getElementById("variable").value; // Tomamos la variable de la entrada
  let resultado;

  try {
    // Parseamos la entrada sin simplificarla
    const expr = math.parse(entrada); 

    if (tipo === "derivada") {
      // Derivada simbólica utilizando math.js
      const derivada = math.derivative(expr, variable); // Derivada con respecto a la variable seleccionada
      resultado = derivada.toString();
    } else if (tipo === "integral") {
      // Integral indefinida simbólica utilizando math.js
      const integral = math.integral(expr, variable); // Integral con respecto a la variable seleccionada
      resultado = integral.toString();
    } else if (tipo === "integralDoble") {
      // Integral doble (integral respecto a x y luego respecto a y)
      const integralDoble = math.integral(math.integral(expr, 'x'), 'y');
      resultado = integralDoble.toString();
    } else if (tipo === "integralTriple") {
      // Integral triple (integral respecto a x, y, y luego respecto a z)
      const integralTriple = math.integral(math.integral(math.integral(expr, 'x'), 'y'), 'z');
      resultado = integralTriple.toString();
    }

    // Mostramos el resultado
    document.getElementById("resultado").innerText = resultado;
  } catch (err) {
    // Si ocurre un error, mostramos el mensaje
    document.getElementById("resultado").innerText = "Error: " + err.message;
  }
}

// Función para mostrar las instrucciones
function mostrarInstrucciones() {
  const instrucciones = document.getElementById("instrucciones");
  instrucciones.style.display = instrucciones.style.display === "none" ? "block" : "none";
}
