import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppHeader } from "#/components/app/appHeader";
import { AppSidebar } from "#/components/app/appSidebar";
import { SidebarProvider } from "#/components/ui/sidebar";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/dashboard")({
	async beforeLoad() {
		const { data, error } = await authClient.getSession({});
		if (!data || error) {
			throw redirect({
				to: "/auth/login",
			});
		}
	},
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
