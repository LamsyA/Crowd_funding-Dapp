const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Crow", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    

    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();

    const Crow = await ethers.getContractFactory("Crow");
    const crow = await Crow.deploy(10);
    
    return { crow, owner };
  }

  describe("Deployment", function () {
    it("Should set the right address", async function () {
      const { crow, owner } = await loadFixture(deployContractAndSetVariables);

      expect(await crow.owner()).to.equal(owner.address);
    });


})
})