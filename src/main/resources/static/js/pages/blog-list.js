let blogListDiv = document.getElementById("blogList");
let blogListPagination = document.getElementById("blogListPagination");


getBlogs(0);

function getBlogs(page) {
    if (page === undefined || page === '') {
        page = 0;
    }

    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", `/blogs?page=${page}&size=9`, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let response = JSON.parse(httpRequest.responseText);
                setBlogs(response.data);
                setPagination(response.metadata)
            }
        }
    }
    httpRequest.send();
}

async function setBlogs(blogList) {
    let result = '';
    for (let i = 0; i < blogList.length; i++) {
        let image = await getBlogImg(blogList[i].id);
        result += `
            <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card blog-masonry-box shadow overflow-hidden border-0 p-2">
                            <div class="overflow-hidden">
                                <img src="${image}" alt="" class="img-fluid blog-img">
                            </div>
                            <div class="card-body p-4">
                                <p class="text-muted mb-2"><b>${blogList[i].blogCategory.name}</b> 
                                <i class="mdi mdi-circle-medium"></i>${getStyledCreatedDate(blogList[i].createdAt)}</p>
                                <a href="/blog-details/${blogList[i].id}"
                                   class="primary-link"><h5>${blogList[i].title}</h5></a>
                                <div class="d-flex align-items-center mt-4">
                                        <a href="javascript:void(0)"
                                           class="primary-link text-muted"><h6 class="fs-16 mb-1">
                                            ${blogList[i].user.firstName} ${blogList[i].user.lastName}</h6>
                                        </a>
                                </div>
                            </div>
                        </div><!--end card-->
                    </div><!--end col-->
        `;
    }
    blogListDiv.innerHTML = result;
}

function getBlogImg(blogId) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/blogs/" + blogId + "/avatar", true);
    httpRequest.responseType = "arraybuffer";
    httpRequest.send();

    return new Promise((resolve, reject) => {
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    const imageBytes = new Uint8Array(httpRequest.response);
                    const blob = new Blob([imageBytes], {type: "image/jpeg"});

                    resolve(URL.createObjectURL(blob));
                } else {
                    let error = httpRequest.responseText;
                    console.log(error)
                    reject(error)
                }
            }
        }
    })
}

function setPagination(page) {
    let result = `
       <li class="page-item active" onclick="getBlogs(0)">
            <a class="page-link" href="javascript:void(0)">${1}</a></li>
    `;
    for (let i = 1; i < page.totalPages; i++) {
        result += `
            <li class="page-item active" onclick="getBlogs(${i})">
            <a class="page-link" href="javascript:void(0)">${i + 1}</a></li>
        `;
    }
    blogListPagination.innerHTML = result;
}

function getStyledCreatedDate(date) {
    let result = ""
    let month = date.substring(5, 7);
    let year = date.substring(0, 4);
    switch (month) {
        case "01":
            result += "Jan";
            break;
        case "02":
            result += "Feb";
            break;
        case "03":
            result += "Mar";
            break;
        case "04":
            result += "Apr";
            break;
        case "05":
            result += "May";
            break
        case "06":
            result += "Jun";
            break;
        case "07":
            result += "Jul";
            break;
        case "08":
            result += "Aug";
            break;
        case "09":
            result += "Sep";
            break;
        case "10":
            result += "Oct";
            break;
        case "11":
            result += "Nov";
            break;
        case "12":
            result += "Dec";
            break;
    }
    result += `, ${year}`;
    return result;
}