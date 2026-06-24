import { Link, useLocation } from "@tanstack/react-router";
import {
	BadgeCheckIcon,
	BellIcon,
	ChevronDownIcon,
	ListIcon,
	LogOutIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button, buttonVariants } from "#/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { authClient } from "#/lib/auth-client";
import { SidebarTrigger } from "./ui/sidebar";

export function UserDropdown() {
	const location = useLocation();

	const { data: session, isPending } = authClient.useSession();
	const userName =
		session?.user.name?.trim() ||
		session?.user.email?.split("@")[0] ||
		"Usuario";
	const userInitial = userName.charAt(0).toUpperCase();

	return (
		<div className="flex items-center justify-self-end gap-3">
			{isPending ? (
				<div className="h-10 w-40 animate-pulse rounded-md bg-muted/50" />
			) : session?.user ? (
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button>
								<Avatar>
									<AvatarImage
										src={session.user.image ?? undefined}
										alt={userName}
									/>
									<AvatarFallback>{userInitial}</AvatarFallback>
								</Avatar>
								<span>{userName}</span>
								<ChevronDownIcon />
							</Button>
						}
					/>
					<DropdownMenuContent align="end">
						<DropdownMenuGroup>
							{location.pathname === "/" && (
								<DropdownMenuItem render={<Link to="/dashboard" />}>
									<ListIcon />
									Panel de control
								</DropdownMenuItem>
							)}
							<DropdownMenuItem render={<Link to="/dashboard/account" />}>
								<BadgeCheckIcon />
								Cuenta
							</DropdownMenuItem>
							<DropdownMenuItem render={<Link to="/" />}>
								<BellIcon />
								Notificaciones
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => authClient.signOut()}>
							<LogOutIcon />
							Cerrar sesión
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<div className="flex items-center gap-2">
					<Link
						to="/auth/login"
						className={buttonVariants({ size: "sm", variant: "outline" })}
					>
						Iniciar sesión
					</Link>

					<Link
						to="/auth/register"
						className={buttonVariants({ size: "sm", variant: "outline" })}
					>
						Registrarse
					</Link>
				</div>
			)}
		</div>
	);
}

export function Header() {
	return (
		<header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
			<div className="mx-auto grid h-16 w-full grid-cols-[auto_auto] items-center gap-6 px-6">
				<SidebarTrigger size="icon-lg" />
				<UserDropdown />
			</div>
		</header>
	);
}
