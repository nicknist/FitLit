const chai = require('chai');
const expect = chai.expect;
const Steps = require('../src/Steps');
const UserRepository = require('../src/UserRepository');

describe('Steps', () => {
  let activityData;
  let steps;
  let weeklyData;
  let steps2;
  let userData;
  let userRepo;

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
        "numSteps": 15702,
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

    steps = new Steps(activityData);

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
      steps2 = new Steps(weeklyData);

      userData = [
        {
          "id": 1,
          "name": "George Springer",
          "address": "1 Astros Lane, Houston, TX 77777",
          "email": "leadoffHitter@yahoo.com",
          "strideLength": 4.3,
          "dailyStepGoal": 10000,
          "friends": [
            2,
            3
          ]
        },
        {
          "id": 2,
          "name": "Alex Bregman",
          "address": "2 Astros Lane, Houston, TX 77777",
          "email": "ALMVP@yahoo.com",
          "strideLength": 3.6,
          "dailyStepGoal": 11000,
          "friends": [
            1,
            3
          ]
        },
        {
          "id": 3,
          "name": "Justin Verlander",
          "address": "3 Astros Lane, Houston, TX 77777",
          "email": "leadoffHitter@yahoo.com",
          "strideLength": 3.9,
          "dailyStepGoal": 9000,
          "friends": [
            2,
            1
          ]
        }
      ];
      userRepo = new UserRepository(userData);
  })

  it('should be able to calculate the miles walked on a date for a user', () => {
    expect(steps.calculateMilesWalked(2, "2019/06/15", userRepo.returnUserData(2).strideLength)).to.equal(2.9);
  });

  it('should be able to check step goal based on the userID and date', () => {
    expect(steps.checkStepGoal(3, "2019/06/17", userRepo.returnUserData(3).dailyStepGoal)).to.equal(false);
  });

  it('should be able to return an array of weekly steps based on a date', () => {
    expect(steps2.returnWeeklyStepCount(1, "2019/06/21")).to.deep.equal([3577, 4294, 7402, 3486, 3277, 5702, 7432]);
  })

  it('should be able to check days that step goal was reached for a user', () => {
    expect(steps.returnDaysGoalReached(1, userRepo.returnUserData(1).dailyStepGoal)).to.deep.equal(['2019/06/17']);
  });

  it('should be able to return the average of all users for a given date', () => {
    expect(steps.calculateOverallStepAvg("2019/06/16")).to.equal(6045);
  });

  it('should be able to find the highest step day for a userID', () => {
    expect(steps.findHighestStepDay(3)).to.equal("2019/06/15");
  })

})
