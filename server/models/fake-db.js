const Rental = require("./rental");
const mongoose = require("mongoose");
const User = require("./user");
class Fakedb {
  constructor() {
    this.rentals = [
      {
        title: "Nice view on ocean",
        city: "San Francisco",
        street: "Main street",
        category: "condo",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 4,
        shared: false,
        description: "Very nice apartment in center of the city.",
        dailyRate: 43
      },
      {
        title: "Modern apartment in center",
        city: "New York",
        street: "Time Square",
        category: "apartment",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 1,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyRate: 11
      },
      {
        title: "Old house in nature",
        city: "Spisska Nova Ves",
        street: "Banicka 1",
        category: "house",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 5,
        shared: false,
        description: "Very nice apartment in center of the city.",
        dailyRate: 23
      },
      {
        title: "Amazing modern place",
        city: "San Francisco",
        street: "Green street",
        category: "house",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 2,
        shared: false,
        description: "Hiking routes 10 min walking away",
        dailyRate: 140
      },
      {
        title: "Apartment In China Town",
        city: "San Francisco",
        street: "Union Street",
        category: "apartment",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 3,
        shared: false,
        description: "Very nice apartment in China Town",
        dailyRate: 89
      },
      {
        title: "House with Garden",
        city: "New York",
        street: "Long Island, Queens",
        category: "house",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 6,
        shared: false,
        description: "Very nice house in Long Island with garden",
        dailyRate: 189
      },
      {
        title: "Cozy modern Condo",
        city: "New York",
        street: "Penn Station",
        category: "condo",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 3,
        shared: true,
        description: "Building close to Penn Station",
        dailyRate: 68
      }
    ];

    this.users = [
      {
        username: "test",
        email: "test@test.com",
        password: "minhkhang"
      },
      {
        username: "test1",
        email: "test1@test.com",
        password: "minhkhang"
      }
    ];
  }

  async cleanDb() {
    await User.remove({});
    //  we will wait to remove first as synchronously before we can push it back
    await Rental.remove({});
  }

  pushDataToDb() {
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);

    this.rentals.forEach(rental => {
      const newRental = new Rental(rental);
      newRental.user = user;

      user.rentals.push(newRental);
      newRental.save();
    });
    user.save();
    user2.save();
  }

  async seedDb() {
    await this.cleanDb();
    this.pushDataToDb();
  }
}

module.exports = Fakedb;
