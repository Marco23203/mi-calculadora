function calcularIntegral() {
    const entrada = document.getElementById("input").value;
    const variable = document.getElementById("variable").value;
    const apiKey = "E9KHL6-ALTQT5UJEE";  // Tu API key de Wolfram

    const url = `https://api.wolframalpha.com/v2/query?input=integrate%20${encodeURIComponent(entrada)}%20d${variable}&format=plaintext&output=JSON&appid=${apiKey}`;

    console.log("URL generada:", url);

    // Nuevo proxy
    const proxy = "https://api.allorigins.win/raw?url=";

    fetch(proxy + encodeURIComponent(url))
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud a WolframAlpha: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta de la API:", data);

            if (data.queryresult && data.queryresult.pods) {
                const pods = data.queryresult.pods;
                console.log("Pods encontrados:", pods);

                const resultadoPod = pods.find(pod =>
                    pod.title.toLowerCase().includes("integral") ||
                    pod.title.toLowerCase().includes("result") ||
                    pod.title.toLowerCase().includes("antiderivada")
                );

                if (resultadoPod && resultadoPod.subpods && resultadoPod.subpods[0].plaintext) {
                    const resultado = resultadoPod.subpods[0].plaintext;

                    const resultadoSimplificado = resultado.replace(/^.*?= /, '= ').replace(/\n/g, ' ');

                    // Determinar el tipo de integral
                    let tipoIntegral = "Integral Simple";
                    if (entrada.includes("dx") && (entrada.includes("dy") || entrada.includes("dz"))) {
                        tipoIntegral = "Integral Doble";
                    }
                    if (entrada.includes("dx") && entrada.includes("dy") && entrada.includes("dz")) {
                        tipoIntegral = "Integral Triple";
                    }

                    document.getElementById("resultadoIntegralTexto").innerText = `${resultadoSimplificado}\n\nTipo de Integral: ${tipoIntegral}`;
                } else {
                    console.error("No se encontró un resultado claro en los pods.");
                    document.getElementById("resultadoIntegralTexto").innerText = "No se encontró un resultado claro en los pods.";
                }
            } else {
                console.error("No se encontraron pods en la respuesta de WolframAlpha.");
                document.getElementById("resultadoIntegralTexto").innerText = "No se encontraron pods en la respuesta de WolframAlpha.";
            }
        })
        .catch(err => {
            console.error("Hubo un error con la consulta:", err);
            document.getElementById("resultadoIntegralTexto").innerText = "Error al consultar WolframAlpha. Revisa la API key, conexión o CORS.";
        });
}
