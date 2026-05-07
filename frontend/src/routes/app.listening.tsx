import { createFileRoute } from "@tanstack/react-router";
import Listening from "@/pages/Listening/ListeningPage";

export const Route = createFileRoute("/app/listening")({
  head: () => ({ meta: [{ title: "Bilimly.ai" }] }),
  component: Listening,
});
