const form = document.querySelector('#order');
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
    let cakeName = getValue('cakeName');
    let fullName = getValue('fullName');
    let message = getValue('message-order');
    let deliverDate = getValue('deliverDate');
    let deliverTo = getValue('deliverTo');

    let isCheck = true;

    //Check email
    if (cakeName == '--- Select cake ---') {
        setError('cakeName', 'Please select our product.');
        isCheck = false;
    } else {
        setSuccess('cakeName');
    }

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

    //Check message
    if (message.length > 30) {
        setError('message-order', 'Message should not exceed 30 characters.');
        isCheck = false;
    } else {
        setSuccess('message-order');
    }


    //Check deliver date
    const date = new Date();
    let timestampNow = Math.floor(date.getTime() / 1000);
    let timestampDeliver = Math.floor(new Date(deliverDate).getTime() / 1000);


    if (deliverDate == '') {
        setError('deliverDate', 'Please fill out the deliver date.');
        isCheck = false;
    } else if (timestampDeliver - timestampNow < 0) {
        setError('deliverDate', 'Please enter the correct deliver date.');
        isCheck = false;
    } else {
        setSuccess('deliverDate');
    }

    //Check deliver to
    if (deliverTo == '') {
        setError('deliverTo', 'Please fill out the address.');
        isCheck = false;
    } else if (deliverTo.length > 500) {
        setError('deliverTo', 'Address should not exceed 500 characters.');
        isCheck = false;
    } else {
        setSuccess('deliverTo');
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