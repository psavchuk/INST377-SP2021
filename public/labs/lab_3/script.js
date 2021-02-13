/* Put your javascript in here */

const carouselArray = document.querySelectorAll("ul li");

const moveConstant = 130;

let currentIndex = 0;


/*
let leftButton = document.querySelector("#leftButton");
let rightButton = document.querySelector("#rightButton");

leftButton.addEventListener("click", cycleCarousel(0));
rightButton.addEventListener("click", cycleCarousel(1));*/


function onLoadOfPage()
{

    console.log(carouselArray.length);
    
}

//0 is move left, 1 is move right
function cycleCarousel(value)
{
    if(value == 0)
    {
        console.log("move left");

        //if we have space to move left, move left
        if(currentIndex > 0)
        {
            /*
            carouselArray.forEach(function(element, i) {
                console.log(element.style.marginLeft);
                element.style.marginLeft = (moveConstant * (currentIndex + i)).toString() + "px";
            })*/

            currentIndex--;

            carouselArray[0].style.marginLeft = (moveConstant * -currentIndex).toString() + "px"

            

            console.log(currentIndex);
        }


    }
    else if (value == 1)
    {
        console.log("move right");

        if(currentIndex < carouselArray.length-1)
        {
            /*
            carouselArray.forEach(function(element, i) {
                console.log(element.style.marginLeft);
                element.style.marginLeft = (moveConstant * (currentIndex + i)).toString() + "px";
            })*/


            currentIndex++;

            carouselArray[0].style.marginLeft = (moveConstant * -currentIndex).toString() + "px"

            

            console.log(currentIndex);
        }

        
    }
    else
    {
        console.log("shouldnt get this error")
    }
}

window.onload = onLoadOfPage();

