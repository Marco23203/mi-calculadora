// Función para calcular la derivada
function calcularDerivada() {
    const entrada = document.getElementById("input").value;
    const variable = document.getElementById("variable").value;
    let resultadoDerivada;
  
    try {
      // Procesar la entrada sin simplificarla, pero asegurándonos que esté bien formateada
      const expr = math.parse(entrada.trim()); // Añadimos trim() para eliminar espacios extraños
  
      // Calculamos la derivada respecto a la variable
      const derivada = math.derivative(expr, variable).toString();
  
      // Mostrar el resultado de la derivada
      document.getElementById("resultadoDerivada").innerText = "Derivada: " + derivada;
    } catch (err) {
      // En caso de error, mostramos el mensaje de error
      document.getElementById("resultadoDerivada").innerText = "Error: " + err.message;
    }
  }
  