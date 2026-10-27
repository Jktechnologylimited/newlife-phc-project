/* eslint-disable @next/next/no-img-element -- ImageResponse rasterizes standard img elements, not Next.js Image components. */
import { ImageResponse } from "next/og";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { socialCards } from "../src/lib/social-cards";

// Run from the repository root: npx tsx scripts/generate-social-images.tsx
// All imagery and fonts are local. No external image service or credentials.
async function main() {
  const photo = `data:image/jpeg;base64,${(await readFile(resolve("public/images/school/school-exterior-wide.jpg"))).toString("base64")}`;
  const crest = `data:image/png;base64,${(await readFile(resolve("public/newlife-logo-256.png"))).toString("base64")}`;
  const font = await readFile(
    resolve("node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"),
  );
  await mkdir(resolve("public/social"), { recursive: true });
  for (const card of Object.values(socialCards)) {
    const image = new ImageResponse(
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#1d4a37",
          color: "#f7f4ee",
          position: "relative",
          fontFamily: "Geist",
        }}
      >
        {!card.church && (
          <img
            src={photo}
            alt=""
            width={700}
            height={630}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              objectFit: "cover",
              opacity: 0.75,
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: card.church
              ? "linear-gradient(90deg, #122c23, #1d4a37)"
              : "linear-gradient(90deg, #122c23 5%, #122c23f5 38%, #122c2380 72%, #122c2320 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            left: 72,
            top: 65,
            bottom: 64,
            width: 700,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#e3b461",
              fontSize: 18,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {card.label}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.14,
              letterSpacing: -2,
              marginTop: 45,
              maxWidth: card.church ? 650 : 480,
            }}
          >
            {card.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "auto",
              fontSize: 20,
              color: "#f7f4eec0",
            }}
          >
            {card.church
              ? "Church & school, connected."
              : "Rumueme, Port Harcourt · Since 1994"}
          </div>
        </div>
        {card.church && (
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: 65,
              top: 175,
              width: 230,
              height: 230,
              borderRadius: 115,
              background: "#f7f4ee",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={crest} alt="" width={185} height={185} />
          </div>
        )}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 8,
            background: "#e3b461",
          }}
        />
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [{ name: "Geist", data: font, weight: 400, style: "normal" }],
      },
    );
    await writeFile(
      resolve(`public/social/${card.file}.png`),
      Buffer.from(await image.arrayBuffer()),
    );
    console.log(`Created ${card.file}.png (1200 × 630)`);
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
