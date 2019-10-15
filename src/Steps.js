class Steps {
  constructor(data) {
    this.data = data
  }

  calculateMilesWalked(userID, date, userStrideLength) {
    let userSteps = this.data.find(data => data.date === date && data.userID === userID).numSteps;
    return Math.floor(((userSteps * userStrideLength) / 5280) * 10) / 10;
  }

  checkStepGoal(userID, date, stepGoal) {
    let userSteps = this.data.find(data => data.date === date && data.userID === userID).numSteps;
    if (userSteps >= stepGoal) {
      return true;
    } else {
      return false;
    }
  }

  returnDaysGoalReached(userID, stepGoal) {
    let userSteps = this.data.filter(data => data.userID === userID);
    let daysGoalReached = userSteps.filter(day => day.numSteps >= stepGoal);
    return daysGoalReached.map(day => day.date);
  }

  calculateOverallStepAvg(date) {
    let userInstances = this.data.filter(data => data.date === date);
    return Math.floor((userInstances.reduce((acc, sum) => acc += sum.numSteps, 0)) / userInstances.length);
  }

  findHighestStepDay(userID) {
    let userInstances = this.data.filter(data => data.userID === userID);
    userInstances.sort((a, b) => b.numSteps - a.numSteps);
    return userInstances[0].date;
  }
}

if (module !== undefined) {
  module.exports = Steps;
}