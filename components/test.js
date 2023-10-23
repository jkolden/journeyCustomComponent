let helper = require("./postHelper.js");

let obj = {
  url: "https://fa-etaq-test-saasfademo1.ds-fa.oraclepdemos.com/",
  accessToken: 1,
  userName: "ANTHONY.WESLEY",
  journeyId:"300000258682074"

}

helper.doStuff(obj).then((result) => {
  console.log(result);
});
