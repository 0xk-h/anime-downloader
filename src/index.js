import { chromium } from "playwright";

import { downloadEpisode } from "./downloader.js";
import { Quality, Audio } from "./constants.js";

/* 
    Use this command in terminal to open brave,
    Currently uses brave debugging mode to download the animes
    brave --remote-debugging-port=9222 --user-data-dir="/home/$(whoami)/.config/brave-automation"
    Its better to save the automation profile in a seperate folder
*/

// Edit these to your preferences
// url -> 9anime link of the specific episode
// audio -> sub and dub (most of the episode dont have dub version)
// quality -> LOW (360p), MED (720p), HIGH (1080p)

const url = "https://9anime.org.lv/...";
const audio = Audio.SUB;
const quality = Quality.LOW;

const main = async () => {
  let browser;
  try {
    console.log(`Connecting to Brave and opening: ${url}`);
    browser = await chromium.connectOverCDP("http://localhost:9222");
    const defaultContext = browser.contexts()[0];

    await downloadEpisode(defaultContext, url, quality, audio);

    console.log("Downloading and will be saved in Downloads");
  } catch (error) {
    console.error("Execution failed:", error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

main();
