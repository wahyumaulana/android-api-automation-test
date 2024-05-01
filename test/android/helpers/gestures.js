class Gestures {
  static async executeGesture({ from, to }) {
      await driver
          .action('pointer')
          .move(from.x, from.y)
          .down()
          .pause(1000)
          .move({ duration: 1000, x: to.x, y: to.y })
          .up()
          .perform();
      await driver.pause(1000); // Add a pause to ensure the swipe is completed
  }
}

async function scrollToEndOfPage() {
  const size = await driver.getWindowRect();
  const screenHeight = size.height
  console.log("SIZE",size.height)
  const startY = Math.round(screenHeight * 0.8); // Start scrolling from 80% of the screen height
  const endY = Math.round(screenHeight * 0.2); // End scrolling at 20% of the screen height
  const { width } = await driver.getWindowRect();
  const startX = Math.round(width / 2); // Start scrolling horizontally from the center of the screen
  console.log("X", startX)
  console.log("Y", startY)
  const start = { x: startX, y: startY };
  const end = { x: startX, y: endY };

  await Gestures.executeGesture({ from: start, to: end });
}

module.exports = { scrollToEndOfPage };
