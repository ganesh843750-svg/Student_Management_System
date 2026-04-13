let form = document.getElementById('stdform')
let msg = document.getElementById('msg')

form.addEventListener('submit', async (e)=>{
    e.preventDefault()

    let formdata = new FormData(form)
    let data = Object.fromEntries(formdata)
    try{
        let resp = await fetch('/submit',{
            method:'POST',
            headers :{ 'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        let result = await resp.text()
        msg.textContent = result
    }catch{
        msg.textContent =  'Something went wrong'
    }
})