let userId = document.getElementById("editBlogUserId").value;
let blogId = document.getElementById("editBlogId").value;

let blogImgInput = document.getElementById("editBlogImgInput");
let blogTitle = document.getElementById("editBlogTitle");
let blogContent = document.getElementById("editBlogContent");
let blogCategory = document.getElementById("editBlogCategories");

const editBlogAlert = document.getElementById('editBlogAlert')
const appendEditBlogAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    editBlogAlert.append(wrapper)
}


getBlogCategories();
getBlog();

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

function getBlog() {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", `/blogs/${blogId}`, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let response = JSON.parse(httpRequest.responseText);
                setBlogData(response);
            } else {
                let error = httpRequest.responseText;
                console.log(error)
            }
        }
    }
    httpRequest.send();
}

function editBlog() {
    if (blogImgInput.value !== '' && blogTitle.value !== '' && blogContent.value !== '') {
        const blogImage = blogImgInput.files[0];
        const httpRequest = new XMLHttpRequest();
        const formData = new FormData();

        formData.append("image", blogImage);
        formData.append("title", blogTitle.value);
        formData.append("content", blogContent.value);
        formData.append("userId", userId);
        formData.append("blogCategoryId", blogCategory.value);

        httpRequest.open("PUT", `/blogs/${blogId}`, true);
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let response = JSON.parse(httpRequest.responseText);
                    setBlogData(response);
                    appendEditBlogAlert('You successfully updated a blog!', 'success');
                } else {
                    let error = httpRequest.responseText;
                    console.log(error);
                }
            }
        }
        httpRequest.send(formData);
    } else {
        appendEditBlogAlert("Please, fill all the fields", "warning")
    }
}

function setBlogData(blog) {
    blogTitle.value = blog.title;
    blogContent.value = blog.content;
    blogCategory.value = blog.blogCategory.id;
}
