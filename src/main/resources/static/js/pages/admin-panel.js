// user filters
let userFirstNameFilter = document.getElementById("adminPanelUsersFirstName");
let userLastNameFilter = document.getElementById("adminPanelUsersLastName");
let userRoleFilter = document.getElementById("adminPanelUserRole");

let userListTable = document.getElementById("adminPanelUserList");
let usersPagination = document.getElementById("adminPanelUsersPagination");

// job filters
let jobTitleFilter = document.getElementById("adminPanelJobTitle");
let jobLocationFilter = document.getElementById("adminPanelJobLocation");
let jobCategoryFilter = document.getElementById("adminPanelJobCategory");

let jobListTable = document.getElementById("adminPanelJobList");
let jobsPagination = document.getElementById("adminPanelJobsPagination");

// company filters
let companyNameFilter = document.getElementById("adminPanelCompanyName");
let companyLocationFilter = document.getElementById("adminPanelCompanyLocation");

let companyListTable = document.getElementById("adminPanelCompanyList");
let companyPagination = document.getElementById("adminPanelCompaniesPagination");

let companyId = null;
let jobId = null;
let userId = null;

const usersAlert = document.getElementById('adminPanelUsersAlert')
const appendUsersAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    usersAlert.append(wrapper)
}

const jobsAlert = document.getElementById('adminPanelJobsAlert')
const appendJobsAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    jobsAlert.append(wrapper)
}

const companiesAlert = document.getElementById('adminPanelCompaniesAlert')
const appendCompaniesAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    companiesAlert.append(wrapper)
}

filterUsers(0);
filterJobs(0);
filterCompanies(0);

function filterUsers(page) {
    if (page === undefined || page === '') {
        page = 0;
    }

    let result = ``;
    if (userFirstNameFilter.value !== '') {
        result += `&firstName=${userFirstNameFilter.value}`;
    }
    if (userLastNameFilter.value !== '') {
        result += `&lastName=${userLastNameFilter.value}`;
    }
    if (userRoleFilter.value !== 'all') {
        result += `&role=${userRoleFilter.value}`;
    }
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", `/users?page=${page}&size=10` + result,
        true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let response = JSON.parse(httpRequest.responseText);
                setUsers(response.data)
                setUsersPagination(response.metadata)
            } else {
                let error = httpRequest.responseText;
                console.log(error)
            }
        }
    }
    httpRequest.send();
}

function setUsers(userList) {
    let result = ``;
    for (let i = 0; i < userList.length; i++) {
        result += `
            <tr>
                <td>${userList[i].id}</td>
                <td>${userList[i].firstName} ${userList[i].lastName}</td>
                <td>${userList[i].username}</td>
                <td>
                    <select class="form-select" data-trigger
                                                            name="choices-single-location"
                                                            aria-label="Default select example"
                                                            style="width: 110px;"
                                                            id="userRole${userList[i].id}"
                                                            onchange="updateRole(${userList[i].id})">
                      
                       <option value="ROLE_USER" ${userList[i].role === 'ROLE_USER' ? 'selected' : ''}>User</option>
                       <option value="ROLE_EMPLOYER" ${userList[i].role === 'ROLE_EMPLOYER' ? 'selected' : ''}>Employer</option>
                       <option value="ROLE_ADMIN" ${userList[i].role === 'ROLE_ADMIN' ? 'selected' : ''}>Admin</option>
                    </select>


                </td>
                <td><a href="/candidate-details/${userList[i].id}" class="btn btn-sm btn-primary">Details</a></td>
                <td id="isUserBlocked${userList[i].id}"> ${!userList[i].blocked ? `<a href='javascript:void(0)' data-bs-toggle='modal'
                                                       data-bs-target='#blockUserModal'
                                                        class='btn btn-sm btn-danger' onclick="preBlockUser(${userList[i].id})">Block</a>` 
                    : `
                        <button class="btn btn-sm btn-success" type="button" onclick="unblockUser(${userList[i].id})">
                            Unblock
                        </button>
                    ` }
                </td>
                <td>
                    <a href='javascript:void(0)' data-bs-toggle='modal'
                                                       data-bs-target='#deleteUserModal'
                                                        class='btn btn-sm btn-danger' onclick="preDeleteUser(${userList[i].id})">Delete</a>
                </td>
            </tr>
        `;
    }

    userListTable.innerHTML = result;
}

