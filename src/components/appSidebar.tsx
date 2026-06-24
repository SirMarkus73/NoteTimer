import { Link } from "@tanstack/react-router";
import { ChevronDown, Clock3Icon } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "#/components/ui/sidebar";
import { authClient } from "#/lib/auth-client";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./ui/collapsible";
import { FieldError } from "./ui/field";
import { Spinner } from "./ui/spinner";

export function AppSidebar() {
	const { data, isPending, error } = authClient.useListOrganizations();

	return (
		<Sidebar>
			<SidebarHeader>
				<Link to="/dashboard" className="flex flex-row items-center gap-1">
					<Clock3Icon className="size-5" />
					NoteTimer
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<Collapsible defaultOpen className="group/organizations">
					<SidebarGroup>
						<SidebarGroupLabel render={<CollapsibleTrigger />}>
							Espacios de trabajo
							<ChevronDown className="ml-auto transition-transform duration-300 group-data-open/organizations:rotate-180" />
						</SidebarGroupLabel>

						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									{isPending && (
										<div className="flex items-center gap-2">
											<Spinner />
											Cargando tus espacios de trabajo...
										</div>
									)}
									{error && (
										<div className="flex items-center gap-2">
											<FieldError>
												Error al cargar los espacios de trabajo
											</FieldError>
										</div>
									)}

									{data?.map((org) => (
										<SidebarMenuItem key={org.id}>
											<SidebarMenuButton
												render={
													<Link
														to="/dashboard/workspaces/$workspaceSlug"
														params={{ workspaceSlug: org.slug }}
													/>
												}
											>
												{org.name}
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
					<SidebarGroup />
				</Collapsible>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}
