class Climb {
  constructor(data) {
    this.data = data;
  }

  findHighestClimbDay(userID) {
    let userInstances = this.data.filter(data => data.userID === userID);
    userInstances.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs);
    return `On ${userInstances[0].date} you climbed ${userInstances[0].flightsOfStairs} flights of stairs!`;
  }

  calculateOverallClimbAvg(date) {
    let userClimbs = this.data.filter(data => data.date === date);
    return Math.floor(userClimbs.reduce((acc, sum) => acc += sum.flightsOfStairs, 0) / userClimbs.length);
  }

  returnWeeklyClimb(userID, date) {
    let userInstances = this.data.filter(data => data.userID === userID);
    let specificIndex = userInstances.findIndex(data => date === data.date);
    let weeklyClimb = [];
    for (let i = specificIndex; i > specificIndex - 7; i--) {
      weeklyClimb.unshift(userInstances[i].flightsOfStairs);
    }
    return weeklyClimb;
  }

  calculateLifeTimeClimbTotal(userID) {
    let userInstances = this.data.filter(data => data.userID === userID);
    let totalStairs = userInstances.reduce((acc, sum) => acc += sum.flightsOfStairs, 0);
    return `WOW! You've climbed ${totalStairs} total stairs!`
  }
}

if (module !== undefined) {
  module.exports = Climb;
}
