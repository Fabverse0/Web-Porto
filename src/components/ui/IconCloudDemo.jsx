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
  "amazonwebservices",
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
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-card)] px-6 py-6">
      <IconCloud iconSlugs={slugs} />
    </div>
  )
}

export default IconCloudDemo;
