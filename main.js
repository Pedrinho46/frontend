setTimeout(function () {
    window.location.reload(1);
}, 180000 ); // 3 minutos


$.ajax({
    type: "get", // NOME DO METODO HTTP QUE VAMOS USAR
    url: "http://144.126.132.210:3334/api/v1/alarm", //URL DE ONDE VOCE VAI BUSCAR
    success: function (vitirnho) { // SE DER CERTO COMO VAI SRE O NOME DO MEUN
        vitirnho.map(function (resultado, i) {
            console.log(resultado)
            if (resultado.alert_time != null) {
                if (resultado.dif <= 5) {
                    document.getElementById("ativos").innerHTML += `
                    <div onClick="abrir_modal(${resultado.id})" class=" ativos card text-white" style="max-width: 28rem;">
                    <div class="fontemaior">${resultado.name}</div> 
                    <div class=" fontemaior card-body">
                        <p style="text-decoration:none; color: white " target="_blank" href="https://wa.me/55${resultado.number}" class="">${resultado.number}</p> 
                        
                    </div>
                    <div><p class="rodape">O ultimo envio foi a ${resultado.dif} Minutos</p>
                    </div>
                    </div>
                    `; 

                } else {
                    document.getElementById("inativos").innerHTML += `
              <div onClick="abrir_modal(${resultado.id})" class="inativos card text-white" style="max-width: 28rem; ">
                <div class="fontemaior">${resultado.name}</div>
                
                <div class="fontemaior card-body">
                    <a style="text-decoration:none ;color: white" target="_blank" href="https://wa.me/55${resultado.number}" class="">${resultado.number}</a>
                   
                </div>
                <div> <p class="rodape">O ultimo envio foi a ${resultado.dif} Minutos</p></div>

                </div>
                
              `;
                }
            } else {
           
              document.getElementById("semuso").innerHTML += `
              <div onClick="abrir_modal(${resultado.id})" class="semuso card text-Black" style="max-width: 28rem;">
                <div class="fontemaior">${resultado.name}</div>
                <div class="card-body">
                    <a style="text-decoration:none; color: black" target="_blank" href="https://wa.me/55${resultado.number}"">${resultado.number}</a>
                   
                </div>
                <div> <p class="card-text">SEM USO</p></div>
                </div>
              `;
            }
        })
    }
})

function abrir_modal(id){

    $('#exampleModal').modal('show');     			
    $.ajax({
        type: "get", // NOME DO METODO HTTP QUE VAMOS USAR
        url: "http://144.126.132.210:3334/api/v1/alarm"+id, //URL DE ONDE VOCE VAI BUSCAR
        success: function (vitirnho) { // SE DER CERTO COMO VAI SRE O NOME DO MEUN           
            document.getElementById("numero").value = ''
            document.getElementById("numero").value = vitirnho.number
            $.ajax({
                type: "get", // NOME DO METODO HTTP QUE VAMOS USAR
                url: "http://144.126.132.210:3334/api/v1/alarm"+vitirnho.client_id, //URL DE ONDE VOCE VAI BUSCAR
                success: function (vitirnho2) { // SE DER CERTO COMO VAI SRE O NOME DO MEUN           
                    document.getElementById("nome").value = ''
                    document.getElementById("nome").value = vitirnho2.name
                    document.getElementById("botao").innerHTML = `<button type="button" onclick="editar_cliente(${vitirnho.client_id})" class="btn btn-primary">Editar</button>`
                },
                error: function (result) {
                    alert(result.responseJSON.data)
                }
            })

        },
        error: function (result) {
            alert(result.responseJSON.data)
        }
    })
}

function editar_cliente (id) {
    const nome = document.getElementById("nome").value

    $.ajax({
        type: "put", // NOME DO METODO HTTP QUE VAMOS USAR
        url: "http://144.126.132.210:3334/api/v1/alarm"+id, //URL DE ONDE VOCE VAI BUSCAR
        data: {
            name: nome,
        },
        success: function (vitirnho) { // SE DER CERTO COMO VAI SRE O NOME DO MEUN
            console.log(vitirnho)
            window.location.reload(1);
        },
        error: function (result) {
            alert(result.responseJSON.data)
        }

    })

}