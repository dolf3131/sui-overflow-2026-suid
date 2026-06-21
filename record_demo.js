const { chromium } = require('@playwright/test');
const { execSync } = require('child_process');
const fs = require('fs');

const URL = 'http://localhost:3000';

const scripts = [
  {
    id: 1,
    name: "hook",
    text: "Hello judges! Welcome to Sue Eye Dee, the Web 3 alternative to Credly, built for the Sui Overflow hackathon. Today, verifying resumes and career credentials is fundamentally broken. Users upload unverified P D Fs to LinkedIn, or they rely on centralized platforms like Credly that lock their data into walled gardens. We wanted to solve this using Web 3, but traditional N F T certificates require users to download wallet extensions, manage seed phrases, and pay gas fees. This creates a massive barrier to entry. Sue Eye Dee solves this by leveraging Sui’s Object Centric Model and Z K Login to offer a completely seamless Web 2 like experience, while ensuring absolute cryptographic authenticity."
  },
  {
    id: 2,
    name: "onboard",
    text: "Let's see how easy it is. I'm a user wanting to view my credentials. I don't need a Sui wallet. I simply click 'Connect Google'. Under the hood, Sue Eye Dee uses mysten Z K login to instantly derive a deterministic Sui address from my Google J W T. I now have a secure Web 3 identity without ever seeing a seed phrase."
  },
  {
    id: 3,
    name: "issue",
    text: "Now, let's switch roles. I'm an event organizer or an educational institution. I want to issue a certificate to a user. I go to the Issuer Portal, enter the user's Sui address, and type in the event name. When I click 'Issue Credential', our backend securely executes a transaction on the Sui Testnet using our deployed Move contract's Admin Cap. This is a Zero Gas experience for the user. The institution pays the gas to mint the credential directly into the user's wallet. The user doesn't need a gas faucet or Sui tokens."
  },
  {
    id: 4,
    name: "portfolio",
    text: "Back as the user, I check my Portfolio. Our Next js app queries the Sui Testnet using the mysten sui v 2 JSON RPC client and instantly displays my newly minted, user-owned credential. But we didn't stop there. Sue Eye Dee dynamically generates a premium, verifiable P D F Resume based on the user's on chain data. With one click, I can export this beautifully formatted P D F to apply for jobs."
  },
  {
    id: 5,
    name: "verify",
    text: "Finally, how does an employer know this isn't photoshopped? Every credential issued is a distinct Move Object on the Sui blockchain. Anyone can take the Object ID, enter it into our public Verify portal, and the app will fetch the live data directly from the Sui Testnet, cryptographically proving its authenticity and origin. Sue Eye Dee makes verifiable, user-owned career history accessible to everyone. Thank you for watching!"
  }
];

function generateAudio() {
  console.log("Generating audio files...");
  for (const script of scripts) {
    const filename = `audio_${script.id}.aiff`;
    execSync(`say -v Samantha -r 175 -o ${filename} "${script.text}"`);
    
    // Get duration
    const durationStr = execSync(`ffprobe -i ${filename} -show_entries format=duration -v quiet -of csv="p=0"`).toString().trim();
    script.duration = parseFloat(durationStr) * 1000; // in ms
    console.log(`Generated ${filename} (${script.duration}ms)`);
  }
}

async function recordSegment(id, actionFn, scriptDuration) {
  console.log(`Recording segment ${id}...`);
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: { dir: 'videos/', size: { width: 1280, height: 720 } },
    viewport: { width: 1280, height: 720 }
  });
  
  // Expose mock login flag
  await context.addInitScript(() => {
    window.MOCK_LOGIN = true;
  });

  const page = await context.newPage();
  const startTime = Date.now();
  
  let objectId = await actionFn(page);
  
  const elapsed = Date.now() - startTime;
  const remaining = scriptDuration - elapsed;
  if (remaining > 0) {
    await page.waitForTimeout(remaining + 1000); // add 1 second padding
  } else {
    await page.waitForTimeout(1000);
  }

  await context.close();
  await browser.close();

  // Find the generated video file
  const files = fs.readdirSync('videos/');
  const videoFile = files.find(f => f.endsWith('.webm'));
  fs.renameSync(`videos/${videoFile}`, `video_${id}.webm`);
  
  return objectId;
}

