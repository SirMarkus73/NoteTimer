import { UserDropdown } from "#/components/auth/userDropdown";
import { SidebarTrigger } from "#/components/ui/sidebar";

export function AppHeader() {
	return (
		<header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
			<div className="mx-auto grid h-16 w-full grid-cols-[auto_auto] items-center gap-6 px-6">
				<SidebarTrigger size="icon-lg" />
				<UserDropdown />
			</div>
		</header>
	);
}
