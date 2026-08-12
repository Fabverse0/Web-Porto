import React from "react";
import { ThemeToggle } from "./theme-toggle";

export function DefaultToggle() {
  return (
    <div className="space-y-2 text-center">
      <div className="flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  );
}

export { DefaultToggle };
