let blogId = document.getElementById("blogDetailsId").value;

let blogCategory = document.getElementById("blogDetailsCategory");
let blogTitle = document.getElementById("blogDetailsTitle");
let blogImg = document.getElementById("blogDetailsImg");
let blogAuthor = document.getElementById("blogDetailsAuthor");
let blogCreatedDate = document.getElementById("blogDetailsCreatedDate");
let blogContent = document.getElementById("blogDetailsContent");

getBlog();

function getBlog() {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", "/blogs/" + blogId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let job = JSON.parse(httpRequest.responseText);
                setBlogData(job);
                getBlogImage()
            }
        }
    }
    httpRequest.send();
}

function setBlogData(blog) {
    blogCategory.innerHTML = blog.blogCategory.name;
    blogTitle.innerHTML = blog.title;
    blogAuthor.innerHTML = `By ${blog.user.firstName} ${blog.user.lastName}`
    blogCreatedDate.innerHTML = getStyledCreatedDate(blog.createdAt);
    blogContent.innerHTML = blog.content;
}

function getBlogImage() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/blogs/" + blogId + "/avatar", true);
    httpRequest.responseType = "arraybuffer";
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                const imageBytes = new Uint8Array(httpRequest.response);
                const blob = new Blob([imageBytes], {type: "image/jpeg"});

                blogImg.src = URL.createObjectURL(blob);
            } else {
                let error = httpRequest.responseText;
                console.log(error)
            }
        }
    }
    httpRequest.send();
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