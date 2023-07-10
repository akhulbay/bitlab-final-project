
let companyListName = document.getElementById("companyListName");
let companyListLocation = document.getElementById("companyListLocation");
let companyListSortOrder = document.getElementById("companyListSortOrder");

let companyListDiv = document.getElementById("companyList");
let companyListPagination = document.getElementById("companyListPagination");

filterCompanies();

function filterCompanies(page) {
    if (page === undefined || page === '') {
        page = 0;
    }
    let result = `?page=${page}&size=9`;
    if (companyListName.value !== '') {
        result += `&name=${companyListName.value}`;
    }
    if (companyListLocation.value !== 'all') {
        result += `&location=${companyListLocation.value}`;
    }
    if (companyListSortOrder.value !== 'df') {
        result += `&sortOrder=${companyListSortOrder.value}`;
    }
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", "/companies" + result, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let response = JSON.parse(httpRequest.responseText);
                setCompanies(response.data);
                setPagination(response.metadata)
            }
        }
    }
    httpRequest.send();
}

function getCompanyOpenJobsCount(companyId) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs/count/" + companyId, true);
    httpRequest.send();

    return new Promise((resolve, reject) => {
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    resolve(httpRequest.response);
                } else {
                    let error = httpRequest.responseText;
                    console.log(error)
                    reject(error)
                }
            }
        }
    })
}

function getCompanyImg(companyId) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/companies/" + companyId + "/avatar", true);
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

async function setCompanies(companyList) {
    let result = '';
    for (let i = 0; i < companyList.length; i++) {
        let openJobsNumber = await getCompanyOpenJobsCount(companyList[i].id);
        let companyImg = await getCompanyImg(companyList[i].id);
        result += `
                     <div class="col-lg-4 col-md-6">
                        <div class="card text-center mb-4">
                            <div class="card-body px-4 py-5">
                                <img src="${companyImg}" alt="" class="avatar-lg rounded">
                                <div class="mt-4">
                                    <a href="/company-details/${companyList[i].id}" class="primary-link">
                                    <h6 class="fs-18 mb-2">${companyList[i].name}</h6></a>
                                    <p class="text-muted mb-4">${companyList[i].location}</p>

                                    <button class="btn btn-primary">${openJobsNumber} Opening Jobs</button>
                                </div>
                            </div>
                        </div>
                    </div><!--end col-->
        `;
    }
    if (result.length === 0) {
        result = '<h6>No companies found! :(</h6>'
    }
    companyListDiv.innerHTML = result;
}

function setPagination(page) {
    let result = `
       <li class="page-item active" onclick="filterCompanies(0)">
            <a class="page-link" href="javascript:void(0)">${1}</a></li>
    `;
    for (let i = 1; i < page.totalPages; i++) {
        result += `
            <li class="page-item active" onclick="filterCompanies(${i})">
            <a class="page-link" href="javascript:void(0)">${i + 1}</a></li>
        `;
    }
    companyListPagination.innerHTML = result;
}