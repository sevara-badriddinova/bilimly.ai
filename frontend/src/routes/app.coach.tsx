import { createFileRoute } from "@tanstack/react-router";
import Coach from "@/pages/Chat/ChatPage";

export const Route = createFileRoute("/app/coach")({
  head: () => ({ meta: [{ title: "Bilimly.ai" }] }),
  component: Coach,
});
