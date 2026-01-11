"use client";
import { useRouter } from "next/navigation";
import { PinContainer } from "../ui/3d-pin";
import { Button } from "../ui/button";
const Hero = () => {
    const router = useRouter();
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center px-6 lg:px-24 py-8 mt-60">
      <div className="container ">
        <div className="text-6xl text-primary font-bold font-poppins space-y-4">
          <h1 className=" ">Best Trends</h1> <h1>Easy Learning</h1>
        </div>
        <div className="mt-6 text-sm text-muted-foreground font-poppins max-w-xl">
          Experience the thrill of the stock and crypto markets through an
          interactive, game-based approach. Learn, trade, and compete while
          making smarter investment decisions—because finance should be fun!
        </div>

        <Button className="mt-8" variant={"default"} onClick={() => router.push("/dashboard")}>
            Get Started
        </Button>
      </div>

      <div>
        <PinContainer title="Users who tried">
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
            <h3 className="max-w-xs pb-2! m-0! font-bold  text-base text-slate-100">
              Aceternity UI
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
              <span className="text-slate-500 ">
                Customizable Tailwind CSS and Framer Motion Components.
              </span>
            </div>
            <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
          </div>
        </PinContainer>
      </div>
    </section>
  );
};

export { Hero };
