const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("EduCare", (m) => {
  const educareNFT = m.contract("EduCare", [
    // params
  ]);

  return { educareNFT };
})