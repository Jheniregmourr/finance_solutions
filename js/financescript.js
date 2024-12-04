let lista = document.getElementById("form_listagem")
lista.addEventListener("submit", function(event)
{
    event.preventDefault(); //Impede o comportamento natural de buscar uma riquisição Back-End/SGBD.
    let name = document.getElementById("name").value;
    let receita = document.getElementById("receita").value;
    let despesas = document.getElementById("despesas").value;
    let descricao = document.getElementById("descricao").value; //"Value" pois queremos o valor do respectivo ID.
    let data = document.getElementById("data").value;
    usuario = {
        name: name, receita: receita, despesas: despesas, descricao: descricao, data: data
    } //Objeto.
    let lista_usuarios = JSON.parse(localStorage.getItem("lista_usuarios")) || []
    lista_usuarios.push(usuario)
    localStorage.setItem("lista_usuarios", JSON.stringify(lista_usuarios)) //JSON.stringfy realiza a conversão para String.
    document.getElementById("form_listagem").reset()
    exibir_lista01()
    exibir_graphic()
    exibir_totais()
}
)
document.getElementById("btn_listar").addEventListener("click", function(){
    var listing = document.getElementById("listing")
        if(listing.style.display === "none")
        {
            listing.style.display = "block"
        }
        else
        {
            listing.style.display = "none"
        }
}
)
document.getElementById("btn_grafico").addEventListener("click", function(){
    var graphic_space = document.getElementById("graphic_space")
        if(graphic_space.style.display === "none")
        {
            graphic_space.style.display = "block"
        }
        else
        {
            graphic_space.style.display = "none"
        }
}
)
document.getElementById("btn_tabela").addEventListener("click", function(){
    var table_space = document.getElementById("table_space")
        if(table_space.style.display === "none")
        {
            table_space.style.display = "block"
        }
        else
        {
            table_space.style.display = "none"
        }
}
)
document.getElementById("btn_resumo").addEventListener("click", function(){
    var summary = document.getElementById("summary")
        if(summary.style.display === "none")
        {
            summary.style.display = "block"
        }
        else
        {
            summary.style.display = "none"
        }
}
)
    function exibir_lista01(){
    let lista_usuarios = JSON.parse(localStorage.getItem("lista_usuarios")) || [];
    let full = document.getElementById("full")
    full.innerHTML=" ";
    for(let i = 0;i<lista_usuarios.length;i++)
    {
        let tr = document.createElement("tr")
         
        let tdName = document.createElement("td")
        tdName.textContent = lista_usuarios[i].name
        tr.appendChild(tdName)

        let tdReceita = document.createElement("td")
        tdReceita.textContent = lista_usuarios[i].receita
        tr.appendChild(tdReceita)

        let tdDespesas = document.createElement("td")
        tdDespesas.textContent = lista_usuarios[i].despesas
        tr.appendChild(tdDespesas)

        let tdDescricao = document.createElement("td")
        tdDescricao.textContent = lista_usuarios[i].descricao
        tr.appendChild(tdDescricao)

        let tdData = document.createElement("td")
        tdData.textContent = lista_usuarios[i].data
        tr.appendChild(tdData)
           
        full.appendChild(tr);
    }
    }
    function exibir_graphic(){
        let lista_usuarios = JSON.parse(localStorage.getItem("lista_usuarios")) || []
        let despesas = lista_usuarios.map(usuario => usuario.despesas)
        let descricao = lista_usuarios.map(usuario => usuario.descricao)
        let datas = lista_usuarios.map(usuario => usuario.data)
        const ctx = document.getElementById('graphic_chart').getContext('2d'); 
    const graphic_chart = new Chart(ctx, 
        { 
            type: 'bar', 
            data: { labels: datas, datasets: 
                [{ label: 'Despesas', 
                    data: despesas, backgroundColor: 'rgb(240, 248, 255)', 
                    borderColor: 'rgb(49, 36, 80)', 
                    borderWidth: 1 
                }
            ]}, 
                    options: 
                    { scales: 
                        { 
                            y: 
                            { beginAtZero: true 

                            } 
                        }, responsive: true, maintainAspectRatio: false 
                        } 
                    });
    }
    function exibir_totais(){
        //reduce p/ somar todos os itens. 
        let lista_usuarios = JSON.parse(localStorage.getItem("lista_usuarios")) || []
        let totalReceita = lista_usuarios.reduce((total, usuario) => total + parseFloat(usuario.receita), 0);
        let totalDespesas = lista_usuarios.reduce((total, usuario) => total + parseFloat(usuario.despesas), 0);

        let summary_table = document.getElementById("summary_table")
        summary_table.innerHTML=" ";

        let tr = document.createElement("tr")

        let tdReceita = document.createElement("td")
        tdReceita.textContent = totalReceita

        let tdDespesas = document.createElement("td")
        tdDespesas.textContent = totalDespesas
    
        let totalSaldo = totalReceita-totalDespesas
        let tdSaldo = document.createElement("td")
        tdSaldo.textContent = totalSaldo

        tr.appendChild(tdReceita) 
        tr.appendChild(tdDespesas) 
        tr.appendChild(tdSaldo) 
        summary_table.appendChild(tr)
    }
    function limpar_dados(){
        localStorage.clear()
        alert("Atualize a página para que os seus dados sejam efetivamente deletados.")
    }