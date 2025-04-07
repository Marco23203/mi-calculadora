<script>
function calcularIntegral() {
    const entrada = document.getElementById("input").value;
    const variable = document.getElementById("variable").value;
    const apiKey = "E9KHL6-9YJPV32LXT";

    // Proxy temporal para evitar CORS (¡solo para pruebas!)
    const proxy = "https://cors-anywhere.herokuapp.com/";

    // Corrige el input para que la API lo entienda mejor
    const url = `${proxy}https://api.wolframalpha.com/v2/query?input=integrate%20${encodeURIComponent(entrada)}%20d${variable}&format=plaintext&output=JSON&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud a WolframAlpha: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta de la API:", data); // Depuración

            const pods = data.queryresult.pods;
            if (pods && pods.length > 0) {
                // Busca el pod correcto con el resultado
                const resultadoPod = pods.find(pod => pod.title.toLowerCase().includes("result") || pod.title.toLowerCase().includes("indefinite integral"));
                const resultado = resultadoPod ? resultadoPod.subpods[0].plaintext : "No se encontró resultado claro.";
                document.getElementById("resultadoIntegralTexto").innerText = resultado;
            } else {
                document.getElementById("resultadoIntegralTexto").innerText = "No se encontró resultado.";
            }
        })
        .catch(err => {
            console.error("Hubo un error con la consulta:", err);
            document.getElementById("resultadoIntegralTexto").innerText = "Error al consultar WolframAlpha. Revisa la API key, conexión o CORS.";
        });
}
</script>
