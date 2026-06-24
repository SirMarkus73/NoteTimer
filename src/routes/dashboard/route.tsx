import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "#/components/appSidebar";
import { Header } from "#/components/header";
import { SidebarProvider } from "#/components/ui/sidebar";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex-1">
				<Header />
				<div className="mx-5 mt-5">
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	);
}
