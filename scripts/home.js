'use strict'

// đặt biến
const loginModal=document.getElementById('login-modal')
const logoutBtn=document.getElementById('btn-logout')
const welcome=document.getElementById('welcome-message')

// khai báo biến kiểm tra giá trị của key tên là "currentUser"
const checkCurrentUser = JSON.parse(getFromStorage("currentUser")) || [];
if(checkCurrentUser.length!=0) { // xử lý logic nếu có người dùng đã đăng nhập 
    loginModal.innerHTML =""
    checkCurrentUser.map(e => {
        welcome.innerHTML +=`Welcome  ${e.username}`
    })
   
}
// xử lý logic khi ấn vào nút logout
logoutBtn.addEventListener('click', () =>{ 
    localStorage.removeItem("currentUser");
    window.location.reload()
})