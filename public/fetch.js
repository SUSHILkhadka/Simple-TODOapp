
const showcardslist = document.querySelector('.showcards')


function toString(value) {
    return `${value}`;
}


var fetchedData = [];
var cardsNumber = 0;


function fetcher() {
    fetch("http://localhost:3000/api/fetch").
        then(r => r.json())
        .then(response => {
            fetchedData = Object.assign(response);
            cardsNumber = response.length;
            console.log(fetchedData);


            for (let i = 0; i < cardsNumber; i++) {
                let singleShowCardDiv = document.createElement('p');
                if (fetchedData[i]["contents"] == '') continue;
                singleShowCardDiv.innerHTML = toString(fetchedData[i]["contents"]);
                showcardslist.append(singleShowCardDiv);



                let editbutton = document.createElement('button');
                editbutton.innerHTML = 'edit';
                showcardslist.append(editbutton)


                editbutton.addEventListener("click", e => {
                    console.log('showhave added')

                    let editData = ''

                    let editDiv = document.createElement('textarea');
                    editDiv.style.height = "100px";
                    editDiv.style.width = '100px';



                    editDiv.addEventListener('input', e => {
                        editData = e.target.value;
                    })
                    // editDiv.innerHTML='editbox';
                    singleShowCardDiv.append(editDiv);

                    editbutton.style.display = 'none';

                    let updatebutton = document.createElement('button');
                    updatebutton.innerHTML = 'update';
                    singleShowCardDiv.append(updatebutton)

                    let backbutton = document.createElement('button');
                    backbutton.innerHTML = 'back';
                    singleShowCardDiv.append(backbutton)
                    backbutton.addEventListener("click", e => {
                        updatebutton.style.display = 'none';
                        backbutton.style.display = 'none';
                        editDiv.style.display = 'none';
                        editbutton.style.display = 'inline';
                    })



                    updatebutton.addEventListener('click', e => {

                        const body = JSON.stringify({
                            "id": `${fetchedData[i]["id"]}`,
                            "contents": `${editData}`,
                        });


                        fetch('http://localhost:3000/api/update', {
                            method: 'POST',
                            body,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(r => r.json())
                            .then(response => {
                                console.log('SUCCESS');
                                showcardslist.innerHTML = "";
                                fetcher();
                            }).catch(console.log);
                    })
                    backbutton.addEventListener('click', e => {
                    })


                })


                let deletebutton = document.createElement('button');
                deletebutton.innerHTML = 'delete';
                deletebutton.addEventListener('click', e => {
                    const body = JSON.stringify({
                        "id": `${fetchedData[i]["id"]}`,
                    });


                    fetch('http://localhost:3000/api/delete', {
                        method: 'POST',
                        body,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(r => r.json())
                        .then(response => {
                            console.log('SUCCESS');
                            showcardslist.innerHTML = "";
                            fetcher();
                        }).catch(console.log);

                })

                showcardslist.append(deletebutton)


            }




        })
        .catch(console.log);

}
fetcher();
