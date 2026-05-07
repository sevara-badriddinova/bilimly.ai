import { createFileRoute } from "@tanstack/react-router";
import Speaking from "@/pages/Speaking/SpeakingPage";

export const Route = createFileRoute("/app/speaking")({
  head: () => ({ meta: [{ title: "Bilimly.ai" }] }),
  component: Speaking,
});
