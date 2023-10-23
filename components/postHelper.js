let axios = require("axios");

//gets the person number to be used in subsequent API calls
function getAssignmentId(faUrl, accessToken, userName) {
  var config = {
    method: "get",
    url:
      faUrl +
      `/hcmRestApi/resources/11.13.18.05/emps?q=upper(UserName)='${userName}'&expand=assignments`,
    headers: {
      "REST-Framework-Version": "2",
      'Authorization': 'Basic Y3VydGlzLmZlaXR0eTpvSm43WSUzIw=='
      // Authorization: "Bearer " + accessToken,
    },
  };

  return axios(config)
    .then((response) => {
      let obj = {};

      let assignmentId = response.data.items[0].assignments[0].AssignmentId;
      let personId = response.data.items[0].PersonId;

      obj.assignmentId = assignmentId;
      obj.personId = personId;

      return obj;

    })
    .catch(function (error) {
      return error;
    });
}

function allocateJourney(faUrl, obj, accessToken, journeyId) {

  let date_ob = new Date();

  //current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  //current year
  let year = date_ob.getFullYear();

  // current date
  //adjust 0 before single digit date
  let date = ("0" + date_ob.getUTCDate()).slice(-2);

  var data = JSON.stringify({
    "JourneyId":journeyId,
    "AssignedDate":`${year}-${month}-${date}`,
    "Comments":null,
    "criteria":[
       {
         "PersonId":obj.personId,
         "AssignmentId": obj.assignmentId
 
       }
    ]
 });

  var config = {
    method: "POST",
    url: faUrl + '/hcmRestApi/resources/11.13.18.05/journeyAllocations',
    headers: {
      // Authorization: "Bearer " + accessToken,
      'Authorization': 'Basic Y3VydGlzLmZlaXR0eTpvSm43WSUzIw==',
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config)
    .then((response) => {
      return response.data.JourneyAllocationId;
    })
    .catch(function (error) {
      return error;
    });
}

module.exports = {
  getAssignmentId,
  doStuff: async (obj) => {

    let assignmentObj = await getAssignmentId(
      obj.url,
      obj.accessToken,
      obj.userName
    );
    
    let JourneyAllocationId = await allocateJourney( 
      obj.url, assignmentObj, 
      obj.accessToken, 
      obj.journeyId
      );
    
    return JourneyAllocationId;
  },
};
