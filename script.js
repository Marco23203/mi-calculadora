function resolver(tipo) {
    const entrada = document.getElementById("input").value;
    let resultado;
  
    try {
      if (tipo === "derivada") {
        resultado = math.derivative(entrada, 'x').toString();
      } else if (tipo === "integral") {
        resultado = `Integral indefinida de ${entrada} dx (solo simbólica, no computa como Wolfram)`;
      }
  
      document.getElementById("resultado").innerText = resultado;
    } catch (err) {
      document.getElementById("resultado").innerText = "Error: " + err.message;
    }
  }
  