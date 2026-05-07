import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/pages/DashboardPage";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Bilimly.ai" }] }),
  component: Dashboard,
});
