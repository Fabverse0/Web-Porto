import React from "react"
import { IconCloud } from "./interactive-icon-cloud"

const slugs = [
  "typescript",
  "javascript",
  "nodedotjs",
  "express",
  "postgresql",
  "redis",
  "docker",
  "kubernetes",
  "amazonaws",
  "nginx",
  "apachekafka",
  "mongodb",
  "clickhouse",
  "python",
  "go",
  "git",
  "github",
  "linux",
  "postman",
  "swagger",
  "openapiinitiative",
  "graphql",
  "react",
  "nextdotjs",
  "tailwindcss",
  "vite",
  "vitest",
  "jest",
  "vercel",
  "sentry"
]

export function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-2xl border border-[#E4E4E7] dark:border-[#27272A] bg-[#FFFFFF] dark:bg-[#18181B] px-6 py-6 shadow-xl">
      <IconCloud iconSlugs={slugs} />
    </div>
  )
}
