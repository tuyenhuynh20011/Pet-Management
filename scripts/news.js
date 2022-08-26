'use strict'
// đặt biến 
const container=document.getElementById('news-container')
const preBtn=document.getElementById('btn-prev')
const nextBtn=document.getElementById('btn-next')
const pageNum=document.getElementById('page-num')
const settingData = JSON.parse(getFromStorage('setting')) || [];


// render mặc định khi chưa được setting category và pagesize
if(settingData.category==undefined) settingData.category='Technology'
if(settingData.pageSize==undefined) settingData.pageSize=5;
console.log(settingData.pageSize,settingData.category)

// hàm quy định URL cho trang news
function setUrl(category,pageSize,page) {

    var url = `https://newsapi.org/v2/top-headlines?country=de&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=c2ae05fa8c9e48d9962cbfc51a59e631`;
    return url
}
// ẩn nút Prev khi page đang hiện là 1 
if(pageNum.attributes.value.value==1)
{
    preBtn.style.visibility='hidden'
}
// gọi hàm render lần đầu tiên cho trang 
if(Number(pageNum.attributes.value.value)){
    render()
}

// xử lý logic khi ấn nút Next
nextBtn.addEventListener('click',()=>{
    pageNum.setAttribute('value',Number(pageNum.attributes.value.value)+1) // set PageNum +1 
    pageNum.innerText=Number(pageNum.attributes.value.value)// in ra màn hình page sau khi đã tăng 1 
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

// xử lý logic cho nút Pre
preBtn.addEventListener('click',()=>{
    if(Number(pageNum.attributes.value.value)>1) //  -1 cho pageNum hiện tại
    {
        pageNum.setAttribute('value',Number(pageNum.attributes.value.value)-1)
        pageNum.innerText=Number(pageNum.attributes.value.value)
        render(Number(pageNum.attributes.value.value))
    }
    if(nextBtn.style.visibility='hidden') // kiểm tra xem nút next có bị ẩn thì hiện lên 
    {
        nextBtn.style.visibility='visible'
    }
    if(pageNum.attributes.value.value==1) 
{
    preBtn.style.visibility='hidden'
}
})
// hàm fetch api 
async function fetchApi(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}
// hàm render và in ra HTML
function render(page)
{
    container.innerHTML=''
    fetchApi(setUrl(settingData.category,settingData.pageSize,page))
    .then(json =>
     {
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
        )
    .catch(err => console.log(err))
}
