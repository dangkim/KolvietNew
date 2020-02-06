import configOrchardCore from 'configOrchardCore';
import configContent from 'configContent';
import { authHeader } from '../_helpers';

export const brandService = {
    register,
    getAll,
    updateBrand,
    getBrandByName,
    getManageBrandByName,
    uploadAvatar
};

function getBrandByName(userName) {
    const GET_BRANDBYNAME = `
    {
        brand(where: {displayText_contains: "` + userName + `"}, status: LATEST) {
          contentItemId
          brandName
          email
          businessAreas
          fullName
          location
          createdUtc
          published
          avatar {
            urls
            paths
          }
        }
      }
    `;
    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/graphql',
            'Authorization': token
        },
        body: GET_BRANDBYNAME
    };

    return fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions).then(handleGraphResponse);
}

function getManageBrandByName(userName) {
    const GET_BRANDBYNAME = `
    {
        brand(where: {displayText_contains: "` + userName + `"}, status: LATEST) {
          contentItemId
          brandName
          businessAreas
          fullName
          location
          phone
          createdUtc
          published
          avatar {
            urls
            paths
          }
        }
      }
    `;
    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/graphql',
            'Authorization': token
        },
        body: GET_BRANDBYNAME
    };

    return fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions).then(handleGraphResponse);
}

function getAll() {
    const GET_ALL_BRAND = `
    {
        brand(status: ALL) {
          brandName
          businessAreas
          contentItemId
          email
          fullName
          location
          phone
          published
          avatar {
            urls
            paths
          }
        }
      }
    `;

    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/graphql',
            'Authorization': token
        },
        body: GET_ALL_BRAND
    };

    return fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions).then(handleGraphResponse);
}

function register(brandType) {
    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(brandType)
    };
    return fetch(`${configOrchardCore.apiUrl}/content/Post?draft=true`, requestOptions).then(handleContentResponse);
}

function updateBrand(brandType) {
    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(brandType)
    };

    return fetch(`${configOrchardCore.apiUrl}/content/UpdateBrand`, requestOptions).then(handleContentResponse);
}

function uploadAvatar(file) {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    let brandObj = JSON.parse(localStorage.getItem('brandObj'));
    brandObj = brandObj[0] ? brandObj[0] : brandObj;
    const contentItemId = brandObj.contentItemId ? brandObj.contentItemId : brandObj.ContentItemId
    //const brandObj = JSON.parse(localStorage.getItem('brandObj'));

    formData.append('ContentItemId', contentItemId);
    formData.append('Files', file);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': token
        },
        body: formData
    };

    return fetch(`${configOrchardCore.apiUrl}/content/UploadAvatar`, requestOptions).then(handleContentUploadResponse);
}

function handleGraphResponse(response) {
    if (!response.ok) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            //location.reload(true);
            const error = response.statusText;
            return Promise.reject(error);
        }
    }

    return response.json().then(text => {
        const data = text.data;
        return data;
    });
    // 
    // return response.json().then(text => {
    //     const data = text.data;

    //     if (!response.ok) {
    //         if (response.status === 401) {
    //             // auto logout if 401 response returned from api
    //             logout();
    //             location.reload(true);
    //         }

    //         const error = (data && data.message) || response.statusText;
    //         return Promise.reject(error);
    //     }

    //     return data;
    // });
}

function handleContentResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function handleContentUploadResponse(response) {
    if (!response.ok) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            //location.reload(true);
        }

        const error = response.statusText;
        return Promise.reject(error);
    } else {
        return response.ok;
    }
}

function logout() {
    debugger;
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}