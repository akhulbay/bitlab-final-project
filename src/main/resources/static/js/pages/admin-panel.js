// user filters
let userFirstNameFilter = document.getElementById("adminPanelUsersFirstName");
let userLastNameFilter = document.getElementById("adminPanelUsersLastName");
let userRoleFilter = document.getElementById("adminPanelUserRole");

let userListTable = document.getElementById("adminPanelUserList");
let usersPagination = document.getElementById("adminPanelUsersPagination");

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

filterUsers(0);

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
        console.log(userList[i].blocked)
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