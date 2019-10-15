window.addEventListener('load', loadDashBoard);
document.querySelector('#menu-btn').addEventListener('click', toggleNavMenu);

function loadDashBoard() {
  let instantiatedUsers = userData.map((user) => new User(user));
  let userRepo = new UserRepository(instantiatedUsers);
  updateUserInfo(userRepo.returnUserData(20), userRepo.calculateAvgStepGoal());
  updateHydrationInfo(20);
  updateSleepQualityInfo(20);
  updateSleepQuantityInfo(20);
  updateMinutesInfo(20);
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

function updateHydrationInfo(userID) {
  let hydration = new Hydration(hydrationData);
  let userInstances =  hydration.hydrationData.filter(data => data.userID === userID);
  let date = userInstances[userInstances.length - 1].date;
  $('#user-hydration-today').html(`You have drank ${hydration.returnConsumption(userID, date)} ounces today!`);
  let weeklyHydration = hydration.returnWeekConsumption(userID, date);
  $('#user-hydration-week').html(`Previous Weeks' Consumption: ${weeklyHydration[0]} ounces, ${weeklyHydration[1]} ounces, ${weeklyHydration[2]} ounces, ${weeklyHydration[3]} ounces, ${weeklyHydration[4]} ounces, ${weeklyHydration[5]} ounces, and  ${weeklyHydration[6]} ounces today!`)
}

function updateSleepQualityInfo(userID) {
  let sleepQuality = new SleepQuality(sleepData);
  let userInstances = sleepQuality.data.filter(data => data.userID === userID);
  let date = userInstances[userInstances.length -1].date;
  $('#user-sleep-quality-today').html(`Your sleep was rated ${sleepQuality.returnSleepQuality(userID, date)} out of 5 last night!`)
  let weeklySleep = sleepQuality.returnWeeklySleepQuality(userID, date);
  $('#user-sleep-quality-week').html(`Previous Weeks' Sleep Quality Scores: ${weeklySleep[0]}/5, ${weeklySleep[1]}/5, ${weeklySleep[2]}/5, ${weeklySleep[3]}/5, ${weeklySleep[4]}/5, ${weeklySleep[5]}/5, and  ${weeklySleep[6]}/5 last night!`);
  $('#user-sleep-quality-average').html(`Your lifetime sleep quality average is ${sleepQuality.calculateLifetimeAvgSleepQuality(userID)} out of 5!`);
}

function updateSleepQuantityInfo(userID) {
  let sleepQuantity = new SleepQuantity(sleepData);
  let userInstances = sleepQuantity.data.filter(data => data.userID === userID);
  let date = userInstances[userInstances.length -1].date;
  $('#user-sleep-quantity-today').html(`You slept ${sleepQuantity.returnHoursSlept(userID, date)} hours last night!`);
  let weeklySleep = sleepQuantity.returnWeeklyHoursSlept(userID, date);
  $('#user-sleep-quantity-week').html(`Previous Weeks' Hours Slept: ${weeklySleep[0]} hours, ${weeklySleep[1]} hours slept, ${weeklySleep[2]} hours slept, ${weeklySleep[3]} hours slept, ${weeklySleep[4]} hours slept, ${weeklySleep[5]} hours slept, and  ${weeklySleep[6]} hours slept last night!`);
  $('#user-sleep-quantity-average').html(`You average ${sleepQuantity.calculateLifeTimeAvgHoursSlept(userID)} hours of sleep per night`);
}

function updateMinutesInfo(userID) {
  let minutes = new Minutes(activityData);
  let userInstances = minutes.data.filter(data => data.userID === userID);
  let date = userInstances[userInstances.length - 1].date;
  $('#user-minutes-today').html(`WOW! You were active for ${minutes.returnActiveMinutes(userID, date)} minutes today! The average of all our users was ${minutes.calculateOverallActivityAvg(date)} minutes active today.`)
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
