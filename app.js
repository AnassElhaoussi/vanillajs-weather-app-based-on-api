

const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherIcon = document.querySelector(".main-part img"),
arrowBack = document.querySelector("header i")


let api;



inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value)
    }

})


locationBtn.addEventListener('click', () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }

    else{
        alert("Your browser don't support geolocation api")
    }
})


const onSuccess = (pos) => {
    const {longitude, latitude} = pos.coords
    
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${"325f2569216b60c0473050fc9585292b"}` 
    fetchData()


}

const onError = (error) => {
    console.log(error);
}


const requestApi = city => {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"325f2569216b60c0473050fc9585292b"}`
    fetchData()

}

const weatherDetails = info => {
    
    
    infoTxt.classList.replace("pending", "error")
    if(info.cod == "404") {
        infoTxt.innerText = `${inputField.value} isn't a valid city name`

    }
    
    else {
        infoTxt.classList.remove("pending", "error")
        wrapper.classList.add("active")
        console.log(info)

        const city = info.name
        const country = info.sys.country
        const {description , id} = info.weather[0]
        const {feels_like , humidity, temp} = info.main


        wrapper.querySelector(".weather").innerText = description
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`
        wrapper.querySelector(".temp .num").innerText = Math.floor(temp)
        wrapper.querySelector(".feelslike-temp span").innerText = Math.floor(feels_like)
        wrapper.querySelector(".humidity-temp span").innerText = `${humidity} %`

        
        if (id == 800){
            weatherIcon.src = "icons/clear.svg"

        }
        else if(id >= 801 && id <= 804){
            weatherIcon.src = "icons/cloud.svg"
        }

        else if(id >= 600 && id <= 622){
            weatherIcon.src = "icons/snow.svg"
        }

        else if(id >= 500 && id <= 531){
            weatherIcon.src = "icons/rain.svg"
        }

        else if(id >= 200 && id <= 232){
            weatherIcon.src = "icons/storm.svg"
        }

        else if((id >= 701 && id <= 781) || (id >= 300 && id <= 321)){
            weatherIcon.src = "icons/haze.svg"
        }
         
         
         


        
    }
    

}

const fetchData = () => {
    infoTxt.innerText = "Getting weather details..."
    infoTxt.classList.add("pending")

    fetch(api).then(response => {
       return response.json()
    }).then(data => {
        weatherDetails(data)
    })
}

arrowBack.addEventListener('click', () => {
    wrapper.classList.remove("active")
})