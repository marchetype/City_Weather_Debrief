let submitBtnEl = document.getElementById('city-submit');
let cityInputEl = document.getElementById('city-input');
let historyList = document.getElementById('history-display');

//temporary event listener function used to style list items
submitBtnEl.addEventListener('click', function(event) {
    event.preventDefault();
    let historyItem = document.createElement('button');
    historyItem.textContent = cityInputEl.value;
    historyList.appendChild(historyItem);
})

// The commented-out function below will eventually be used to call from localStorage.   
// submitBtnEl.addEventListener('click', function(event) {
//     event.preventDefault();
//     let historyArr = [];
//     for (let i = 0; i < historyArr.length; i++) {
//         
//     }
    

//     console.log(historyItem);
// })