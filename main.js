const APIKEY = '7h3jtwMEvNg05tFOjUz7iBBrzkJBiLPuNHHHHJuV';
const spaceURL = 'https://api.nasa.gov/planetary/apod?api_key=' + APIKEY;
const marsURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=' + APIKEY;
const rocketsNASA = 'https://images-api.nasa.gov/search?media_type=image&q=rocket'


const dropDown = document.getElementById('drop-down');
dropDown.addEventListener('change', (event) => {
    let value = event.target.value;
    if (value == 2) {
        fetchNASA(rocketsNASA, 2);
    } else {
        fetchNASA(marsURL);
    }
})

function picSlideShow() {
        
    const imgs = document.getElementById('imgs')
    const leftBtn = document.getElementById('left')
    const rightBtn = document.getElementById('right')
    const img = document.querySelectorAll('#imgs img')
    
    let idx = 0
    let interval = setInterval(run, 5000)

    function run() {
        idx++
        changeImage()
    }

    function changeImage() {
        if(idx > img.length - 1) {
            idx = 0
        } else if(idx < 0) {
            idx = img.length - 1
        }

        imgs.style.transform = `translateX(${-idx * 500}px)`
    }

    function resetInterval() {
        clearInterval(interval)
        interval = setInterval(run, 5000)
    }

    rightBtn.addEventListener('click', () => {
        idx++
        changeImage()
        resetInterval()
    })

    leftBtn.addEventListener('click', () => {
        idx--
        changeImage()
        resetInterval()
    })
    
}

function displayPics(obj){
    
    let imageOne = document.getElementById('imageOne')
    let imageTwo = document.getElementById('imageTwo')
    let imgContainer = document.getElementById('imgs');
    imgContainer.innerHTML = "";
    
    // img.classList.add("pictures");
    for (let i = 0; i < 10; i++) {
        let random = Math.floor(Math.random() * obj.photos.length);
        console.log(random);
        let img = document.createElement('IMG');
        img.setAttribute("src", obj.photos[random].img_src);
        imgContainer.appendChild(img);

    }
    
    picSlideShow();
}

function displayRockets(obj){
    let imageOne = document.getElementById('imageOne')
    let imageTwo = document.getElementById('imageTwo')
    let imgContainer = document.getElementById('imgs');
    imgContainer.innerHTML = "";
    
    // img.classList.add("pictures");
    for (let i = 0; i < 10; i++) {
        let random = Math.floor(Math.random() * obj.collection.items.length);
        // console.log(random);
        if (obj.collection.items[random].links) {
            let img = document.createElement('IMG');
            img.setAttribute("src", obj.collection.items[random].links[0].href);
            imgContainer.appendChild(img);
        }
    }
    
    picSlideShow();
}



function fetchNASA(url, num){
    fetch(url)
    .then( result => result.json() )
    .then( json => {
        console.log(json);
        if (num == 2) {
            displayRockets(json);
        } else {
            displayPics(json);
        }
    })
}





fetchNASA(marsURL);