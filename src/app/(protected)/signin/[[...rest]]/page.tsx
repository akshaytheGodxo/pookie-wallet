'use client';
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const SignInPage = () => {
    return (
        <section className="flex items-center justify-center min-h-screen">
            <SignIn appearance={{
                theme: dark,
                

            }} signUpUrl="/signup" />
        </section>
    );
}

export default SignInPage;