const form = document.querySelector('#contact');
const btnSend = document.getElementById('btn-send');

btnSend.addEventListener('click', function() {
    let isValid = checkValidate();
    if (isValid) {
        alert('Dữ liệu đã gửi đi');
        location.reload();
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
});


//Lấy dữ liệu
function getValue(id) {
    return document.getElementById(id).value.trim();
}

function setError(key, message) {
    document.getElementById(key).parentNode.classList.remove('success');
    let parentEle = document.getElementById(key).parentNode;
    parentEle.classList.add('error');
    parentEle.querySelector('.form-message').innerText = message;
}


function setSuccess(key) {
    document.getElementById(key).parentNode.classList.remove('error');
    let parentEle = document.getElementById(key).parentNode;
    document.getElementById(key).parentNode.classList.add('success');
    parentEle.querySelector('.form-message').innerText = '';
}

function checkValidate() {
    let fullName = getValue('fullName');
    let email = getValue('email');
    let subject = getValue('subject');
    let message = getValue('message');

    let isCheck = true;

    //Check full name
    if (fullName == '') {
        setError('fullName', 'Please fill out your name.');
        isCheck = false;
    } else if (fullName.length > 100) {
        setError('fullName', 'Your name should not exceed 100 characters.');
        isCheck = false;
    } else {
        setSuccess('fullName');
    }


    //Check email
    if (email == '') {
        setError('email', 'Please fill out your email.');
        isCheck = false;
    } else if (email.length > 100) {
        setError('email', 'Your email should not exceed 100 characters.');
        isCheck = false;
    } else {
        setSuccess('email');
    }

    //Check subject
    if (subject == '') {
        setError('subject', 'Please fill out the subject.');
        isCheck = false;
    } else if (subject.length <= 50) {
        setError('subject', 'Subject should not shorter than 50 characters.');
        isCheck = false;
    } else if (subject.length > 250) {
        setError('subject', 'Subject should not exceed 250 characters.');
        isCheck = false;
    } else {
        setSuccess('subject');
    }

    //Check message
    if (message == '') {
        setError('message', 'Please fill out the message.');
        isCheck = false;
    } else if (message.length > 500) {
        setError('message', 'Message should not exceed 500 characters.');
        isCheck = false;
    } else {
        setSuccess('message');
    }

    return isCheck;
}


var inputElements = form.querySelectorAll('.form-control');
Array.from(inputElements).forEach(function(inputElement) {
    if (inputElement) {
        //Xử lý khi người dùng blur khỏi input
        inputElement.onblur = function() {
            checkValidate();
        }

        //Xử lý khi người dùng nhập vào input
        inputElement.oninput = function() {
            checkValidate();
        }
    }
});