function setUsersPagination(page) {
    let result = `
       <li class="page-item active" onclick="filterUsers(0)">
            <a class="page-link" href="javascript:void(0)">${1}</a></li>
    `;
    for (let i = 1; i < page.totalPages; i++) {
        result += `
            <li class="page-item active" onclick="filterUsers(${i})">
            <a class="page-link" href="javascript:void(0)">${i + 1}</a></li>
        `;
    }
    usersPagination.innerHTML = result;
}

function updateRole(id) {
    let role = document.getElementById(`userRole${id}`);

    let params = `role=${role.value}`;

    const httpRequest = new XMLHttpRequest();
    httpRequest.open("PUT", `/users/role/${id}`,
        true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                appendUsersAlert("You successfully changed user's role", "success");
            } else {
                let error = httpRequest.responseText;
                console.log(error)
            }
        }
    }
    httpRequest.send(params);
}

function deleteUser() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("DELETE", `/users/${userId}`,
        true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 204) {
                filterUsers(0);
                appendUsersAlert("You successfully deleted user", "warning");
            } else {
                let error = httpRequest.responseText;
                console.log(error)
            }
        }
    }
    httpRequest.send();
}

function preBlockUser(id) {
    userId = id;
}

function preDeleteUser(id) {
    userId = id;
}

function blockUser() {
    let userBlockStatus = document.getElementById(`isUserBlocked${userId}`)

    const httpRequest = new XMLHttpRequest();
    httpRequest.open("PUT", `/users/block/${userId}`,
        true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                appendUsersAlert("You successfully blocked user", "warning");
                userBlockStatus.innerHTML = `
                    <button class="btn btn-sm btn-success" type="button" onclick="unblockUser(${userId})">
                            Unblock
                    </button>
                `;
            } else {
                let error = httpRequest.responseText;
                console.log(error)
            }
        }
    }
    httpRequest.send();
}

function unblockUser(id) {
    let userBlockStatus = document.getElementById(`isUserBlocked${id}`)

    const httpRequest = new XMLHttpRequest();
    httpRequest.open("PUT", `/users/unblock/${id}`,
        true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                appendUsersAlert("You successfully unblocked user", "success");
                userBlockStatus.innerHTML = `
                    <a href='javascript:void(0)' data-bs-toggle='modal'
                                                       data-bs-target='#blockUserModal'
                                                        class='btn btn-sm btn-danger' 
                                                        onclick="preBlockUser(${id})">
                                                        Block
                    </a>
                `;
            } else {
                let error = httpRequest.responseText;
                console.log(error)
            }
        }
    }
    httpRequest.send();
}

function filterJobs(page) {
    if (page === undefined || page === '') {
        page = 0;
    }

    let result = '';
    if (jobTitleFilter.value !== '') {
        result += `&title=${jobTitleFilter.value}`;
    }
    if (jobLocationFilter.value !== 'all') {
        result += `&city=${jobLocationFilter.value}`
    }
    if (jobCategoryFilter.value !== 'all') {
        result += `&category=${jobCategoryFilter.value}`
    }
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", `/jobs?page=${page}&size=10` + result,
        true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let response = JSON.parse(httpRequest.responseText);
                setJobs(response.data)
                setJobsPagination(response.metadata)
            } else {
                let error = httpRequest.responseText;
                console.log(error)
            }
        }
    }
    httpRequest.send();
}

