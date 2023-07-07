let userId = document.getElementById("postBlogUserId").value;

let blogImg = document.getElementById("postBlogImg");
let blogImgInput = document.getElementById("postBlogImgInput");
let blogTitle = document.getElementById("postBlogTitle");
let blogContent = document.getElementById("postBlogContent");
let blogCategory = document.getElementById("postBlogCategories");

const postBlogAlert = document.getElementById('postBlogAlert')
const appendPostBlogAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    postBlogAlert.append(wrapper)
}


getBlogCategories();

function getBlogCategories() {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", "/blog-categories", true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let response = JSON.parse(httpRequest.responseText);
                setCategories(response);
            } else {
                let error = httpRequest.responseText;
                console.log(error)
            }
        }
    }
    httpRequest.send();
}

function setCategories(categoryList) {
    let result = '';
    for (let i = 0; i < categoryList.length; i++) {
        result += `
            <option value="${categoryList[i].id}">${categoryList[i].name}</option>
        `;
    }
    blogCategory.innerHTML = result;
}

function postBlog() {
    if (blogImgInput.value !== '' && blogTitle.value !== '' && blogContent.value !== '') {
        const blogImage = blogImgInput.files[0];
        const httpRequest = new XMLHttpRequest();
        const formData = new FormData();

        formData.append("image", blogImage);
        formData.append("title", blogTitle.value);
        formData.append("content", blogContent.value);
        formData.append("userId", userId);
        formData.append("blogCategoryId", blogCategory.value);

        httpRequest.open("POST", "/blogs", true);
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 201) {
                    clearInputs();
                    appendPostBlogAlert('You successfully posted a blog!', 'success');
                    topFunction();
                } else {
                    let error = httpRequest.responseText;
                    console.log(error);
                }
            }
        }
        httpRequest.send(formData);
    } else {
        appendPostBlogAlert("Please, fill all the fields", "warning")
    }
}

function clearInputs() {
    blogTitle.value = '';
    blogContent.value = '';
    blogImgInput.value = '';
}