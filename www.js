var players 
var answer
var day
var input
var answered = false

fetch("fencers.json")
    .then(response => response.json()).then(resp => {players=resp.players; answer= players[resp.answer]; day =resp.day}).then(_ =>{document.getElementsByClassName('bigF')[0].innerHTML += ` #${day}`})


var guesses = []

function clear_suggestions() {
    document.getElementById('suggestions').innerHTML = ''
}

function helpToggle() {
    var modal = new bootstrap.Modal(document.getElementById('howToPlay'))
    modal.show()
}

function ready() {
    var sheet = window.document.styleSheets[0];
    width = document.getElementById('playername').offsetWidth;
    console.log(width)
    sheet.insertRule(`.item {margin-left: ${width}px !important;}`, sheet.cssRules.length)
    sheet.insertRule(`.suggestions {width: calc(100%-${width}px);}`, sheet.cssRules.length)
    
    input = document.getElementById('name');
    input.addEventListener("keyup", function(event) {
        let curr = 0
        if (input.value.length == 0) {
            clear_suggestions()
            return
        }
        clear_suggestions()
        for (let key in players) {
            if (key.startsWith(input.value.toLowerCase()) && curr < 6) {
                curr ++
                console.log(curr, key)
                newElem = document.createElement("div")
                newElem.setAttribute('class', 'item')
                newElem.innerHTML = `<strong>${players[key][0]}</strong>`
                document.getElementById('suggestions').appendChild(newElem)
                newElem.addEventListener('click', function(click) {
                    let name = players[key][0]
                    input.value = name
                    clear_suggestions()
                    play()
                })
            }
        } 


        if (event.key === "Enter") {
            play()
        }
        
    });

}

function play() {
    pname = input.value.toLowerCase();
    input.value = ''
    clear_suggestions()
    if (pname in players) {
        document.querySelectorAll('.box').forEach(element => {
            element.classList.remove('box')
        });
        var guesss = []
        let player = players[pname]
        if (player == answer) {
            html = `<tr class="box"><td class="green">${player[0]}</td>`
            guesss.push(129001)
        } 
        else {
            html = `<tr class="box"><td class=" red">${player[0]}</td>`
            guesss.push(0x2B1B)
        } 

        guesss.push(32)
        
        if (player[1] == answer[1]) {
            html += `<td class=" green">${player[1]}</td>`
            guesss.push(129001) /* Green */
        }
        else {
            html += `<td class=" red">${player[1]}</td>`
            guesss.push(0x2B1B)
        }

        if (player[2] == answer[2]) {
            html += `<td class=" green">${player[2]}</td><td>`
            guesss.push(129001)
        } 
        else { 
            html += `<td class=" red">${player[2]}</td><td>`
            guesss.push(0x2B1B)
        }
        guesss.push(32)

        if (player[3]==answer[3]){
            html += `<img class=" border-green" src="assets/correct_icon.png">`
            html += '  <h3 class = " green">' + player[3] + '</h3>'
            guesss.push(129001)
        }
        else if(player[3]>answer[3]){
            html += `<img class=" border-yellow" src="assets/toohigh_icon.jpeg">`
            
            html += '  <h3 class = " red">' + player[3] + '</h3>'
            guesss.push(129001)
        }
        else{
            html += `<img class=" border-yellow" src="assets/toolow_icon.png">`
            html += '  <h3 class = " red">' + player[3] + '</h3>'
            guesss.push(129001)
        }
        guesss.push(32)
        /* grip */
        if (answer[4] == player[4]) {
            html += `<td class=" green">${player[4]}</td>`
            guesss.push(129001) 
        }
        else {
            html += `<td class=" red">${player[4]}</td>`
            guesss.push(0x2B1B)
        }
        html += "</tr>"
        document.getElementById('data').innerHTML += html
        guesses.push(String.fromCodePoint(...guesss))

        document.getElementById('timer').innerHTML = `${guesses.length}/10`

        if (player == answer | guesses.length == 10) {
            if (player == answer) {
                answered = true
            }
            document.getElementById('name').disabled = true
            document.getElementById('submit').disabled = true
            if (guesses.length == 10 && player != answer){
                document.getElementById('exampleModalLabel').innerHTML = `Nice try. The answer to today's Fencordle is ${answer[0]}.`
            }
            else {
                document.getElementById('exampleModalLabel').innerHTML = `Good job, you guessed today's Fencordle!`               
            }
            var modal = new bootstrap.Modal(document.getElementById('exampleModal'))
            modal.show()
        }
    }
}

function copy_result() {
    navigator.clipboard.writeText(`Fencordle #${day} ${answered ? guesses.length: '*'}/10\n\n` + guesses.join('\n') + '\n\nhttps://poignantpig.github.io/Fencordle')
}