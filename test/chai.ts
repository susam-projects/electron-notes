const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const assertArrays = require("chai-arrays");

chai.use(assertArrays);
chai.use(chaiAsPromised);

export const expect = chai.expect;
