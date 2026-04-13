let table = document.querySelector('table')

table.addEventListener('click', async(e)=>{
    if(e.target.classList.contains('dlebtn')){
        let id = e.target.dataset.id
        let confirmDle = confirm('Are you sure?')
        if(!confirmDle) return
        try{
            let resp = await fetch(`/delete/${id}`,{
                method: 'POST'
            })
            let result = await resp.text()
            alert(result)
            e.target.closest('tr').remove()
        }catch{
            alert("Error while deleting the record")
        }    
    }

     if(e.target.classList.contains('edbtn')){
        let id = e.target.dataset.id
        console.log('Clicked ID:', id)
        window.location.href = `/edit/${id}`
    }

})