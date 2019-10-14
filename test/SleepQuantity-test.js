const chai = require('chai');
const expect = chai.expect;
const SleepQuantity = require('../src/SleepQuantity');

describe('SleepQuantity', () => {
  let sleepQuantity;
  let sleepData;
  let weeklyData;
  let sleepQuantity2;

  beforeEach( () => {
    sleepData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "hoursSlept": 7,
        "sleepQuality": 4.7
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "hoursSlept": 8.2,
        "sleepQuality": 3.5
      },
      {
        "userID": 3,
        "date": "2019/06/15",
        "hoursSlept": 8.2,
        "sleepQuality": 4.1
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "hoursSlept": 5.4,
        "sleepQuality": 2.6
      },
      {
        "userID": 2,
        "date": "2019/06/16",
        "hoursSlept": 7.3,
        "sleepQuality": 3.9
      },
      {
        "userID": 3,
        "date": "2019/06/16",
        "hoursSlept": 2,
        "sleepQuality": 5
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "hoursSlept": 6.7,
        "sleepQuality": 3.1
      },
      {
        "userID": 2,
        "date": "2019/06/17",
        "hoursSlept": 9,
        "sleepQuality": 4.9
      },
      {
        "userID": 3,
        "date": "2019/06/17",
        "hoursSlept": 6.2,
        "sleepQuality": 3.8
      }
    ];
    sleepQuantity = new SleepQuantity(sleepData);

    weeklyData = [
      {
        "userID": 3,
        "date": "2019/06/17",
        "hoursSlept": 6.2,
        "sleepQuality": 3.8
      },
      {
        "userID": 3,
        "date": "2019/06/18",
        "hoursSlept": 4.6,
        "sleepQuality": 2.9
      },
      {
        "userID": 3,
        "date": "2019/06/19",
        "hoursSlept": 5.8,
        "sleepQuality": 4.2
      },
      {
        "userID": 3,
        "date": "2019/06/20",
        "hoursSlept": 9.3,
        "sleepQuality": 4
      },
      {
        "userID": 3,
        "date": "2019/06/21",
        "hoursSlept": 7.9,
        "sleepQuality": 3.1
      },
      {
        "userID": 3,
        "date": "2019/06/22",
        "hoursSlept": 5.7,
        "sleepQuality": 3.9
      },
      {
        "userID": 3,
        "date": "2019/06/23",
        "hoursSlept": 9.4,
        "sleepQuality": 4.8
      },
      {
        "userID": 3,
        "date": "2019/06/24",
        "hoursSlept": 4,
        "sleepQuality": 2.1
      },
      {
        "userID": 2,
        "date": "2019/06/17",
        "hoursSlept": 3.2,
        "sleepQuality": 3.1
      },
      {
        "userID": 2,
        "date": "2019/06/18",
        "hoursSlept": 3.6,
        "sleepQuality": 2.9
      },
      {
        "userID": 2,
        "date": "2019/06/19",
        "hoursSlept": 5.8,
        "sleepQuality": 1
      },
      {
        "userID": 2,
        "date": "2019/06/20",
        "hoursSlept": 9.3,
        "sleepQuality": 3.1
      },
      {
        "userID": 2,
        "date": "2019/06/21",
        "hoursSlept": 7.9,
        "sleepQuality": 3.1
      },
      {
        "userID": 2,
        "date": "2019/06/22",
        "hoursSlept": 5.7,
        "sleepQuality": 2.3
      },
      {
        "userID": 2,
        "date": "2019/06/23",
        "hoursSlept": 9.4,
        "sleepQuality": 2.2
      },
      {
        "userID": 2,
        "date": "2019/06/24",
        "hoursSlept": 4,
        "sleepQuality": 2.1
      }
    ];
    sleepQuantity2 = new SleepQuantity(weeklyData);
  })

  it('should pass in sleepQuantity data', () => {
    expect(sleepQuantity.data).to.equal(sleepData);
  });

  it('should calculate lifetime average hours slept', () => {
    expect(sleepQuantity.calculateLifeTimeAvgHoursSlept(2)).to.equal(8.1);
  });

  it('should return hours slept when given a date and userID', () => {
    expect(sleepQuantity.returnHoursSlept(1, "2019/06/17")).to.equal(6.7);
  });

  it('should be able to return the weekly hours slept with a date and userID', () => {
    expect(sleepQuantity2.returnWeeklyHoursSlept(2, "2019/06/24")).to.deep.equal([3.6, 5.8, 9.3, 7.9, 5.7, 9.4, 4]);
  });

  it('should be able to calculate the user or users that slept the most on a given day', () => {
    expect(sleepQuantity.calculateMostSleep("2019/06/17")).to.equal("User2");
    expect(sleepQuantity.calculateMostSleep("2019/06/15")).to.equal("User2 and User3");
  });

  it('should be able to calculate the overall sleep average for all users', () => {
    expect(sleepQuantity.calculateOverallHoursSleptAvg()).to.equal(6.6);
  })
})
