

//get data from session storage



var brandCode;


brandCode =sessionStorage.getItem("brandCode");
if (brandCode==null) {
    document.body.innerHTML="";
    document.body.style.background = "purple";
    
    Swal.fire({
        icon: 'warning',
        title: 'Unauthorized Access',
        text: 'Please login first',
        confirmButtonText: 'Go to Login'
})
}
//var allUserData = localStorage.getItem(brandCode);
var allUserData = JSON.parse(localStorage.getItem(brandCode));
var brandNameEl =document.getElementById("brand-name");



brandNameEl.innerHTML ="Welcome"+" "+ allUserData.brandName;

console.log(allUserData);

//start logout code

var logoutBtn =document.querySelector("#logout-btn");
/*logoutBtn.onclick = function () {
    this.innerHTML = "Please Wait...";
}
*/
logoutBtn.addEventListener('click',(e) =>{
    e.target.innerHTML="Please Wait..."
    logoutBtn.disabled = true;
   // this.style.background = "pink";
    e.target.style.background ="pink";
    setTimeout(function(){
        // Clear session storage on logout
        sessionStorage.removeItem("brandCode");
        
        window.location = "../company/hell.html";
        
    },2000)

    
})