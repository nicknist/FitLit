class Hydration {
  constructor(hydration) {
    this.hydrationData = hydration;
  }

  calculateLifeTimeAvgConsumption(userID) {
    let userInstances = this.hydrationData.filter((data) => data.userID === userID);
    let totalUserConsumption = userInstances.reduce((acc, data) => {
      return acc += data.numOunces;
    }, 0);
    return totalUserConsumption / userInstances.length;
  }

  returnConsumption(userID, date) {
    let userInstances =  this.hydrationData.filter((data) => data.userID === userID);
    let specificInstance = userInstances.find((data) => data.date === date);
    return specificInstance.numOunces;
  }

  returnWeekConsumption(userID, date) {
    let userInstances =  this.hydrationData.filter((data) => data.userID === userID);
    let specificIndex = userInstances.findIndex((data) => data.date === date);
    let weeklyConsumption = [];
    for(let i = specificIndex; i > (specificIndex - 7); i--) {
      weeklyConsumption.unshift(userInstances[i].numOunces);
    }
    return weeklyConsumption;
  }

  returnTopFiveHydrationDays(userID) {
    let userInstances =  this.hydrationData.filter((data) => data.userID === userID);
    userInstances.sort((a, b) => b.numOunces - a.numOunces);
    let top5 = '';
    userInstances.forEach((instance, i) => {
      if (i < 5) {
        top5 += `<li>${i+1}: ${instance.date} with ${instance.numOunces} ounces</li>`;
      }
    });
    return top5;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
