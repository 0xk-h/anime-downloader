import { Quality, Audio } from "./constants.js";

export const downloadEpisode = async (context, url, quality, audio) => {
  try {
    const page = await context.newPage();

    await page.goto(url);

    console.log("Clicking download button");
    await page.locator("#download-btn").click();

    const modal = page.locator("#downloadModal");
    await modal.waitFor({ state: "visible" });

    console.log("Starting Download");
    await modal
      .locator("a.dl-bubble-item", { hasText: Quality.toString(quality) })
      .click();

    await page.close();
  } catch (error) {
    console.error(`Error downloading episode: ${error.message}`);
  }
};
