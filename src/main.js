window.addEventListener('load', loadDashBoard);

function loadDashBoard() {
  let instantiatedUsers = userData.map((user) => new User(user));
  let userRepo = new UserRepository(instantiatedUsers);
  updateUserInfo(userRepo.returnUserData(38), userRepo.calculateAvgStepGoal());
  updateHydrationInfo();
}

function updateUserInfo(userObj, avgStepGoal) {
  $('#welcome-message').text(userObj.name);
  $('#user-id').html(`User ID:<br> ${userObj.id}<br><br>`);
  $('#user-name').html(`Name:<br> ${userObj.name}<br><br>`);
  $('#user-address').html(`Address:<br> ${userObj.address}<br><br>`);
  $('#user-email').html(`Email:<br> ${userObj.email}<br><br>`);
  $('#user-stride').html(`Stride Length:<br> ${userObj.strideLength}<br><br>`);
  $('#user-step-goal').html(`Daily Step Goal:<br> ${userObj.dailyStepGoal}<br><br>`);
  $('#user-friends').html(`Friends:<br> ${userObj.friends}<br><br>`);
  $('#user-compare-goal').html(`Your step goal is ${userObj.dailyStepGoal} and the average is ${avgStepGoal}`)
}

function updateHydrationInfo() {
  
}
