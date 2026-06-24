import { Link } from "@tanstack/react-router";
import {
	BadgeCheckIcon,
	BellIcon,
	ChevronDownIcon,
	Clock3,
	LogOutIcon,
} from "lucide-react";
import type { ReactElement } from "react";
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
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "#/components/ui/navigation-menu";
import { authClient } from "#/lib/auth-client";

type Route = {
	link: ReactElement;
	label: string;
};

const routes: Route[] = [
	{
		label: "Espacios de Trabajo",
		link: <Link to="/dashboard/workspaces" />,
	},
];

export function Header() {
	const { data: session, isPending } = authClient.useSession();
	const userName =
		session?.user.name?.trim() ||
		session?.user.email?.split("@")[0] ||
		"Usuario";
	const userInitial = userName.charAt(0).toUpperCase();

	return (
		<header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
			<div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-6 px-6">
				<Link
					to="/"
					className="flex items-center gap-3 text-inherit no-underline"
				>
					<span className="inline-flex items-center justify-center">
						<Clock3 />
					</span>
					<strong>NoteTimer</strong>
				</Link>

				<div className="justify-self-center">
					<NavigationMenu>
						<NavigationMenuList>
							{routes.map((route) => (
								<NavigationMenuItem key={route.label}>
									<NavigationMenuLink render={route.link}>
										{route.label}
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</div>

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
			</div>
		</header>
	);
}
