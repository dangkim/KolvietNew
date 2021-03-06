import configOrchardCore from 'configOrchardCore';
import { authHeader } from '../_helpers';

export const influencerService = {
  register,
  getAll,
  getAllJobCategories,
  getCostByContentItemId,
  getCostByUserName,
  updateInfluencers,
  registerJobs,
  getInfluencersByName,
  getInfluencersByCategory,
  getTopEngagement,
  getTopFollowers,
  getTopByTrend,
  getRelativeInfluencers
};

async function getAll(first, skip) {
  const GET_ALL_INFS = `
    {
        influencer(first: `+ first + `, skip: ` + skip + `, status: LATEST, orderBy: {valueForSortingTwo: DESC}){
          fullName
          numberOfFollowers
          numberOfPost
          numberOfShare
          numberOfReaction
          numberOfComment          
          photo {
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
    body: GET_ALL_INFS
  };

  const response = await fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions);
  return handleGraphInfResponse(response);

}

async function getTopFollowers(first) {
  const GET_ALL_INFS = `
    {
        influencer(orderBy: {valueForSortingOne: DESC}, first: `+ first + `){
          displayText
          fullName
          email
          description
          videoLink {
              paths
            }
          numberOfFollowers
          numberOfPost
          numberOfShare
          numberOfReaction
          numberOfComment
          photo {
            paths
          }
          post1 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
            }
            post2 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
            }
            post3 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
            }
            post4 {
              numberOfComment
              numberOfReaction
              link
              numberOfShare
              status
              time
              title
              type
            }
            post5 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
            }
          valueForSortingOne
          valueForSortingTwo        
          photo {
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
    body: GET_ALL_INFS
  };

  const response = await fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions);
  return handleGraphInfResponse(response);

}

