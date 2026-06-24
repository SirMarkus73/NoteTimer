import { Clock3Icon } from "lucide-react";
import { UserDropdown } from "../auth/userDropdown";

export function LandingHeader() {
	return (
		<header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
			<div className="mx-auto grid h-16 w-full grid-cols-[auto_auto] items-center gap-6 px-6">
				<span className="flex flex-row items-center gap-3">
					<Clock3Icon className="size-5" />
					NoteTimer
				</span>
				<UserDropdown />
			</div>
		</header>
	);
}
