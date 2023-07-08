let accountingJobsCount = document.getElementById("homeAccountingJobsCount")
let itJobsCount = document.getElementById("homeITJobsCount");
let marketingJobsCount = document.getElementById("homeMarketingJobsCount");
let bankingJobsCount = document.getElementById("homeBankingJobsCount");
let digitalAndCreativeJobsCount = document.getElementById("homeDegitalAndCreativeJobsCount");
let retailJobsCount = document.getElementById("homeRetailsJobsCount");
let managementJobsCount = document.getElementById("homeManagementJobsCount");
let humanResJobsCount = document.getElementById("homeHumanResJobsCount");

let recentJobsDiv = document.getElementById("recent-jobs");
let freelanceJobsDiv = document.getElementById("freelancer");
let partTimeJobs = document.getElementById("part-time");
let fullTimeJobs = document.getElementById("full-time");

let blogListDiv = document.getElementById("homeBlogList")

getAccountingJobs();
getItJobs();
getMarketingJobs();
getBankingJobs();
getDigitalAndCreativeJobs();
getRetailJobs();
getManagementJobs();
getHumanResJobs();
getResentJobs();
getFreelanceJobs();
getPartTimeJobs();
getFullTimeJobs();
getBlogs()

function getAccountingJobs() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs/count/category/1", true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                accountingJobsCount.innerHTML = httpRequest.responseText + " Jobs";
            }
        }
    }
    httpRequest.send();
}

function getItJobs() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs/count/category/2", true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                itJobsCount.innerHTML = httpRequest.responseText + " Jobs";
            }
        }
    }
    httpRequest.send();
}

function getMarketingJobs() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs/count/category/3", true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                marketingJobsCount.innerHTML = httpRequest.responseText + " Jobs";
            }
        }
    }
    httpRequest.send();
}

function getBankingJobs() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs/count/category/4", true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                bankingJobsCount.innerHTML = httpRequest.responseText + " Jobs";
            }
        }
    }
    httpRequest.send();
}

function getDigitalAndCreativeJobs() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs/count/category/5", true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                digitalAndCreativeJobsCount.innerHTML = httpRequest.responseText + " Jobs";
            }
        }
    }
    httpRequest.send();
}

function getRetailJobs() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs/count/category/6", true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
               retailJobsCount.innerHTML = httpRequest.responseText + " Jobs";
            }
        }
    }
    httpRequest.send();
}

function getManagementJobs() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs/count/category/7", true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
               managementJobsCount.innerHTML = httpRequest.responseText + " Jobs";
            }
        }
    }
    httpRequest.send();
}

function getHumanResJobs() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs/count/category/8", true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
               humanResJobsCount.innerHTML = httpRequest.responseText + " Jobs";
            }
        }
    }
    httpRequest.send();
}

function getResentJobs() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs?size=4&sortOrder=ne", true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let response = JSON.parse(httpRequest.responseText);
                recentJobsDiv.innerHTML = setJobs(response.data)
            }
        }
    }
    httpRequest.send();
}

function getFreelanceJobs() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs?size=4&workSchedule=FREELANCE", true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let response = JSON.parse(httpRequest.responseText);
                freelanceJobsDiv.innerHTML = setJobs(response.data)
            }
        }
    }
    httpRequest.send();
}


function getPartTimeJobs() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs?size=4&workSchedule=PART_TIME", true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let response = JSON.parse(httpRequest.responseText);
                partTimeJobs.innerHTML = setJobs(response.data)
            }
        }
    }
    httpRequest.send();
}


function getFullTimeJobs() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs?size=4&workSchedule=FULL_TIME", true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let response = JSON.parse(httpRequest.responseText);
                fullTimeJobs.innerHTML = setJobs(response.data)
            }
        }
    }
    httpRequest.send();
}

function getBlogs() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/blogs?size=3", true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let response = JSON.parse(httpRequest.responseText);
                setBlogs(response.data);
            }
        }
    }
    httpRequest.send();
}