async function getTopEngagement(first) {
  const GET_ALL_INFS = `
    {
        influencer(orderBy: {valueForSortingTwo: DESC}, first: `+ first + `){
          displayText
          fullName
          email
          description
          videoLink {
              paths
            }
          numberOfFollowers
          numberOfPost
          numberOfShare
          numberOfReaction
          numberOfComment
          photo {
            paths
          }
          post1 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
            }
            post2 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
            }
            post3 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
            }
            post4 {
              numberOfComment
              numberOfReaction
              link
              numberOfShare
              status
              time
              title
              type
            }
            post5 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
            }
          valueForSortingOne
          valueForSortingTwo          
          photo {
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
    body: GET_ALL_INFS
  };

  const response = await fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions);
  return handleGraphInfResponse(response);

}

async function getInfluencersByName(first, skip, userName) {
  const GET_ALL_INFS = `
    {
        influencer(first: `+ first + `, skip: ` + skip + `, where: {displayText_contains: "` + userName + `"}, status: LATEST, orderBy: {valueForSortingTwo: DESC}){
          displayText  
          fullName
            email
            description            
            videoLink {
                paths
              }
            numberOfFollowers
            numberOfPost
            numberOfShare
            numberOfReaction
            numberOfComment            
            photo {
              paths
            }
            post1 {
                link
                numberOfComment
                numberOfReaction
                numberOfShare
                status
                time
                title
                type
              }
              post2 {
                link
                numberOfComment
                numberOfReaction
                numberOfShare
                status
                time
                title
                type
              }
              post3 {
                link
                numberOfComment
                numberOfReaction
                numberOfShare
                status
                time
                title
                type
              }
              post4 {
                numberOfComment
                numberOfReaction
                link
                numberOfShare
                status
                time
                title
                type
              }
              post5 {
                link
                numberOfComment
                numberOfReaction
                numberOfShare
                status
                time
                title
                type
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
    body: GET_ALL_INFS
  };

  const response = await fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions);
  return handleGraphInfResponse(response);

}

async function getTopByTrend(first, skip) {
  const GET_ALL_INFS = `
    {
        influencer(first: `+ first + `, skip: ` + skip + `, status: LATEST, orderBy: {valueForSortingTwo: DESC}){
            checkIn
            fullName
            email
            description
            genderDemorgraphic {
              genderGraphicName
              genderPercentage
            }
            geoDemorgraphic {
              geoGraphicName
              geoPercentage
            }
            videoLink {
                paths
              }
            numberOfFollowers
            numberOfPost
            numberOfShare
            numberOfReaction
            numberOfComment
            ageDemorgraphic {
              ageGraphicsName
              agePercentage
            }
            photo {
              paths
            }
            post1 {
                link
                numberOfComment
                numberOfReaction
                numberOfShare
                status
                time
                title
                type
              }
              post2 {
                link
                numberOfComment
                numberOfReaction
                numberOfShare
                status
                time
                title
                type
              }
              post3 {
                link
                numberOfComment
                numberOfReaction
                numberOfShare
                status
                time
                title
                type
              }
              post4 {
                numberOfComment
                numberOfReaction
                link
                numberOfShare
                status
                time
                title
                type
              }
              post5 {
                link
                numberOfComment
                numberOfReaction
                numberOfShare
                status
                time
                title
                type
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
    body: GET_ALL_INFS
  };

  const response = await fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions);
  return handleGraphInfResponse(response);

}

async function getInfluencersByCategory(first, skip, categories, locations) {
  let items = [];
  let itemsInitialLocation = ['', '', '', '', '', '', '', '', '', ''];
  let itemsLocation = [];
  let allGender = '';
  let gender = '';
  let filteredItems = categories;
  debugger;
  const localLocations = locations && locations.length > 0 ? locations : itemsInitialLocation;
  const firstLocation = localLocations[0];

  localLocations.forEach(element => {
    itemsLocation.push(element);
    filteredItems = filteredItems.filter(x => x !== element);
  });

  filteredItems.forEach(element => {
    if (element === 'Male' || element === 'Nữ') {
      gender = element;
      allGender = 'AllGender';
    }

    items.push(element);
  });

  for (let i = filteredItems.length; i < 21; i++) {
    items.push('');
  }

  for (let j = localLocations.length; j < 10; j++) {
    itemsLocation.push(firstLocation);
  }

  const GET_ALL_INFS = `
    {
      influencer(first: `+ first + `, skip: ` + skip + `, where:{OR: {displayText_contains: "` + allGender + `", OR: {displayText_contains: "` + gender + `"}} AND: {OR: {OR: {displayText_contains: "` + itemsLocation[0] + `", OR: {displayText_contains: "` + itemsLocation[1] + `", OR: {displayText_contains: "` + itemsLocation[2] + `", OR: {displayText_contains: "` + itemsLocation[3] + `", OR: {displayText_contains: "` + itemsLocation[4] + `", OR: {displayText_contains: "` + itemsLocation[5] + `", OR: {displayText_contains: "` + itemsLocation[6] + `", OR: {displayText_contains: "` + itemsLocation[7] + `", OR: {displayText_contains: "` + itemsLocation[8] + `", OR: {displayText_contains: "` + itemsLocation[9] + `"}}}}}}}}}}} , AND: {displayText_contains: "` + items[0] + `", AND: {displayText_contains: "` + items[1] + `", AND: {displayText_contains: "` + items[2] + `", AND: {displayText_contains: "` + items[3] + `", AND: {displayText_contains: "` + items[4] + `", AND: {displayText_contains: "` + items[5] + `", AND: {displayText_contains: "` + items[6] + `", AND: {displayText_contains: "` + items[7] + `", AND: {displayText_contains: "` + items[8] + `", AND: {displayText_contains: "` + items[9] + `", AND: {displayText_contains: "` + items[10] + `", AND: {displayText_contains: "` + items[11] + `", AND: {displayText_contains: "` + items[12] + `", AND: {displayText_contains: "` + items[13] + `", AND: {displayText_contains: "` + items[14] + `", AND: {displayText_contains: "` + items[15] + `", AND: {displayText_contains: "` + items[16] + `", AND: {displayText_contains: "` + items[17] + `", AND: {displayText_contains: "` + items[18] + `", AND: {displayText_contains: "` + items[19] + `", AND: {displayText_contains: "` + items[20] + `"}}}}}}}}}}}}}}}}}}}}}}}, status: LATEST, orderBy: {valueForSortingTwo: DESC}) {
          displayText
    			checkIn
          fullName
          description          
          videoLink {
              paths
            }
          numberOfFollowers
          numberOfPost
          numberOfShare
          numberOfReaction
          numberOfComment
          photo {
            paths
          }
          post1 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
            }
            post2 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
            }
            post3 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
            }
            post4 {
              numberOfComment
              numberOfReaction
              link
              numberOfShare
              status
              time
              title
              type
            }
            post5 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
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
    body: GET_ALL_INFS
  };

  const response = await fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions);
  return handleGraphInfResponse(response);

}

