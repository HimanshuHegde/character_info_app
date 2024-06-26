let navig = document.getElementsByClassName('nav');
document.body.onscroll = function(){
    if(window.scrollY==(window.innerHeight)/2){
        navig[0].style.display="block";
    }
}
console.log(window.innerHeight)