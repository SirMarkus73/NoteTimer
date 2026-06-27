import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { AppHeader } from "#/components/app/appHeader";
import { AppSidebar } from "#/components/app/appSidebar";
import { SidebarProvider } from "#/components/ui/sidebar";
import { auth } from "#/lib/auth";
import { authClient } from "#/lib/auth-client";

const getSession = createIsomorphicFn()
	.client(async () => {
		const { data, error } = await authClient.getSession();

		if (error) {
			console.error("Error fetching session:", error);
		}

		return data;
	})
	.server(async () => {
		const headers = getRequestHeaders();
		try {
			return await auth.api.getSession({
				headers,
			});
		} catch (error) {
			console.error("Error fetching session:", error);
		}
	});

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
