describe("DepthTester", function () {
  let depthTester;

  beforeEach(async function () {
    const DepthTester = await ethers.getContractFactory("DepthTester");
    depthTester = await DepthTester.deploy();
    await depthTester.waitForDeployment();
  });

  it("should fail when call stack is too deep", async function () {
    let i = 1;
    let maxDepth = 0;

    while (true) {
      try {
        console.log(`Trying depth: ${i}`);
        await depthTester.dive(i);
        maxDepth = i;
        i++;
      } catch (e) {
        console.log("Caught error at depth:", i);
        console.log("Error message:", e.message);
        console.log("Max call depth before failure:", maxDepth);
        break;
      }
    }
  });
});

