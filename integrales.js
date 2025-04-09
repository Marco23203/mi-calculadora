function calcularIntegral() {
    const entrada = document.getElementById("input").value;
    const variable = document.getElementById("variable").value;
    const apiKey = "E9KHL6-ALTQT5UJEE";  // My API que estoy usando en Wolfram

    
    const url = `https://api.wolframalpha.com/v2/query?input=integrate%20${encodeURIComponent(entrada)}%20d${variable}&format=plaintext&output=JSON&appid=${apiKey}`;

    console.log("URL generada:", url);  

    // Proxy
    const proxy = "https://cors-anywhere.herokuapp.com/";

    fetch(proxy + url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud a WolframAlpha: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta de la API:", data);  // Respuesta 

            
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

                    // Mostrar el resultado 
                    document.getElementById("resultadoIntegralTexto").innerText = resultadoSimplificado;
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
