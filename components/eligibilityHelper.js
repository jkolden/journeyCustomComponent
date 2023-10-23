let axios = require("axios");

//gets the person number to be used in subsequent API calls
function getExtraInfoUrl(faUrl, accessToken, userName) {
  var config = {
    method: "get",
    url:
      faUrl +
      `/hcmRestApi/resources/11.13.18.05/emps?q=upper(UserName)='${userName}'&expand=assignments`,
    headers: {
      "REST-Framework-Version": "2",
      'Authorization': 'Basic YmV0dHkuYW5kZXJzb246dVVjNnI/NSU='
     // Authorization: "Bearer " + accessToken,
    },
  };

  return axios(config)
    .then((response) => {
      let needle = "assignmentExtraInformation";

      let obj = response.data.items[0].assignments[0].links;
      let extraInfoUrl;

      for (let i = 0; i < obj.length; i++) {
        if (obj[i].name == needle) {
          extraInfoUrl = obj[i].href;
        }
      }
      return extraInfoUrl;
    })
    .catch(function (error) {
      return error;
    });
}

function getRelocationUrl(url, accessToken) {
  var config = {
    method: "get",
    url: url,
    headers: {
      "REST-Framework-Version": "2",
      'Authorization': 'Basic YmV0dHkuYW5kZXJzb246dVVjNnI/NSU='
      // Authorization: "Bearer " + accessToken,
    },
  };

  return axios(config)
    .then((response) => {
      let needle = "InformationRelocationprivateVO";

      let obj = response.data.items[0].links;
      let relocationUrl;

      for (let i = 0; i < obj.length; i++) {
        if (obj[i].name == needle) {
          relocationUrl = obj[i].href;
        }
      }
      return relocationUrl;
    })
    .catch(function (error) {
      return error;
    });
}

function getRelocationEligibility(url, accessToken) {
  var config = {
    method: "get",
    url: url,
    headers: {
      "REST-Framework-Version": "2",
      'Authorization': 'Basic YmV0dHkuYW5kZXJzb246dVVjNnI/NSU='
      // Authorization: "Bearer " + accessToken,
    },
  };

  return axios(config)
    .then((response) => {

     return response.data.items[0].eligibleForRelocation;
      
    })
    .catch(function (error) {
      return error;
    });
}

module.exports = {
  getExtraInfoUrl,
  doStuff: async (obj) => {

    let extraInfoUrl = await getExtraInfoUrl(
      obj.url,
      obj.accessToken,
      obj.userName
    );

    let relocationUrl = await getRelocationUrl(
      extraInfoUrl,
      obj.accessToken
    )
  
    let eligibility = await getRelocationEligibility(
      relocationUrl,
      obj.accessToken
    )

    return eligibility;
  },
};
