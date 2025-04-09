//  calcular la derivada
function calcularDerivada() {
    const entrada = document.getElementById("input").value;
    const variable = document.getElementById("variable").value;
    let resultadoDerivada;
  
    try {
    
      const expr = math.parse(entrada.trim());
      const derivada = math.derivative(expr, variable).toString();
      document.getElementById("resultadoDerivada").innerText = "Derivada: " + derivada;
    } catch (err) {
      document.getElementById("resultadoDerivada").innerText = "Error: " + err.message;
    }
  }
  
