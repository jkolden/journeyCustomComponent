const { convertChangesToDMP } = require("prettier");
const postHelper = require("./postHelper.js");

("use strict");

// You can use your favorite http client package to make REST calls, however, the node fetch API is pre-installed with the bots-node-sdk.
// Documentation can be found at https://www.npmjs.com/package/node-fetch
// Un-comment the next line if you want to make REST calls using node-fetch.
// const fetch = require("node-fetch");

module.exports = {
  
  metadata: () => ({
    name: "journeyService",
    properties: {
      accessToken: { required: true, type: "string" },
      userName: { required: true, type: "string" },
      url: { required: true, type: "string" },
      journeyId: { required: true, type: "string" },
    },
    supportedActions: ["success", "error"],
  }),
  invoke: (context, done) => {

    const url = context.properties().url;
    const accessToken = context.properties().accessToken;
    const userName = context.properties().userName;
    const journeyId = context.properties().journeyId;

    let id = parseInt(journeyId);
  
    postHelper
      .doStuff({
        accessToken: accessToken,
        userName: userName,
        url: url,
        journeyId: id
      })
      .then((result) => {

        if (typeof result === 'number') {
          
          context.variable("JourneyAllocationId", result);
          context.transition("success");
          done();

        } else {

          context.transition("error");
          done();

        }

        
    
      });
  },
};
