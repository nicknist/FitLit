class SleepQuality {
  constructor(data) {
    this.data = data;
  }

  calculateLifetimeAvgSleepQuality(userID) {
    let userInstances = this.data.filter(data => data.userID === userID);
    let totalUserSleepQuality = userInstances.reduce((acc, user) => acc += user.sleepQuality, 0);
    return totalUserSleepQuality / userInstances.length; 
  }

  returnSleepQuality(userID, date) {
    let userInstances = this.data.find(data => data.userID === userID && data.date === date);
     return userInstances.sleepQuality;
  }

  returnWeeklySleepQuality(userID, date) {
    let userInstances = this.data.filter(data => data.userID === userID);
    let specificInstance = userInstances.findIndex(data => data.date === date);
    let weeklyQuality = [];
    for (let i = specificInstance; i > specificInstance - 7; i--) {
      weeklyQuality.unshift(userInstances[i].sleepQuality);
    }
    return weeklyQuality;
  }

  calculateOverallSleepAvg() {
    return Math.floor((this.data.reduce((acc, user) => acc += user.sleepQuality, 0) / this.data.length) * 10) / 10;
  }

  calculateWeeklyAvg(userID, date) {
    let userWeekQualities = this.returnWeeklySleepQuality(userID, date);
    return Math.floor((userWeekQualities.reduce((acc, day) => acc += day, 0) / 7) * 10) / 10;
  }

  calculateGreatSleep(date) {
    let uniqueIDs = [];
    let greatSleepers = [];
    this.data.forEach((ele) => {
      if (!uniqueIDs.includes(ele.userID)) {
        uniqueIDs.push(ele.userID)
      } 
    });
    uniqueIDs.forEach((user) => {
      if (this.calculateWeeklyAvg(user, date) >= 3) {
        greatSleepers.push(user);
      }
    })
     return greatSleepers;
  }

}

if (module !== undefined) {
  module.exports = SleepQuality;
}

