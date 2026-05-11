import {createFileRoute} from "@tanstack/react-router";
import LessonsPage from "@/pages/Lessons/LessonsPage";

export const Route = createFileRoute("/lessons")({
    head: () => ({meta: [{title: "Bilimly.ai"}]}),
    component: LessonsPage,
});
