import {createFileRoute} from "@tanstack/react-router";
import Grammar from "@/pages/Grammar/GrammarPage";

export const Route = createFileRoute("/app/grammar")({
    head: () => ({meta: [{title: "Bilimly.ai"}]}),
    component: Grammar,
});
