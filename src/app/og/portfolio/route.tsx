import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

const MAX_TITLE_LENGTH = 88;
const MAX_METRIC_LENGTH = 96;

function clampText(input: string, maxLength: number) {
  if (input.length <= maxLength) {
    return input;
  }

  return `${input.slice(0, maxLength - 1)}…`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = clampText(
    searchParams.get("title") || "Sunil Chavhan",
    MAX_TITLE_LENGTH
  );
  const kicker = clampText(searchParams.get("kicker") || "Portfolio", 32);
  const metric = clampText(searchParams.get("metric") || "", MAX_METRIC_LENGTH);

  const magistralMedium = await readFile(
    join(process.cwd(), "src/assets/fonts/Magistral-Medium.ttf")
  );
  const robotoMedium = await readFile(
    join(process.cwd(), "src/assets/fonts/Roboto-Medium.ttf")
  );

  return new ImageResponse(
    (
      <div tw="relative flex h-full w-full bg-[#020617] p-14 text-white">
        <div
          tw="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 20%, rgba(56, 189, 248, 0.35), transparent 40%), radial-gradient(circle at 84% 78%, rgba(59, 130, 246, 0.28), transparent 42%), linear-gradient(140deg, rgba(255,255,255,0.08), transparent 54%)",
          }}
        />

        <div
          tw="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(315deg, rgba(148,163,184,0.22) 0px, rgba(148,163,184,0.22) 1px, transparent 1px, transparent 50%)",
            backgroundSize: "14px 14px",
          }}
        />

        <div tw="relative flex h-full w-full flex-col justify-between border border-[#1f2937] bg-black/40 p-12">
          <div tw="flex items-center justify-between">
            <div
              tw="text-[22px] uppercase tracking-[0.18em] text-[#93c5fd]"
              style={{ fontFamily: "RobotoMedium" }}
            >
              {kicker}
            </div>

            <svg
              width={56}
              height={48}
              viewBox="0 0 215 186"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="18"
                y="18"
                width="66"
                height="18"
                transform="rotate(90 18 18)"
                fill="#dbeafe"
              />
              <rect x="18" y="84" width="66" height="18" fill="#dbeafe" />
              <rect
                x="102"
                y="102"
                width="66"
                height="18"
                transform="rotate(90 102 102)"
                fill="#dbeafe"
              />
              <rect
                x="131"
                y="18"
                width="150"
                height="18"
                transform="rotate(90 131 18)"
                fill="#dbeafe"
              />
              <rect x="131" width="84" height="18" fill="#dbeafe" />
              <rect x="131" y="168" width="84" height="18" fill="#dbeafe" />
              <rect y="168" width="84" height="18" fill="#dbeafe" />
              <rect x="18" width="84" height="18" fill="#dbeafe" />
            </svg>
          </div>

          <div tw="flex flex-col gap-5">
            <h1
              tw="m-0 text-[78px] leading-[0.97] text-white"
              style={{ fontFamily: "Magistral" }}
            >
              {title}
            </h1>

            {metric && (
              <p
                tw="m-0 text-[30px] text-[#d1d5db]"
                style={{ fontFamily: "RobotoMedium" }}
              >
                {metric}
              </p>
            )}
          </div>

          <div
            tw="flex items-center justify-between text-[22px] text-[#94a3b8]"
            style={{ fontFamily: "RobotoMedium" }}
          >
            <span>jinxdev-tau.vercel.app</span>
            <span>Built by Sunil Chavhan</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Magistral",
          data: magistralMedium,
          weight: 500,
        },
        {
          name: "RobotoMedium",
          data: robotoMedium,
          weight: 500,
        },
      ],
    }
  );
}
