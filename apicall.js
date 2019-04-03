var vm = new Vue({
  el: '#list',
  methods: {
      onLoad: async function() {
          var namesToDisplay = [];

          var request = new XMLHttpRequest();
          request.open('GET', 'https://h93rvy36y7.execute-api.us-east-1.amazonaws.com/teams', true);
          request.onload = function () {

              // Begin accessing JSON data here
              var data = JSON.parse(this.response);
              if (request.status >= 200 && request.status < 400) {
                  console.log("sucess");

                  var vaTeams = data.filter(item => { return item["state"] == "VA" });
                  var i;
                  for (i = 0; i < vaTeams.length; i++) {
                      var members = vaTeams[i].members;
                      var j;
                      for (j = 0; j < members.length; j++) {
                          if (members[j].role == "Software Engineer" || members[j].role == "Technical Lead") {
                              var fullName = { firstName: "", lastName: "" };
                              fullName.firstName = members[j].firstName;
                              fullName.lastName = members[j].lastName;
                              namesToDisplay.push(fullName);
                          }
                      }
                  }
                  sortByLnameFname(namesToDisplay);
                  console.log(namesToDisplay);
                  displayList(namesToDisplay);


              } else {
                  console.log("we have an error");
              }
          }
          request.send();

          function displayList(listToDisplay) {
              debugger;
              var listToReturn = [];
              for (prop in listToDisplay) {
                  var propfName = listToDisplay[prop].firstName;
                  var proplName = listToDisplay[prop].lastName;
                  var fullName = propfName + " " + proplName;
                  document.getElementById('list').innerHTML += '<li>' + propfName + " " + proplName + '</li>';
              }
          }



          function sortByLnameFname(listToSort) {
              var sortedList = listToSort.sort(function (a, b) {
                  if (a.lastName < b.lastName) return -1;
                  if (a.lastName > b.lastName) return 1;
                  if (a.firstName < b.firstName) return -1;
                  if (a.firstName > b.firstName) return 1;
                  return 0;
              });
              return sortedList;
          }
      }

  },
  mounted() {
      this.onLoad();
  }
})