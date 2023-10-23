const { convertChangesToDMP } = require("prettier");
const eligibilityHelper = require("./eligibilityHelper.js");

("use strict");

// You can use your favorite http client package to make REST calls, however, the node fetch API is pre-installed with the bots-node-sdk.
// Documentation can be found at https://www.npmjs.com/package/node-fetch
// Un-comment the next line if you want to make REST calls using node-fetch.
// const fetch = require("node-fetch");

module.exports = {
  
  metadata: () => ({
    name: "eligibilityService",
    properties: {
      accessToken: { required: true, type: "string" },
      userName: { required: true, type: "string" },
      url: { required: true, type: "string" }
    },
    supportedActions: ["eligible", "ineligible"],
  }),
  invoke: (context, done) => {

    const url = context.properties().url;
    const accessToken = context.properties().accessToken;
    const userName = context.properties().userName;
    
    eligibilityHelper
      .doStuff({
        accessToken: accessToken,
        userName: userName,
        url: url
      })
      .then((result) => {

        if ( result == 'Yes') {
          
          context.variable("eligibility", result);
          context.transition("eligible");
          done();

        } else {

          context.variable("eligibility", result);
          context.transition("ineligible");
          done();

        }

        
    
      });
  },
};
