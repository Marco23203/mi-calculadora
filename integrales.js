// Función para calcular la Integral
function calcularIntegral() {
    const entrada = document.getElementById("input").value;
    const variable = document.getElementById("variable").value;
    const apiKey = "E9KHL6-ALTQT5UJEE";  // Tu API key de Wolfram

    const entradaFormateada = `${entrada}, x=0 to 1, y=0 to 1, z=0 to 1`;
    const url = `https://api.wolframalpha.com/v2/query?input=integrate%20${encodeURIComponent(entradaFormateada)}&format=plaintext&output=JSON&appid=${apiKey}`;
    const proxy = "https://api.allorigins.win/raw?url=";

    fetch(proxy + encodeURIComponent(url))
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al conectar con WolframAlpha: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.queryresult && data.queryresult.pods) {
                const pods = data.queryresult.pods;

                const resultadoPod = pods.find(pod =>
                    pod.title.toLowerCase().includes("integral") ||
                    pod.title.toLowerCase().includes("result") ||
                    pod.title.toLowerCase().includes("antiderivada")
                );

                if (resultadoPod && resultadoPod.subpods && resultadoPod.subpods[0].plaintext) {
                    const resultado = resultadoPod.subpods[0].plaintext;
                    const resultadoSimplificado = resultado.replace(/^.*?= /, '= ').replace(/\n/g, ' ');

                    document.getElementById("resultadoIntegralTexto").innerText = `${resultadoSimplificado}`;
                } else {
                    document.getElementById("resultadoIntegralTexto").innerText = "Lo siento, no pude calcular la integral. Intenta con otra expresión.";
                }
            } else {
                document.getElementById("resultadoIntegralTexto").innerText = "No se encontraron resultados para esa integral. Intenta con otra expresión.";
            }
        })
        .catch(err => {
            console.error("Error:", err);
            document.getElementById("resultadoIntegralTexto").innerText = "Hubo un problema con la conexión. Intenta más tarde.";
        });
}
