import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
const SignUpPage = () => {
    return (
        <section className="flex items-center justify-center min-h-screen">
            <SignUp appearance={{
                theme: dark,
            }} signInUrl="/signin" />
        </section>
    );
}
export default SignUpPage;