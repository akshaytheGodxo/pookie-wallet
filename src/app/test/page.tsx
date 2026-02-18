"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Page() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen gap-4">
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out",
          show ? "w-64 opacity-100" : "w-0 opacity-0"
        )}
      >
        <Input className="w-full" placeholder="Ask something..." />
      </div>

      <Button
        className="w-20 h-20 rounded-full"
        onClick={() => setShow((prev) => !prev)}
      >
        Ask AI
      </Button>
    </div>
  );
}
