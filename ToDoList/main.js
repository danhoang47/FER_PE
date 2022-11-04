var inputEle = document.querySelector('.add-bar input');
var ulEle = document.querySelector('ul');
let liEles;
let percent = 0;
let rmvEles;
let checkBtns;
//chia ra 2 loai: event object va element

setInterval(() => {
    rmvEles = document.querySelectorAll('.rmv-btn');
    checkBtns = document.querySelectorAll('.check-btn');

    for (var i = 0; i < rmvEles.length; i++) {
        rmvEles[i].onclick =  function(e) {
            var rmv = e.target.parentNode.parentNode;
            ulEle.removeChild(rmv);
            updatePercent();
        }
    }

    for (var i = 0; i < checkBtns.length; i++) {
        checkBtns[i].onclick =  function(e) {
            var liEle = e.target.parentNode.parentNode;
            if (!!liEle.style.border) {
                liEle.style.removeProperty('border');
                e.target.style.removeProperty('color')
                ;
            }
            else {
                liEle.style = 'border: 1px solid green';
                e.target.style = 'color: green';
            }
            updatePercent();
        }
    }
}, 0);

function add(){
    let thing = inputEle.value;
    if (!thing)
        return;
    var li = document.createElement('li');
    li.innerHTML = `<a class="check-btn"><i class="fas fa-check"></i></a>
                    <p>${thing}</p>
                    <a class="rmv-btn"><i class="fas fa-minus"></i></a>`
    ulEle.appendChild(li);
    inputEle.value = '';
    updatePercent();
}

function updatePercent() {
    liEles = document.querySelectorAll('li');

    var totalThing = liEles.length;
    var totalDone = 0;

    for (var i = 0; i < totalThing; i++) {
        if (!!liEles[i].style.border)
            totalDone++;
    }

    percent = Math.round((totalDone / totalThing) * 100) || 0;

    var perCentBox = document.querySelector('.percent-box');
    perCentBox.innerHTML = `<p>${percent}%</p>`

    var borderRadius = percent == 100 ? '30px' : 0;

    perCentBox.style.setProperty('--percent-val',  `${100 - percent}%`, '');
    perCentBox.style.setProperty('--border-radius',  borderRadius, '');
}

function addKey(e) {
    if (e.keyCode === 13) {
        add();
        e.preventDefault();
    }
    else
        return;
}



