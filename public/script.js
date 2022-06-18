
const input = document.querySelector(".input")
const btn = document.querySelector(".btn")

let value = '';


input.addEventListener('input', e => {
    value = e.target.value;
})

btn.addEventListener("click", e => {
    const body = JSON.stringify({
        "contents": `${value}`,
    });
    console.log(body)

    fetch('http://localhost:3000/api/create', {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json())
        .then(response => {console.log('SUCCESS');
        showcardslist.innerHTML="";
        fetcher();
    }).catch(console.log);


})



