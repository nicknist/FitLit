window.addEventListener('load', loadDashBoard);

function loadDashBoard() {
  let instantiatedUsers = userData.map((user) => new User(user));
  let userRepo = new UserRepository(instantiatedUsers);
  updateUserInfo(userRepo.returnUserData(20), userRepo.calculateAvgStepGoal());
}

function updateUserInfo(userObj, avgStepGoal) {
  $('#welcome-message').text(userObj.name);
  $('#user-id').text(userObj.id);
  $('#user-name').text(userObj.name);
  $('#user-address').text(userObj.address);
  $('#user-email').text(userObj.email);
  $('#user-stride').text(userObj.strideLength);
  $('#user-step-goal').text(userObj.dailyStepGoal);
  $('#user-friends').text(userObj.friends);
  $('#user-compare-goal').text(`Your step goal is ${userObj.dailyStepGoal} and the average is ${avgStepGoal}`)
}
