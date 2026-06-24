import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppHeader } from "#/components/app/appHeader";
import { AppSidebar } from "#/components/app/appSidebar";
import { SidebarProvider } from "#/components/ui/sidebar";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex-1">
				<AppHeader />
				<div className="mx-5 mt-5">
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	);
}
