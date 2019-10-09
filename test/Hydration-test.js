const chai = require('chai');
const expect = chai.expect;
const Hydration = require('../src/Hydration');


describe('Hydration', () => {
  let hydration;
  let hydrationData;
  let weeklyData;
  let hydrationWeeklyData;

  beforeEach( () => {
    hydrationData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "numOunces": 28
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numOunces": 29
      },
      {
        "userID": 3,
        "date": "2019/06/15",
        "numOunces": 20
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "numOunces": 40
      },
      {
        "userID": 2,
        "date": "2019/06/16",
        "numOunces": 90
      },
      {
        "userID": 3,
        "date": "2019/06/16",
        "numOunces": 10
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numOunces": 25
      },
      {
        "userID": 2,
        "date": "2019/06/17",
        "numOunces": 37
      },
      {
        "userID": 3,
        "date": "2019/06/17",
        "numOunces": 50
      }];
      hydration = new Hydration(hydrationData);

      weeklyData = [
        {
          "userID": 1,
          "date": "2019/06/15",
          "numOunces": 28
        },
        {
          "userID": 1,
          "date": "2019/06/16",
          "numOunces": 29
        },
        {
          "userID": 1,
          "date": "2019/06/17",
          "numOunces": 20
        },
        {
          "userID": 1,
          "date": "2019/06/18",
          "numOunces": 40
        },
        {
          "userID": 1,
          "date": "2019/06/19",
          "numOunces": 90
        },
        {
          "userID": 2,
          "date": "2019/06/19",
          "numOunces": 17
        },
        {
          "userID": 1,
          "date": "2019/06/20",
          "numOunces": 10
        },
        {
          "userID": 1,
          "date": "2019/06/21",
          "numOunces": 25
        },
        {
          "userID": 2,
          "date": "2019/06/22",
          "numOunces": 50
        },
        {
          "userID": 1,
          "date": "2019/06/22",
          "numOunces": 37
        },
        {
          "userID": 2,
          "date": "2019/06/23",
          "numOunces": 50
        }];
        hydrationWeeklyData = new Hydration(weeklyData);
    })

    it('should pass in hydration data', () => {
      expect(hydration.hydrationData).to.equal(hydrationData);
    });

    it('should calculate the total consumption from a user', () => {
      expect(hydration.calculateLifeTimeAvgConsumption(2)).to.equal(52);
    });

    it('should calculate consumption from a user based on a date', () => {
      expect(hydration.returnConsumption(2, '2019/06/17')).to.equal(37);
    });

    it('should be able to return a week of consumption', () => {
      expect(hydrationWeeklyData.returnWeekConsumption(1, '2019/06/22')).to.deep.equal([29, 20, 40, 90, 10, 25, 37]);
    });
})
