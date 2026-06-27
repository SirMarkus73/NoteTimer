import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppHeader } from "#/components/app/appHeader";
import { AppSidebar } from "#/components/app/appSidebar";
import { SidebarProvider } from "#/components/ui/sidebar";
import { getSession } from "#/lib/auth/getSession";

export const Route = createFileRoute("/dashboard")({
	async beforeLoad() {
		const data = await getSession();

		if (!data?.user) {
			throw redirect({ to: "/auth/login" });
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
