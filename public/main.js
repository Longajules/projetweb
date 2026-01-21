
//recuper élement du DOM
const monInput = document.getElementById('monInput');
const monInput2 = document.getElementById('monInput2');
const monButon = document.getElementById('button');
const monButon2 = document.getElementById('button2');
const userSelectedButton = document.getElementById('userSelectedButton');

userSelectedButton.addEventListener('click', () => {
    const usersList = document.getElementById('usersList');
    const selectedUserId = usersList.value;     
    alert('Utilisateur sélectionné ID : ' + selectedUserId);
});
// Ajout d'un écouteur d'événement sur le bouton
monButon.addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputValue: monInput.value , inputValue2: monInput2.value}),
    }).then(response => response.text())
        .then(data => {
            alert(data);
        });
});


monButon2.addEventListener('click', () => {
    fetch('/info')
        .then(responsebrute => responsebrute.json()) //Recupération de la réponse réseau et transformation en json
        .then(
            responsejson => {
                document.getElementById('reponse').innerHTML = responsejson.cle1; //récupération de la réponse trensformer en json et utilisation (récupération de cle1)
            });
});

window.onload = () => {
    fetch('/users')
    .then(response => response.json())
    .then(users => {
        const usersList = document.getElementById('usersList');
        users.forEach(user => {
            //création d'un input select option avec id en value et login en texte  
            const option = document.createElement('option');
            option.value = user.id;
            option.text = user.login;
            usersList.appendChild(option);  
        });
    });
}
