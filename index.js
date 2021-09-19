'use strict'
async function happyorsad() {
    const textvalue = document.getElementsByTagName("textarea")[0].value;
    const results = document.getElementById("results");
    results.innerHTML = "<img src='ZZ5H.gif'>"
    let result = await fetch("https://sentim-api.herokuapp.com/api/v1/", {
        method: "POST",
        headers: {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({"text":textvalue}),
    })
    if(!result.ok){
        results.innerHTML = `<img src='https://http.cat/${result.status}'>`;
        return;
    }
    const response = await result.json();
    results.innerHTML = `<p>Score: <span id="score"></span> Result: <span id="pon"></span></p>`
    const score = document.getElementById("score");
    const pon = document.getElementById("pon");
    score.innerHTML = response.result.polarity;
    pon.innerHTML = response.result.type;
    if(response.result.polarity<0){
        pon.className="red";
        score.className="red";
    }
    else if(response.result.polarity>0){
        pon.className="green";
        score.className="green";
    }  
}
document.getElementsByTagName("button")[0].addEventListener("click", happyorsad);