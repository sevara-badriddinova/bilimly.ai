import {createFileRoute} from "@tanstack/react-router";
import {AuthShell} from "./signin";

export const Route = createFileRoute("/signup")({
    head: () => ({
        meta: [
            {title: "Sign up — Bilimly.ai"},
            {name: "description", content: "Create a free Bilimly.ai account and learn English in your language."},
            {property: "og:title", content: "Sign up — Bilimly.ai"},
            {property: "og:description", content: "Create a free Bilimly.ai account."},
        ],
    }),
    component: SignUpPage,
});

function SignUpPage() {
    return <AuthShell mode="signup"/>;
}
