import { Quality, Audio } from "./constants.js";

export const downloadEpisode = async (context, url, quality, audio) => {
  try {
    const page = await context.newPage();

    await page.goto(url);

    console.log("Clicking download button");
    await page.locator("#download-btn").click();

    const modal = page.locator("#downloadModal");
    await modal.waitFor({ state: "visible" });

    const downloadPromise = context.waitForEvent("download", {
      timeout: 30000,
    });

    console.log("Starting Download");
    await modal
      .locator("a.dl-bubble-item", { hasText: Quality.toString(quality) })
      .click();

    const download = await downloadPromise;

    const path = `/home/${process.env.USER}/Downloads/${download.suggestedFilename()}`;
    await download.saveAs(path);
    console.log(`Success: ${path}`);

    await page.close();
  } catch (error) {
    console.error(`Error downloading episode: ${error.message}`);
  }
};
