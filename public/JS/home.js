console.log('js file loaded')
let enr = document.getElementById('enr')
let std = document.getElementById('std')

enr.addEventListener('click',()=>{
    window.location.href = '/form'
})

std.addEventListener('click',()=>{
    window.location.href = 'std_data'
})