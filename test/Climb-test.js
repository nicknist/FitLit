const chai = require('chai');
const expect = chai.expect;
const Climb = require('../src/Climb');

describe('Climb', () => {
  let activityData;
  let climb;


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
      climb = new Climb(activityData);
  })

  it('should be able to find the highest climb day given a userID', () => {
    expect(climb.findHighestClimbDay(2)).to.equal("On 2019/06/17 you climbed 23 flights of stairs!");
  });

  it('should be able to calculate average stairs of all users on a date', () => {
    expect(climb.calculateOverallClimbAvg("2019/06/17")).to.equal(22);
  });

  it('should be able to calculate a users lifetime climb total for a userID', () => {
    expect(climb.calculateLifeTimeClimbTotal(1)).to.equal("WOW! You've climbed 68 total stairs!");
  })

})
