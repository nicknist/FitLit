const chai = require('chai');
const expect = chai.expect;
const Minutes = require('../src/Minutes');

describe('Minutes', () => {
  let activityData;
  let minutes;
  let weeklyData;
  let minutes2;

  beforeEach(() => {
    activityData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 3577,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numSteps": 4294,
        "minutesActive": 138,
        "flightsOfStairs": 10
      },
      {
        "userID": 3,
        "date": "2019/06/15",
        "numSteps": 7402,
        "minutesActive": 116,
        "flightsOfStairs": 33
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "numSteps": 3486,
        "minutesActive": 114,
        "flightsOfStairs": 32
      },
      {
        "userID": 2,
        "date": "2019/06/16",
        "numSteps": 11374,
        "minutesActive": 213,
        "flightsOfStairs": 13
      },
      {
        "userID": 3,
        "date": "2019/06/16",
        "numSteps": 3277,
        "minutesActive": 110,
        "flightsOfStairs": 10
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numSteps": 5702,
        "minutesActive": 18,
        "flightsOfStairs": 20
      },
      {
        "userID": 2,
        "date": "2019/06/17",
        "numSteps": 7432,
        "minutesActive": 156,
        "flightsOfStairs": 23
      },
      {
        "userID": 3,
        "date": "2019/06/17",
        "numSteps": 5486,
        "minutesActive": 142,
        "flightsOfStairs": 23
      }
    ];

    minutes = new Minutes(activityData);

    weeklyData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 3577,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "numSteps": 4294,
        "minutesActive": 138,
        "flightsOfStairs": 10
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numSteps": 7402,
        "minutesActive": 116,
        "flightsOfStairs": 33
      },
      {
        "userID": 1,
        "date": "2019/06/18",
        "numSteps": 3486,
        "minutesActive": 114,
        "flightsOfStairs": 32
      },
      {
        "userID": 2,
        "date": "2019/06/18",
        "numSteps": 11374,
        "minutesActive": 213,
        "flightsOfStairs": 13
      },
      {
        "userID": 1,
        "date": "2019/06/19",
        "numSteps": 3277,
        "minutesActive": 110,
        "flightsOfStairs": 10
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "numSteps": 5702,
        "minutesActive": 18,
        "flightsOfStairs": 20
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "numSteps": 7432,
        "minutesActive": 156,
        "flightsOfStairs": 23
      },
      {
        "userID": 1,
        "date": "2019/06/22",
        "numSteps": 5486,
        "minutesActive": 142,
        "flightsOfStairs": 23
      }
    ];
      minutes2 = new Minutes(weeklyData);
  })

  it('should return minutes active for a given day and user', () => {
    expect(minutes.returnActiveMinutes(2, "2019/06/16")).to.equal(213);
  });

  it('should calculate the weekly average based on a date and userID', () => {
    expect(minutes2.calculateWeeklyActivityAvg(1, "2019/06/21")).to.equal(113)
  });

  it('should calculate the overall average of minutes based on date', () => {
    expect(minutes.calculateOverallActivityAvg("2019/06/15")).to.equal(131);
  });

  it('should be able to find the most active day for a user', () => {
    expect(minutes.findMostActiveDay(2)).to.equal("WOW! On 2019/06/16 you were active for 213 minutes!");
  })
})
