function handleSubmit(event){
    event.preventDefault();
    let fullname=document.getElementById('fullname').value.trim();
    if(fullname===""){
        alert("please enter your name")
    }
    else if(fullname.length<3) {
        alert("please enter yourfull name")
    }
    let nameError =document.getElementById('nameError')
nameError.innerHTML="";
if(nameError===""){
    nameError.innerHTML="please enter your name"
}
console.log(fullname);
}
