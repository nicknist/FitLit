window.addEventListener('load', loadDashBoard);
document.querySelector('#menu-btn').addEventListener('click', toggleNavMenu);

function loadDashBoard() {
  let instantiatedUsers = userData.map((user) => new User(user));
  let userRepo = new UserRepository(instantiatedUsers);
  updateUserInfo(userRepo.returnUserData(36), userRepo.calculateAvgStepGoal());
  updateHydrationInfo();
}

function updateUserInfo(userObj, avgStepGoal) {
  $('#welcome-message').text(userObj.name);
  $('#user-id').html(`User ID:<br><br> ${userObj.id}<br>`);
  $('#user-name').html(`Name:<br><br> ${userObj.name}<br>`);
  $('#user-address').html(`Address:<br><br> ${userObj.address}<br>`);
  $('#user-email').html(`Email:<br><br> ${userObj.email}<br>`);
  $('#user-stride').html(`Stride Length:<br><br> ${userObj.strideLength}<br>`);
  $('#user-step-goal').html(`Daily Step Goal:<br><br> ${userObj.dailyStepGoal}<br>`);
  $('#user-friends').html(`Friends:<br><br> ${userObj.friends}<br>`);
  $('#user-compare-goal').html(`Your step goal is ${userObj.dailyStepGoal} and the average is ${avgStepGoal}`)
}

function updateHydrationInfo() {
  
}

function toggleNavMenu(event) {
  if (document.querySelector('nav').classList.contains('hidden')) {
    document.querySelector('nav').classList.remove('hidden');
    $('.menu-div1').css('margin-right', '40px');
    $('.menu-div3').css('margin-right', '0px');
  } else {
    document.querySelector('nav').classList.add('hidden');
    $('.menu-div1').css('margin-right', '0px');
    $('.menu-div3').css('margin-right', '40px');
  }
}
