'use strict';
// đặt biến 
const searchInput=document.getElementById('input-query')
const submitBtn=document.getElementById('btn-submit')
const preBtn=document.getElementById('btn-prev')
const nextBtn=document.getElementById('btn-next')
const container=document.getElementById('news-container')
const pageNum=document.getElementById('page-num')
const settingData = JSON.parse(getFromStorage('setting')) || [];

// hàm chỉnh sửa lại URL đầu vào 
function setUrl(input) {
    var url = `https://newsapi.org/v2/top-headlines?q=${input}&pageSize=5&apiKey=c2ae05fa8c9e48d9962cbfc51a59e631`;
    return url
}
// ẩn nút pree khi page đang là 1
if(pageNum.attributes.value.value==1)
{
    preBtn.style.visibility='hidden'
}

// xử lý logic cho nút next 
// tăng số trang và render
nextBtn.addEventListener('click',()=>{
    pageNum.setAttribute('value',Number(pageNum.attributes.value.value)+1)
    pageNum.innerText=Number(pageNum.attributes.value.value)
    render(Number(pageNum.attributes.value.value))
    if(preBtn.style.visibility='hidden')
    {
        preBtn.style.visibility='visible'
    }
    if(pageNum.attributes.value.value==14)
    {
        nextBtn.style.visibility='hidden'
    }
})

// xử lý logic khi ấn vào prev
// trừ số trang và hiện ra 
// ẩn nút pre khi trang là 1
preBtn.addEventListener('click',()=>{
    if(Number(pageNum.attributes.value.value)>1)
    {
        pageNum.setAttribute('value',Number(pageNum.attributes.value.value)-1)
        pageNum.innerText=Number(pageNum.attributes.value.value)
        render(Number(pageNum.attributes.value.value))
    }
    if(nextBtn.style.visibility='hidden')
    {
        nextBtn.style.visibility='visible'
    }
    if(pageNum.attributes.value.value==1)
{
    preBtn.style.visibility='hidden'
}
    
   
})
// xử lý logic cho nút submit
submitBtn.addEventListener('click',()=>{
    if(!searchInput.value) // kiểm tra có dữ liệu nhập vào hay chưa
    {
        alert("Please enter your search text")
        return
    }
        render(searchInput.value) // truyền dữ liệu nhập vào cho hàm render
})

// tạo hàm fetch
async function fetchApi(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

// hàm nhận đầu vào và render ra giao diện
function render(input)
{
    container.innerHTML=''
    fetchApi(setUrl(input))
    .then(json =>
     {
        if(json.totalResults==0)
        {   
            container.innerHTML+=`
                <h1>no matching data</h1>
            `
        }
         else{     
               json.articles.map(e=> {
                    container.innerHTML+=`
                    <div class="news-table mb4" >
                            <div class="news-img">
                                <img src=${e.urlToImage} alt="ảnh lỗi rồi ">
                            </div>
                            <div class="news-content container">
                                    <h5>${e.title}</h5>
                                    <p>${e.content}</p>	
                                    <button class="page-link" id="view-btn">View</button>
                            </div>
                        </div>
                    `
                    // console.log(e.urlToImage);
                })
            }
        }
        )
    .catch(err => console.log(err))
}
