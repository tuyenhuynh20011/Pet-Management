'use strict'

// khai báo biến 
const pageSize=document.getElementById('input-page-size')
const category=document.getElementById('input-category')
const submitBtn=document.getElementById('btn-submit')
const settingNews= (x) => saveToStorage('setting',x)


// xử lý logic cho nút submit và lưu vào localstorage
submitBtn.addEventListener('click',()=> {
    const settingData={
        pageSize:pageSize.value,
        category:category.value
    }
    if(settingData.pageSize>0)
    {
        settingNews(JSON.stringify(settingData))
    }

})