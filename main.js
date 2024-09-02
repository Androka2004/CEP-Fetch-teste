async function requestCEP(cep) {
    const resource = `https://viacep.com.br/ws/${cep}/json/`
    
    const rest = await fetch(resource)
        .catch (error => { 
            return false
        })
    const data = await rest.json()
    
    return data.erro? false : data
}

async function preencherForm(cep) {
    const CepInfo = await requestCEP(cep)

    if (CepInfo == false) {
        document.getElementById('cepError').classList.remove('hidden')
        form.classList.add('input-cep-error')
        document.getElementById('street').value = null
        document.getElementById('neighborhood').value = null 
        document.getElementById('state').value = null 
        document.getElementById('city').value = null 
        return
    }
        
    else if(document.getElementById('cepError').classList.length == 0 ){
        document.getElementById('cepError').classList.add('hidden')
        form.classList.remove('input-cep-error')

    }
    document.getElementById('street').value = CepInfo.logradouro
    document.getElementById('neighborhood').value = CepInfo.bairro
    document.getElementById('state').value = CepInfo.uf
    document.getElementById('city').value = CepInfo.localidade
    
}

const form = document.getElementById('cep')
form.addEventListener('keyup', async (e) => {
    if (e.key == 'Enter') {
            await preencherForm(form.value)
    }
})