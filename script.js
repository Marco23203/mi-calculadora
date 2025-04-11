// Función para eliminar resultados
function eliminar() {
  document.getElementById("input").value = "";
  document.getElementById("variable").value = "x"; // Restauramos la variable a x
  document.getElementById("resultadoDerivada").innerText = "";
  document.getElementById("resultadoIntegral").innerText = "";
}

// Función para mostrar instrucciones
function mostrarInstrucciones() {
  const instrucciones = document.getElementById("instrucciones");
  instrucciones.style.display = instrucciones.style.display === "none" ? "block" : "none";
}
