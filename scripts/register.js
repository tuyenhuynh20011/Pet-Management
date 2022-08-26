'use strict'
// đặt biến 
const firstName=document.getElementById('input-firstname')
const lastName=document.getElementById('input-lastname')
const userName=document.getElementById('input-username')
const password=document.getElementById('input-password')
const passwordConfirm=document.getElementById('input-password-confirm')
const registerBtn=document.getElementById('btn-submit')
const apiUser = (x) => saveToStorage("USER_ARRAY", x);



// hàm xóa các dữ liệu đang hiện trên form
function clearInput() {
    firstName.value='', lastName.value='', userName.value='', password.value='', passwordConfirm.value=''
}

// hàm validate dữ liệu nhập vào 
const validate = () => {
    if(!firstName.value) return false;
    if(!lastName.value) return false;
    if(!userName.value) return false;
    if(!password.value) return false;
    if(!passwordConfirm.value) return false;
    if(password.value!==passwordConfirm.value) return false;
    if(password.value.length<8) return false;
    return true;
}

// kiểm tra trong hàm đã có user name đó chưa
function checkName(name) {
 const element=userArr.find((e) => { 
    return e.userName==name
 });
  if( typeof element=="undefined")
  {
      return false;
  }
  else{
      return true;
  }
 
}


// xử lý sự kiện ấn vào nút register 
registerBtn.addEventListener('click',function(){
   const data=new User ( firstName.value,lastName.value,userName.value,password.value,)
    if(!firstName.value) alert('please enter your first name')
    if(!lastName.value) alert('please enter your last name')
    if(!userName.value) alert('please enter your usern name')
    if(!password.value) alert('please enter your password')
    if(!passwordConfirm.value) alert('please enter your password one more')
    if(password.value.length<8) alert('password must be >8 character')
    if(password.value!==passwordConfirm.value) alert('password does not match')
    validate()
    if(checkName(userName.value)) alert('username is already in use')
    if(validate() && checkName(userName.value)==false)
    {
        userArr.push(data)
        apiUser(JSON.stringify(userArr))
        clearInput()
        alert('registration successful')
        window.location.href = '../pages/login.html';
    }

})




