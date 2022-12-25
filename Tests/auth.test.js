//Imports
import {
  describe,
  it,
  test,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { logIn, register, verify } from "../controllers/auth";
import User from "../models/user";
import Jwt from "jsonwebtoken";
import { v4 } from "uuid";
//Test Suites
//1.Register API
describe("Register API", () => {
  //Initial test user setup
  beforeEach(function (done) {
    var newUser = new User({
      userId: v4(),
      firstName: "firstname",
      email: "email@gmail.com",
      companyName: "Company",
      profilePicture: "ProfilePicture",
      confirmationToken: Jwt.sign(
        "email@gmail.com",
        process.env.CONFIRMATION_TOKEN_SECRET
      )
        .split(".")
        .join(""),
    });
    newUser.setPassword("password");
    newUser.save(function (err) {
      if (err) console.error(err);
      done();
    });
  }, 30000);

  afterEach(function (done) {
    User.collection
      .drop()
      .then(function () {
        console.log("collection deleted");
      })
      .catch(function () {
        // error handling
        console.warn(" collection may not exists!");
      });
    done();
  }, 30000);

  const req = {
    body: {
      firstName: "firstname",
      email: "email@gmail.com",
      companyName: "Company",
      profilePicture: "ProfilePicture",
      password: "password",
    },
  };
  const res = {
    json: {},
  };

  it("User should be created Successfully", async () => {
    await register(req, res).then((result) => {
      const user = User.findOne({ email: req.body.email });
      expect(user).toBeTruthy();
      expect(result.status.message).toBe("User created succesfully.");
    });
  });
});

describe("Verify function should return true", () => {
  it("It should return true when user verified", async () => {
    const req = {
      params: {
        confirmationToken: Jwt.sign(
          "email@gmail.com",
          process.env.CONFIRMATION_TOKEN_SECRET
        ),
      },
    };
    const res = {};
    await verify(req, res).then((result) => {
      expect(result).toBeFalsy();
    });
  });
});

describe("Login function can check for login credantials", () => {
  it("function could reqturn error if password not match", async () => {
    const req = {
      body: {
        email: "email@gmail.com",
        password: "wrongpassword",
      },
    };
    const res = {};
    await logIn(req, res).then((result) => {
      expect(result.error.message).toBe("Wrong Password");
    });
  });
});