async function getRelativeInfluencers(first, skip, categories) {
  let items = [];
  let allGender = '';
  let gender = '';

  categories.forEach(element => {
    if (element === 'Male' || element === 'Nữ') {
      gender = element;
      allGender = 'AllGender';
    }

    items.push(element);
  });

  for (let index = categories.length; index < 21; index++) {
    items.push('');
  }

  const GET_ALL_INFS = `
    {
        influencer(first: `+ first + `, skip: ` + skip + `, where:{ OR: {displayText_contains: "` + allGender + `", OR: {displayText_contains: "` + gender + `"}}, AND: {displayText_contains: "` + items[0] + `", OR: {displayText_contains: "` + items[1] + `", OR: {displayText_contains: "` + items[2] + `", OR: {displayText_contains: "` + items[3] + `", OR: {displayText_contains: "` + items[4] + `", OR: {displayText_contains: "` + items[5] + `", OR: {displayText_contains: "` + items[6] + `", OR: {displayText_contains: "` + items[7] + `", OR: {displayText_contains: "` + items[8] + `", OR: {displayText_contains: "` + items[9] + `", OR: {displayText_contains: "` + items[10] + `", OR: {displayText_contains: "` + items[11] + `", OR: {displayText_contains: "` + items[12] + `", OR: {displayText_contains: "` + items[13] + `", OR: {displayText_contains: "` + items[14] + `", OR: {displayText_contains: "` + items[15] + `", OR: {displayText_contains: "` + items[16] + `", OR: {displayText_contains: "` + items[17] + `", OR: {displayText_contains: "` + items[18] + `", OR: {displayText_contains: "` + items[19] + `", OR: {displayText_contains: "` + items[20] + `"}}}}}}}}}}}}}}}}}}}}}}, status: LATEST, orderBy: {valueForSortingTwo: DESC}) {
          displayText          
          fullName
          email
          description          
          videoLink {
              paths
            }
          numberOfFollowers
          numberOfPost
          numberOfShare
          numberOfReaction
          numberOfComment
          photo {
            paths
          }
          post1 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
            }
            post2 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
            }
            post3 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
            }
            post4 {
              numberOfComment
              numberOfReaction
              link
              numberOfShare
              status
              time
              title
              type
            }
            post5 {
              link
              numberOfComment
              numberOfReaction
              numberOfShare
              status
              time
              title
              type
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
    body: GET_ALL_INFS
  };

  const response = await fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions);
  return handleGraphInfResponse(response);

}

async function getAllJobCategories() {
  const GET_ALL_JOBCATEGORIES = `
    {
        jobCategory{
        contentItemId,
        contentItemVersionId,
        contentType,
        displayText,
        latest,
        published,
        modifiedUtc,
        publishedUtc,
        createdUtc,
        owner,
        author,
        description
      }
    }
    `;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: GET_ALL_JOBCATEGORIES
  };

  const response = await fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions);
  return handleGraphJobCategoryResponse(response);
}

async function getCostByContentItemId(contentItemId) {
  const GET_COST_BY_CONTENTID = `
    {
        influencer(where: {contentItemId: ` + contentItemId + `}) {
          contentItemId
          bag {
            contentItems {
              ... on Rates {
                modifiedUtc
                price
                displayText
                contentItemId
              }
            }
          }
        }
      }
    `;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: GET_COST_BY_CONTENTID
  };

  const response = await fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions);
  return handleGraphRatesResponse(response);
}

async function getCostByUserName(userName) {

  const GET_COST_BY_USERNAME = `
    {
        influencer(where: {displayText_contains: "` + userName + `"}, status: PUBLISHED) {
            contentItemId
            contentType
            liveStream
            shareLink
            video
            postImage
            fullName
            displayText
            author
            checkIn
            contentItemVersionId
            createdUtc
            description
            email
            fanpage
            genderDemorgraphic {
              genderGraphicName
              genderPercentage
            }
            geoDemorgraphic {
              geoGraphicName
              geoPercentage
            }
            latest
            modifiedUtc
            numberOfShare
            numberOfReaction
            numberOfComment
            owner
            phone
            photo {
              paths
              urls
            }
            published
            publishedUtc
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
    body: GET_COST_BY_USERNAME
  };

  const response = await fetch(`${configOrchardCore.apiUrl}/graphql`, requestOptions);
  return handleGraphRatesResponse(response);
}

async function register(InfluencerType, token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(InfluencerType)
  };

  const response = await fetch(`${configOrchardCore.apiUrl}/content/Post`, requestOptions);
  return handleContentResponse(response);
}

async function updateInfluencers(InfluencerType) {
  const token = localStorage.getItem('token');

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(InfluencerType)
  };

  const response = await fetch(`${configOrchardCore.apiUrl}/content/post03`, requestOptions);
  return handleContentResponse(response);
}

async function registerJobs(JobsType) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(JobsType)
  };

  const response = await fetch(`${configOrchardCore.apiUrl}/content`, requestOptions);
  return handleContentJobsResponse(response);
}

function handleTokenContentResponse(response) {
  return response.text().then(text => {
    const data = text;
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

function handleGraphJobCategoryResponse(response) {
  return response.json().then(text => {
    const data = text.data.jobCategory;
    //

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

function handleGraphRatesResponse(response) {
  return response.json().then(text => {

    const data = text.data;//.influencer[0].bag.contentItems;

    // var newArray = data.filter(value => Object.keys(value).length !== 0 && value.contentType == "Rates");
    var influencer = data.influencer[0];

    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return influencer;
  });
}

function handleGraphInfResponse(response) {
  if (!response.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      //logout();
      //location.reload(true);
      const error = response.statusText;
      return Promise.reject(error);
    }
  }

  return response.json().then(text => {
    const data = text.data;
    return data;
  });
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

function handleContentJobsResponse(response) {
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

function logout() {
  debugger;
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}