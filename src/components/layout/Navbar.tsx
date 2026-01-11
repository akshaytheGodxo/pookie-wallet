"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
const Navbar = () => {
    const router = useRouter();


    const { isLoaded, session, isSignedIn } = useSession()
    const { signOut } = useClerk()

    return (
        <section className="flex p-6 justify-between bg-zinc-50 dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
            <div>
                <h2 className="text-3xl font-medium text-primary font-sans">Pookie Wallet</h2>
            </div>
            {/* Features section */}
            <div className="self-center ">
                <ul className="flex gap-6 ml-10">
                    <li className="text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-primary cursor-pointer transition">Features</li>
                    <li className="text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-primary cursor-pointer transition">Pricing</li>
                    <li className="text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-primary cursor-pointer transition">Resources</li>
                </ul>
            </div>
            {/* User Profile */}

            

            {/* Authentications */}
            <div className="flex gap-4">
                {isSignedIn && (
                <div className="">
                    <Button
                        className="cursor-pointer"
                        size={"lg"}
                        variant={"ghost"}
                        onClick={() => router.push('/profile')}
                    >
                        {session.user.firstName || session.user.emailAddresses[0]?.emailAddress || "Profile"}
                    </Button>
                </div>
            )}


                {isSignedIn ? (
                    <Button 
                    className="cursor-pointer"
                    size={"lg"}
                    variant={"default"}
                    onClick={() => {
                        signOut({redirectUrl: '/signin'});
                    }}
                    >
                    Sign Out
                    </Button>) : (<Button
                    className="cursor-pointer"
                    size={"lg"}
                    variant={"default"}
                    onClick={() => router.push('/signin')}
                >
                    Sign In
                </Button>)
                }
            </div>

        </section>
    )
}

export { Navbar };