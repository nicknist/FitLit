class Minutes {
  constructor(data) {
    this.data = data;
  }

  returnActiveMinutes(userID, date) {
    return this.data.find(data => data.date === date && data.userID === userID).minutesActive;
  }

  calculateWeeklyActivityAvg(userID, date) {
    let userInstances = this.data.filter(data => data.userID === userID);
    let specificIndex = userInstances.findIndex(data => date === data.date);
    let weeklyActivity = [];
    for (let i = specificIndex; i > specificIndex - 7; i--) {
      weeklyActivity.unshift(userInstances[i].minutesActive);
    }
    return Math.floor(weeklyActivity.reduce((acc, day) => acc += day, 0) / 7);
  }

  returnWeeklyActivity(userID, date) {
    let userInstances = this.data.filter(data => data.userID === userID);
    let specificIndex = userInstances.findIndex(data => date === data.date);
    let weeklyActivity = [];
    for (let i = specificIndex; i > specificIndex - 7; i--) {
      weeklyActivity.unshift(userInstances[i].minutesActive);
    }
    return weeklyActivity;
  }

  calculateOverallActivityAvg(date) {
    let userInstances = this.data.filter(data => data.date === date);
    return Math.floor(userInstances.reduce((acc, sum) => acc += sum.minutesActive, 0) / userInstances.length);
  }

  findMostActiveDay(userID) {
    let userInstances = this.data.filter(data => data.userID === userID);
    userInstances.sort((a, b) => b.minutesActive - a.minutesActive);
    return `WOW! On ${userInstances[0].date} you were active for ${userInstances[0].minutesActive} minutes!`
  }
}

if (typeof module !== 'undefined') {
  module.exports = Minutes;
}
