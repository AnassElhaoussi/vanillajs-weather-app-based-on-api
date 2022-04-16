

const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button")

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