function setJobs(jobsList) {
    let result = '';
    for (let i = 0; i < jobsList.length; i++) {
        result += `
            <tr>
                <td>${jobsList[i].id}</td>
                <td>${jobsList[i].title}</td>
                <td>${jobsList[i].city}</td>
                <td>${getCategory(jobsList[i].category)}</td>
                <td>${jobsList[i].createdAt}</td>
                <td>${jobsList[i].company.name}</td>
                <td>
                    <a href="/job-details/${jobsList[i].id}" class="btn btn-sm btn-primary">Details</a>
                </td>
                <td>
                    <a href='javascript:void(0)' data-bs-toggle='modal'
                                                       data-bs-target='#deleteJobModal'
                                                        class='btn btn-sm btn-danger' 
                                                        onclick="preDeleteJob(${jobsList[i].id})">Delete
                    </a>
                </td>
            </tr>
        `;
    }
    jobListTable.innerHTML = result;
}

function setJobsPagination(page) {
    let result = `
       <li class="page-item active" onclick="filterJobs(0)">
            <a class="page-link" href="javascript:void(0)">${1}</a></li>
    `;
    for (let i = 1; i < page.totalPages; i++) {
        result += `
            <li class="page-item active" onclick="filterJobs(${i})">
            <a class="page-link" href="javascript:void(0)">${i + 1}</a></li>
        `;
    }
    jobsPagination.innerHTML = result;
}

function preDeleteJob(id) {
    jobId = id;
}

function deleteJob() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("DELETE", `/jobs/${jobId}`,
        true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 204) {
                filterJobs(0);
                appendJobsAlert("You successfully deleted job", "warning");
            } else {
                let error = httpRequest.responseText;
                console.log(error)
            }
        }
    }
    httpRequest.send();
}

function getCategory(category) {
    let result = '';
    switch (category) {
        case 1:
            result = 'Accounting';
            break;
        case 2:
            result = 'IT & Software';
            break;
        case 3:
            result = 'Marketing';
            break;
        case 4:
            result = 'Banking';
            break;
        case 5:
            result = 'Digital and Creative';
            break;
        case 6:
            result = 'Retail';
            break;
        case 7:
            result = 'Management';
            break;
        case 8:
            result = 'Human Resources';
            break;
    }
    return result;
}

function filterCompanies(page) {
    if (page === undefined || page === '') {
        page = 0;
    }

    let result = ``;
    if (companyNameFilter.value !== '') {
        result += `&name=${companyNameFilter.value}`;
    }
    if (companyLocationFilter.value !== 'all') {
        result += `&location=${companyLocationFilter.value}`;
    }
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", `/companies?page=${page}&size=10` + result,
        true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let response = JSON.parse(httpRequest.responseText);
                setCompanies(response.data)
                setCompanyPagination(response.metadata)
            } else {
                let error = httpRequest.responseText;
                console.log(error)
            }
        }
    }
    httpRequest.send();
}

function setCompanies(companyList) {
    let result = '';
    for (let i = 0; i < companyList.length; i++) {
        result += `
            <tr>
                <td>${companyList[i].id}</td>
                <td>${companyList[i].name}</td>
                <td>${companyList[i].location}</td>
                <td>
                    <a href="/company-details/${companyList[i].id}" class="btn btn-sm btn-primary">Details</a>
                </td>
                <td>
                    <a href='javascript:void(0)' data-bs-toggle='modal'
                                                       data-bs-target='#deleteCompanyModal'
                                                        class='btn btn-sm btn-danger' 
                                                        onclick="preDeleteCompany(${companyList[i].id})">Delete
                    </a>
                </td>
            </tr>
        `;
    }
    companyListTable.innerHTML = result;
}

function setCompanyPagination(page) {
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
    companyPagination.innerHTML = result;
}

function preDeleteCompany(id) {
    companyId = id;
}

function deleteCompany() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("DELETE", `/companies/${companyId}`,
        true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 204) {
                filterCompanies(0);
                appendCompaniesAlert("You successfully deleted job", "warning");
            } else {
                let error = httpRequest.responseText;
                console.log(error)
            }
        }
    }
    httpRequest.send();
}


