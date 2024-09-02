async function requestCEP(cep) {
    const resource = `https://viacep.com.br/ws/${cep}/json/`
    
    const rest = await fetch(resource).catch (error => {
        document.getElementById('cepError').classList.remove('hidden')
        form.classList.add('input-cep-error')
        return false
    })
    
    return rest? rest.json() : false
}

async function preencherForm(cep) {
    const CepInfo = await requestCEP(cep)

    if (CepInfo == false) {return}
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
form.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
            preencherForm(form.value)
    }
})