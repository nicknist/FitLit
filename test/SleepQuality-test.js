const chai = require('chai');
const expect = chai.expect;
const SleepQuality = require('../src/SleepQuality')

describe('SleepQuality', () => {
  let sleepQuality;
  let sleepData;
  let weeklyData;
  let sleepQuality2;

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
        "hoursSlept": 6.9,
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
    sleepQuality = new SleepQuality(sleepData);

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
    sleepQuality2 = new SleepQuality(weeklyData);
  })

  it('should pass in sleepQuality data', () => {
    expect(sleepQuality.data).to.equal(sleepData);
  });

  it('should calculate lifetime average sleep quality', () => {
    expect(sleepQuality.calculateLifetimeAvgSleepQuality(3)).to.equal(4.3)
  });

  it('should return sleep quality for specific date', () => {
    expect(sleepQuality.returnSleepQuality(2, '2019/06/17')).to.equal(4.9);
  });

  it('should return sleep quality for each day in a given week', () => {
    expect(sleepQuality2.returnWeeklySleepQuality(3, '2019/06/24')).to.deep.equal([2.9, 4.2, 4, 3.1, 3.9, 4.8, 2.1]);
  });

  it('should calculate average sleep quality for all users', () => {
    expect(sleepQuality.calculateOverallSleepAvg()).to.equal(3.9)
  });

  it('should average out the weekly sleep quality array', () => {
    expect(sleepQuality2.calculateWeeklyAvg(3, '2019/06/24')).to.equal(3.5)
  });

  it('should return all users whose average sleep quality is greater than 3 for a given week', () => {
    expect(sleepQuality2.calculateGreatSleep('2019/06/24')).to.deep.equal([3])
  });

  it('should return the user with the highest sleep quality of sleep', () => {
    expect(sleepQuality.findGreatestNightOfSleep()).to.equal("User3 on 2019/06/16!");
  })

})