async function main() {
  if (!fs.existsSync('videos')) fs.mkdirSync('videos');
  generateAudio();

  let globalObjectId = null;

  // Segment 1: Hook
  await recordSegment(1, async (page) => {
    await page.goto(URL);
    // Just scroll a bit to make it dynamic
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(3000);
    await page.evaluate(() => window.scrollBy(0, -300));
  }, scripts[0].duration);

  // Segment 2: Onboard
  await recordSegment(2, async (page) => {
    await page.goto(URL);
    await page.waitForTimeout(1000);
    await page.click('text=Connect Google');
    await page.waitForTimeout(1000); // wait for redirect
    await page.waitForLoadState('networkidle');
  }, scripts[1].duration);

  // Segment 3: Issue
  await recordSegment(3, async (page) => {
    await page.goto(URL);
    await page.waitForTimeout(1000);
    await page.click('text=Connect Google');
    await page.waitForTimeout(2000);
    await page.goto(`${URL}/app/issuer`);
    await page.waitForTimeout(3000); // give it time to load
    
    const inputs = page.locator('input');
    await inputs.nth(0).waitFor({ state: 'visible' });
    await inputs.nth(0).fill('0xb6d18105d15a5120ee4de451c0f0fb5258f1f58df3c921389886475459f31fc6');
    await inputs.nth(1).fill('Sui Hackathon Winner 2026');
    
    await page.click('button:has-text("Execute Transaction")');
    await page.waitForSelector('text=successfully', { timeout: 30000 });
  }, scripts[2].duration);

  // Segment 4: Portfolio
  await recordSegment(4, async (page) => {
    await page.goto(URL);
    await page.waitForTimeout(1000);
    await page.click('text=Connect Google');
    await page.waitForTimeout(2000);
    await page.goto(`${URL}/app`);
    await page.waitForTimeout(2000);
    await page.waitForSelector('text=Sui Hackathon', { timeout: 15000 });
    
    try {
      // Find the card and get the Object ID
      const elements = await page.locator('text=ID: 0x').all();
      if(elements.length > 0) {
        const text = await elements[0].innerText();
        globalObjectId = text.replace('ID: ', '').trim();
      }
    } catch(e) {}
    if(!globalObjectId) globalObjectId = "0x1234567890abcdef";
    await page.click('text=Issue Resume PDF (Free)');
    await page.waitForTimeout(2000);
    await page.click('button:has-text("Issue Resume PDF")');
    await page.waitForSelector('text=Premium', { timeout: 15000 });
  }, scripts[3].duration);

  // Segment 5: Verify
  await recordSegment(5, async (page) => {
    await page.goto(`${URL}/verify`);
    await page.fill('input[placeholder="e.g. suid://verify/7f3k"]', globalObjectId);
    await page.click('button:has-text("Verify Record")');
    await page.waitForSelector('text=Valid Record', { timeout: 20000 });
  }, scripts[4].duration);

  console.log("Merging video and audio...");
  if (fs.existsSync('concat.txt')) fs.unlinkSync('concat.txt');
  for (let i = 1; i <= scripts.length; i++) {
    execSync(`ffmpeg -y -i video_${i}.webm -i audio_${i}.aiff -c:v libx264 -preset fast -c:a aac -shortest output_${i}.mp4`, { stdio: 'pipe' });
    execSync(`echo "file 'output_${i}.mp4'" >> concat.txt`);
  }

  execSync(`ffmpeg -y -f concat -safe 0 -i concat.txt -c copy final_demo_video.mp4`);
  console.log("Done! final_demo_video.mp4 created.");
}

main().catch(console.error);
