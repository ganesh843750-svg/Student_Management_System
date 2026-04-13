let form = document.getElementById('edform')
let msg = document.getElementById('msg')
let id = document.getElementById('studentID').value

form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    let formdata = new FormData(form)
    let data = Object.fromEntries(formdata)

    try{
        let resp = await fetch(`/update/${id}`,{
            method:'POST',
            headers : {'Content-type' : 'application/json'},
            body: JSON.stringify(data)
        })
        let result = await resp.text()
        msg.textContent = result
    }
    catch(err){
        console.log(err)
        msg.textContent = "Error while Updating the data"
    }
})