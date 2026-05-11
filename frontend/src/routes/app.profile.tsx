import {createFileRoute} from "@tanstack/react-router";
import Profile from "@/pages/Account/AccountPage";

export const Route = createFileRoute("/app/profile")({
    head: () => ({meta: [{title: "Bilimly.ai"}]}),
    component: Profile,
});
