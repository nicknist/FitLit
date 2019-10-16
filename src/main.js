window.addEventListener('load', loadDashBoard);
document.querySelector('#menu-btn').addEventListener('click', toggleNavMenu);

function loadDashBoard() {
  let instantiatedUsers = userData.map((user) => new User(user));
  let userRepo = new UserRepository(instantiatedUsers);
  updateUserInfo(userRepo.returnUserData(20), userRepo.calculateAvgStepGoal(), userRepo);
  updateHydrationInfo(20);
  updateSleepQualityInfo(20);
  updateSleepQuantityInfo(20);
  updateMinutesInfo(20);
  updateStepInfo(20, userRepo);
  updateStairInfo(20);
}

function updateUserInfo(userObj, avgStepGoal, userRepo) {
  $('#welcome-message').text(userObj.name);
  $('#user-id').html(`User ID:<br><br> ${userObj.id}<br>`);
  $('#user-name').html(`Name:<br><br> ${userObj.name}<br>`);
  $('#user-address').html(`Address:<br><br> ${userObj.address}<br>`);
  $('#user-email').html(`Email:<br><br> ${userObj.email}<br>`);
  $('#user-stride').html(`Stride Length:<br><br> ${userObj.strideLength}<br>`);
  $('#user-step-goal').html(`Daily Step Goal:<br><br> ${userObj.dailyStepGoal}<br>`);
  $('#user-friends').html(`Friends:<br><br><ul id="friend-info"></ul>`);
  getFriendInformation(userObj, userRepo);
  $('#user-compare-goal').html(`Your step goal is ${userObj.dailyStepGoal} and the average is ${avgStepGoal}`)
}

function getFriendInformation(userObj, userRepo) {
  let userFriends = userObj.friends;
  userFriends.push(userObj.id);
  let steps = new Steps(activityData);
  let userInstances = steps.data.filter(data => data.userID === userObj.id);
  let date = userInstances[userInstances.length - 1].date;
  let weekWinner = null;
  userFriends.forEach(friend => {
    if (weekWinner < getFriendStepInfo(friend, date, steps)) {
      weekWinner = getFriendStepInfo(friend, date, steps);
      weekWinnerMsg = `The winner for the week is ${getFriendName(userRepo, friend)} with ${getFriendStepInfo(friend, date, steps)} steps!`;
    }
    $('#friend-info').append(`<li>${getFriendName(userRepo, friend)} - ${getFriendStepInfo(friend, date, steps)}</li>`)
  });
  $('#friend-info').append(weekWinnerMsg);
}

function getFriendName(userRepo, friend) {
  return userRepo.data.find(user => user.id === friend).name.split(' ')[0];
}

function getFriendStepInfo(friend, date, steps) {
  return steps.returnWeeklyStepCount(friend, date).reduce((acc, sum) => acc += sum, 0);
}

function updateHydrationInfo(userID) {
  let hydration = new Hydration(hydrationData);
  let userInstances =  hydration.hydrationData.filter(data => data.userID === userID);
  let date = userInstances[userInstances.length - 1].date;
  $('#user-hydration-today').html(`You have drank ${hydration.returnConsumption(userID, date)} ounces today!`);
  let weeklyHydration = hydration.returnWeekConsumption(userID, date);
  $('#user-hydration-week').html(`Previous Weeks' Consumption: ${weeklyHydration[0]} ounces, ${weeklyHydration[1]} ounces, ${weeklyHydration[2]} ounces, ${weeklyHydration[3]} ounces, ${weeklyHydration[4]} ounces, ${weeklyHydration[5]} ounces, and  ${weeklyHydration[6]} ounces today!`);
  $('#user-hydration-week').append(`<ul>Your Top 5 Days for Hydration: ${hydration.returnTopFiveHydrationDays(userID)}</ul>`);
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
  $('#user-minutes-today').html(`WOW! You were active for ${minutes.returnActiveMinutes(userID, date)} minutes today! The average of all our users was ${minutes.calculateOverallActivityAvg(date)} minutes active today.`);
  let weeklyMinutes = minutes.returnWeeklyActivity(userID, date);
  $('#user-minutes-week').html(`Previous Weeks' Minutes: ${weeklyMinutes[0]} minutes, ${weeklyMinutes[1]} minutes, ${weeklyMinutes[2]} minutes, ${weeklyMinutes[3]} minutes, ${weeklyMinutes[4]} minutes, ${weeklyMinutes[5]} minutes, and  ${weeklyMinutes[6]} minutes active today!`)
}

function updateStepInfo(userID, userRepo) {
  let steps = new Steps(activityData);
  let userInstances = steps.data.filter(data => data.userID === userID);
  let date = userInstances[userInstances.length -1].date;
  $('#user-steps-today').html(`You went ${userInstances[userInstances.length - 1].numSteps} steps today, which translates to ${steps.calculateMilesWalked(userID, date, userRepo.returnUserData(userID).strideLength)} miles!`);
  $('#user-steps-compare').html(`The average user went ${steps.calculateOverallStepAvg(date)} steps today.`);
  let weeklySteps = steps.returnWeeklyStepCount(userID, date);
  $('#user-steps-weekly').html(`Previous Weeks' Steps: ${weeklySteps[0]} steps, ${weeklySteps[1]} steps, ${weeklySteps[2]} steps, ${weeklySteps[3]} steps, ${weeklySteps[4]} steps, ${weeklySteps[5]} steps, and ${weeklySteps[6]} steps today!`);
  updateStepIncreaseInfo(userID, steps, date, userInstances);
}

function updateStepIncreaseInfo(userID, steps, date, userInstances) {
  let positiveDays = userInstances.filter((instance, i) => {
    if (i > 1 && instance.numSteps > userInstances[i-1].numSteps && userInstances[i-1].numSteps > userInstances[i-2].numSteps) {
      return true;
    };
  })
  $('#user-steps-weekly').append(`<br> Here are the days where you went up in steps the previous two days:<br><ul id="step-increase"></ul>`);
  positiveDays.forEach((day) => {
    $('#step-increase').append(`<li>${day.date}</li>`);
  })
}

function updateStairInfo(userID) {
  let climb = new Climb(activityData);
  let userInstances = climb.data.filter(data => data.userID === userID);
  let date = userInstances[userInstances.length -1].date;
  $('#user-stairs-today').html(`You've climbed ${userInstances[userInstances.length -1].flightsOfStairs} flights of stairs today, while the average user has climbed ${climb.calculateOverallClimbAvg(date)} flights of stairs today. Neat.`);
  let weeklyClimb = climb.returnWeeklyClimb(userID, date);
  $('#user-stairs-week').html(`Previous Weeks' Climb: ${weeklyClimb[0]} flights of stairs, ${weeklyClimb[1]} flights of stairs, ${weeklyClimb[2]} flights of stairs, ${weeklyClimb[3]} flights of stairs, ${weeklyClimb[4]} flights of stairs, ${weeklyClimb[5]} flights of stairs, and ${weeklyClimb[6]} flights of stairs today!`);
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

$('.info-card').click(flipCard);

function flipCard() {
  $(this).toggleClass('flip');
}
