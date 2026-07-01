import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightSquare, PaperclipIcon } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { buttonVariants } from "#/components/ui/button";
import { Calendar, CalendarDayButton } from "#/components/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Field } from "#/components/ui/field";
import {
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "#/components/ui/popover";
import { CreateWorkspaceBtn } from "#/components/workspaces/createWorkspaceBtn";
import { authClient } from "#/lib/auth-client";
import { useGetTasksByCompletionDate } from "#/lib/tasks/useGetAllTasks";

export const Route = createFileRoute("/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: projects } = authClient.useListOrganizations();
	const { data: tasks } = useGetTasksByCompletionDate();

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Tus tareas pendientes</CardTitle>
					<CardDescription>
						Aquí podrás ver todas tus tareas pendientes, organizarlas y
						gestionarlas
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-5 items-center">
					<Calendar
						mode="single"
						captionLayout="dropdown"
						className="[--cell-size:--spacing(15)] md:[--cell-size:--spacing(30)]"
						formatters={{
							formatMonthDropdown: (date) => {
								return date.toLocaleString("default", { month: "long" });
							},
						}}
						components={{
							DayButton: ({ children, modifiers, day, ...props }) => {
								const dayTasks = tasks?.get(day.isoDate);
								return (
									<Popover>
										<PopoverTrigger
											render={
												<CalendarDayButton
													day={day}
													modifiers={modifiers}
													{...props}
												/>
											}
										>
											{children}

											{dayTasks && dayTasks.length > 0 && (
												<Badge
													variant="secondary"
													className="absolute right-1 top-1"
												>
													<PaperclipIcon data-icon="inline-start" />
													{dayTasks.length}
												</Badge>
											)}
										</PopoverTrigger>

										{dayTasks && dayTasks?.length > 0 && (
											<PopoverContent side="top">
												<PopoverHeader>
													<Field orientation="horizontal">
														<PopoverTitle>
															Tareas para {day.isoDate}
														</PopoverTitle>
													</Field>
												</PopoverHeader>
												<ul>
													{dayTasks.map((task) => (
														<li key={task.id}>
															<Link
																to="/dashboard/workspaces/$workspaceSlug"
																params={{
																	workspaceSlug: task.organization.slug,
																}}
																className={buttonVariants({
																	variant: "ghost",
																})}
															>
																<span>
																	{task.title}{" "}
																	{task.plannedCompletionTime &&
																		`- ${task.plannedCompletionTime}`}
																</span>
																<ArrowRightSquare
																	data-icon="inline-end"
																	className="ml-2"
																/>
															</Link>
														</li>
													))}
												</ul>
											</PopoverContent>
										)}
									</Popover>
								);
							},
						}}
					/>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Gestión de Espacios de Trabajo</CardTitle>
					<CardDescription>
						Aquí podrás gestionar tus espacios de trabajo, crear nuevos,
						editarlos o eliminarlos.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-5">
					<CreateWorkspaceBtn />
					{projects && projects.length > 0 ? (
						<ul>
							{projects.map((project) => (
								<li key={project.id}>
									<Link
										to="/dashboard/workspaces/$workspaceSlug"
										params={{ workspaceSlug: project.slug }}
									>
										{project.name} - <small>{project.slug}</small>
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p>
							No tienes proyectos aún. Crea uno para empezar a organizar tus
							tareas.
						</p>
					)}
				</CardContent>
			</Card>
		</>
	);
}
