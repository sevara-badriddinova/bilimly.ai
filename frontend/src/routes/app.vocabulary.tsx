import {createFileRoute} from "@tanstack/react-router";
import Vocabulary from "@/pages/Vocabulary/VocabularyPage";

export const Route = createFileRoute("/app/vocabulary")({
    head: () => ({meta: [{title: "Lug'at — Bilimly.ai"}]}),
    component: Vocabulary,
});
