class SleepQuantity {
  constructor(data) {
    this.data = data;
  }

  calculateLifeTimeAvgHoursSlept(userID) {
    let userInstances = this.data.filter(data => data.userID === userID);
    let totalUserSleepQuantity = userInstances.reduce((acc, user) => acc += user.hoursSlept, 0);
    return Math.floor((totalUserSleepQuantity / userInstances.length) * 10) / 10;
  }

  returnHoursSlept(userID, date) {
    return this.data.find(data => data.userID === userID && data.date === date).hoursSlept;
  }

  returnWeeklyHoursSlept(userID, date) {
    let userInstances = this.data.filter(data => data.userID === userID);
    let specificInstance = userInstances.findIndex(data => data.date === date);
    let weeklyQuantity = [];
    for (let i = specificInstance; i > specificInstance - 7; i--) {
      weeklyQuantity.unshift(userInstances[i].hoursSlept);
    }
    return weeklyQuantity;
  }

  calculateMostSleep(date) {
    let usersOnDate = this.data.filter(data => data.date === date);
    usersOnDate.sort((a, b) => b.hoursSlept - a.hoursSlept);
    if (usersOnDate[0].hoursSlept === usersOnDate[1].hoursSlept) {
      let multipleUsers = usersOnDate.filter(user => user.hoursSlept === usersOnDate[0].hoursSlept);
      return multipleUsers.map(user => `User${user.userID}`).join(' and ');
    }
    return `User${usersOnDate[0].userID}`;
  }

  calculateOverallHoursSleptAvg() {
    let overallSlept = this.data.reduce((acc, sum) => acc += sum.hoursSlept, 0);
    return Math.floor((overallSlept / this.data.length) * 10) / 10;
  }
}

if (typeof module !== 'undefined') {
  module.exports = SleepQuantity;
}