async function setBlogs(blogList) {
    let result = '';
    for (let i = 0; i < blogList.length; i++) {
        let image = await getBlogImg(blogList[i].id)
        result += `
            <div class="col-lg-4 col-md-6">
                        <div class="blog-box card p-2 mt-3">
                            <div class="blog-img position-relative overflow-hidden">
                                <img src="${image}" alt="" class="img-fluid">
                                <div class="bg-overlay"></div>
                                <div class="author">
                                    <p class=" mb-0"><i class="mdi mdi-account text-light"></i> <a
                                            href="javascript:void(0)"
                                            class="text-light user">${blogList[i].user.firstName} ${blogList[i].user.lastName}</a></p>
                                    <p class="text-light mb-0 date"><i class="mdi mdi-calendar-check"></i>
                                     ${getStyledCreatedDate(blogList[i].createdAt)}
                                     </p>
                                </div>
                
                            </div>
                            <div class="card-body">
                                <a href="/blog-details"
                                   class="primary-link">
                                    <h5 class="fs-17">${blogList[i].title}</h5>
                                </a>
                              
                                <a href="/blog-details/${blogList[i].id}"
                                   class="form-text text-primary">Read more <i
                                        class="mdi mdi-chevron-right align-middle"></i></a>
                            </div>
                        </div><!--end blog-box-->
                    </div><!--end col-->
        `;
    }
    blogListDiv.innerHTML = result;
}



function setJobs(jobList) {
    let result = '';
    for (let i = 0; i < jobList.length; i++) {
        result += `
            <div class="job-box card">
                <div class="p-3">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="mt-3 mt-lg-0">
                                <h5 class="fs-16 fw-medium mb-1"><a
                                        href="/job-details/${jobList[i].id}"
                                        class="text-dark">${jobList[i].title}</a> <small
                                        class="text-muted fw-normal">(Experience: ${getExperience(jobList[i].experience)})</small>
                                </h5>
                                <ul class="list-inline mb-0">
                                    <li class="list-inline-item">
                                        <p class="fs-14 mb-0">${jobList[i].company.name}</p>
                                    </li>
                                    <li class="list-inline-item">
                                        <p class="fs-14 mb-0"><i
                                                class="mdi mdi-map-marker" style="color: #d73645"></i> ${jobList[i].city} </p>
                                    </li>
                                    <li class="list-inline-item">
                                        <p class="fs-14 mb-0"><i
                                                class="uil uil-wallet" style="color: #3b8c70"></i> $${jobList[i].offeredSalary} /
                                            month</p>
                                    </li>
                                </ul>
                                <div class="mt-2">
                                    <span class="badge bg-soft-success mt-1">${jobList[i].workSchedule}</span>
                                </div>
                            </div>
                        </div><!--end col-->
                    </div><!--end row-->
                   
                </div>
                <div class="p-3 bg-light">
                    <div class="row justify-content-between">
                        <div class="col-md-8">
                            <div>
                                <ul class="list-inline mb-0">
                                    <li class="list-inline-item fw-medium"><i
                                            class="uil uil-tag"></i> Keyskills :
                                    </li>
                                    <li class="list-inline-item fs-13"> ${jobList[i].keySkills}
                                    </li>
   
                                </ul>
                            </div>
                        </div>
                        <!--end col-->
                        <!--end col-->
                        <div class="col-md-4">
                            <div class="text-md-end">
                                <a href="/job-details/${jobList[i].id}"
                                   class="primary-link">Apply Now <i
                                        class="mdi mdi-chevron-double-right"></i></a>
                            </div>
                        </div>
                        <!--end col-->
                    </div>
                    <!--end row-->
                </div>
            </div><!--end job-box-->
        `
    }
    result += `
        <div class="text-center mt-4 pt-2">
                                    <a href="/job-list"
                                       class="btn btn-primary">View More <i class="uil uil-arrow-right"></i></a>
                                </div>    
    `
    if (result.length > 0) {
        return result;
    } else {
        return `
            <h6>No jobs found! :(</h6>
        `
    }
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

function getExperience(experience) {
    let result = '';
    switch (experience) {
        case "0":
            result = 'No experience';
            break;
        case "1-3":
            result = 'from 1 to 3 years';
            break;
        case "3-6":
            result = 'from 3 to 6 years';
            break;
    }
    return result;
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

