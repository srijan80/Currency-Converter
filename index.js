const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdown = document.querySelectorAll(".dropdown select")
 const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")


let i=0


for(let select of dropdown){
    for(currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode
        if(select.name === "from" && currcode==="USD"){
            newoption.selected= "selected"
        } else if(select.name === "to" && currcode==="NPR"){
            newoption.selected= "selected"
        }
        select.append(newoption)
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };


  btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input")
    let amtval = amount.value
    if(amtval==="" || amtval <1){
        amtval=1
        amount.value="1";
    }




    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()]
    // console.log(rate)
    let finalAmount = amtval*rate;
    msg.innerText = `${amtval} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`
  })