'use strict'
// đặt biến 
const userInput=document.getElementById('input-username')
const passwordInput=document.getElementById('input-password')
const loginBtn=document.getElementById('btn-submit')
const currentUser = (x) => saveToStorage("currentUser",x)

// hàm xóa dữ liệu đang có trên form
const clear=() => {userInput.value=''; passwordInput.value='';}

// xử lý logic khi ấn vào login
loginBtn.addEventListener('click',function() {
    if(!userInput.value||!passwordInput.value) // kiểm tra đã có dữ liệu ở 2 form chưa 
    {
        alert('Please enter username and password') 
        return
    }
    const tempName=userArr.filter(e => {  // tìm value nhập vào có nằm trong danh sách người dùng không 
            return e.username==userInput.value
        })
        console.log(tempName);
    const tempPassword=tempName.filter(e => { // kiểm tra password có trùng với password của người dùng đã tìm được ?
            return e.password==passwordInput.value
        })
    if(tempName.length==0 || tempPassword.length ==0)  alert('your username or password is incorrect');
    else
    {
     currentUser(JSON.stringify(tempName))
     alert('login successfully')
     window.location.href='../index.html'
    }    
    
})