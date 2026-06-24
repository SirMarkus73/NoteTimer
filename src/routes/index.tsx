import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	ArrowRight,
	CheckCircle2,
	Clock3Icon,
	NotebookPen,
	Sparkles,
	TimerReset,
} from "lucide-react";
import { UserDropdown } from "#/components/header";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Separator } from "#/components/ui/separator";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "description",
				content:
					"Notetimer une notas, temporizador y tareas en una sola experiencia para trabajar con más foco.",
			},
			{ title: "Notetimer | foco, notas y tareas" },
		],
	}),
	component: Home,
});

const shellClassName =
	"relative isolate grid min-h-screen gap-[clamp(2.5rem,4vw,4.5rem)] overflow-hidden bg-[linear-gradient(180deg,_color-mix(in_oklch,var(--background)_94%,var(--primary)_6%),var(--background))] p-[clamp(1rem,2vw,1.5rem)] before:pointer-events-none before:absolute before:left-[-6rem] before:top-16 before:h-80 before:w-80 before:bg-[color-mix(in_oklch,var(--primary)_18%,transparent)] before:blur-[56px] before:content-[''] after:pointer-events-none after:absolute after:bottom-40 after:right-[-4rem] after:h-72 after:w-72 after:bg-[color-mix(in_oklch,var(--chart-4)_20%,transparent)] after:blur-[56px] after:content-['']";

const contentClassName = "relative z-10 mx-auto w-full max-w-[1120px]";

const cardClassName =
	"border border-border/80 bg-[linear-gradient(180deg,_color-mix(in_oklch,var(--card)_90%,var(--primary)_10%),var(--card))] shadow-[0_28px_70px_color-mix(in_oklch,var(--foreground)_14%,transparent),inset_0_1px_0_color-mix(in_oklch,var(--foreground)_8%,transparent)]";

const sectionTitleClassName =
	"m-0 max-w-[18ch] text-[clamp(1.8rem,3.5vw,3rem)] leading-none tracking-[-0.05em]";

function Home() {
	const navigate = useNavigate();

	return (
		<>
			<header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
				<div className="mx-auto grid h-16 w-full grid-cols-[auto_auto] items-center gap-6 px-6">
					<span className="flex flex-row items-center gap-3">
						<Clock3Icon className="size-5" />
						NoteTimer
					</span>
					<UserDropdown />
				</div>
			</header>
			<main className={shellClassName}>
				<section
					className={`${contentClassName} grid gap-6 pt-4 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-12 md:pt-16`}
				>
					<div className="grid gap-5">
						<p className="inline-flex w-fit items-center gap-3 border border-border/70 bg-[color-mix(in_oklch,var(--card)_75%,var(--primary)_25%)] px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-foreground">
							<Sparkles className="h-3.5 w-3.5 text-primary" />
							Diseñado para sesiones reales
						</p>
						<h1 className="m-0 max-w-[11.5ch] text-[clamp(3.2rem,7.4vw,6.8rem)] leading-[0.9] tracking-[-0.08em] text-balance">
							Notas, temporizador y tareas en una sola pantalla.
						</h1>
						<p className="m-0 max-w-[58ch] text-[clamp(1.02rem,1.25vw,1.2rem)] leading-[1.7] text-muted-foreground">
							Organiza tu día en bloques cortos, captura ideas al vuelo y
							convierte cada sesión en el siguiente paso claro.
						</p>

						<div className="flex flex-wrap gap-3">
							<Button
								size="lg"
								type="button"
								onClick={() => navigate({ to: "/auth/register" })}
							>
								Empezar ahora
								<ArrowRight className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="lg"
								type="button"
								onClick={() => navigate({ to: "/auth/login" })}
							>
								Acceder
							</Button>
						</div>

						<ul className="grid list-none gap-3 p-0 md:grid-cols-3">
							<li className="grid gap-2 border border-border/80 bg-[color-mix(in_oklch,var(--card)_80%,var(--background)_20%)] p-4 text-sm leading-[1.45]">
								<CheckCircle2 className="h-4 w-4 text-primary" />
								Bloques de foco guiados
							</li>
							<li className="grid gap-2 border border-border/80 bg-[color-mix(in_oklch,var(--card)_80%,var(--background)_20%)] p-4 text-sm leading-[1.45]">
								<NotebookPen className="h-4 w-4 text-primary" />
								Notas rápidas sin fricción
							</li>
							<li className="grid gap-2 border border-border/80 bg-[color-mix(in_oklch,var(--card)_80%,var(--background)_20%)] p-4 text-sm leading-[1.45]">
								<CheckCircle2 className="h-4 w-4 text-primary" />
								Tareas conectadas al trabajo real
							</li>
						</ul>
					</div>

					<Card className={cardClassName}>
						<CardHeader>
							<CardTitle>Sesión de hoy</CardTitle>
							<CardDescription>
								Todo lo que necesitas para entrar en ritmo sin perder contexto.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<dl className="grid gap-3 md:grid-cols-3">
								<div className="grid gap-1 border border-border/80 bg-[color-mix(in_oklch,var(--background)_92%,var(--primary)_8%)] p-4">
									<dt>25 min</dt>
									<dd>Bloque actual</dd>
								</div>
								<div className="grid gap-1 border border-border/80 bg-[color-mix(in_oklch,var(--background)_92%,var(--primary)_8%)] p-4">
									<dt>4 notas</dt>
									<dd>Ideas capturadas</dd>
								</div>
								<div className="grid gap-1 border border-border/80 bg-[color-mix(in_oklch,var(--background)_92%,var(--primary)_8%)] p-4">
									<dt>7 tareas</dt>
									<dd>En seguimiento</dd>
								</div>
							</dl>

							<div className="mt-4 grid gap-3">
								<div className="grid grid-cols-[auto_1fr] items-center gap-4 bg-[color-mix(in_oklch,var(--muted)_78%,var(--primary)_22%)] px-4 py-3">
									<span>09:00</span>
									<p>Definir objetivo del día</p>
								</div>
								<div className="grid grid-cols-[auto_1fr] items-center gap-4 bg-[color-mix(in_oklch,var(--muted)_78%,var(--primary)_22%)] px-4 py-3">
									<span>09:05</span>
									<p>Registrar notas rápidas</p>
								</div>
								<div className="grid grid-cols-[auto_1fr] items-center gap-4 bg-[color-mix(in_oklch,var(--muted)_78%,var(--primary)_22%)] px-4 py-3">
									<span>09:20</span>
									<p>Convertir una idea en tarea</p>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button
								variant="secondary"
								size="lg"
								type="button"
								onClick={() => navigate({ to: "/auth/register" })}
							>
								Probar la experiencia
								<TimerReset className="h-4 w-4" />
							</Button>
						</CardFooter>
					</Card>
				</section>

				<section className={`${contentClassName} grid gap-5`}>
					<div className="grid gap-2">
						<p>Lo esencial</p>
						<h2 className={sectionTitleClassName}>
							Menos pestañas, más continuidad.
						</h2>
					</div>

					<div className="grid gap-4 md:grid-cols-3">
						<Card size="sm">
							<CardHeader>
								<CardTitle>Foco sin fricción</CardTitle>
								<CardDescription>
									Empieza un bloque, mira qué toca ahora y sigue avanzando sin
									cambiar de herramienta.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card size="sm">
							<CardHeader>
								<CardTitle>Notas que no rompen el flujo</CardTitle>
								<CardDescription>
									Escribe ideas, enlaces y recordatorios en el mismo contexto
									donde aparecen.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card size="sm">
							<CardHeader>
								<CardTitle>Tareas accionables</CardTitle>
								<CardDescription>
									Convierte una nota en una siguiente acción clara antes de que
									se pierda la idea.
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</section>

				<Separator className={contentClassName} />

				<section className={`${contentClassName} grid gap-5`}>
					<div className="grid gap-2">
						<p>Cómo funciona</p>
						<h2 className={sectionTitleClassName}>
							Un flujo simple que se repite todos los días.
						</h2>
					</div>

					<ol className="grid list-none gap-4 p-0 md:grid-cols-3">
						<li>
							<Card>
								<CardHeader>
									<CardTitle>1. Arranca una sesión</CardTitle>
									<CardDescription>
										Define una intención concreta y deja que el temporizador
										marque el ritmo.
									</CardDescription>
								</CardHeader>
							</Card>
						</li>
						<li>
							<Card>
								<CardHeader>
									<CardTitle>2. Captura lo importante</CardTitle>
									<CardDescription>
										Anota decisiones, ideas y bloqueos mientras siguen frescos.
									</CardDescription>
								</CardHeader>
							</Card>
						</li>
						<li>
							<Card>
								<CardHeader>
									<CardTitle>3. Cierra con un siguiente paso</CardTitle>
									<CardDescription>
										Termina cada bloque con una tarea clara para no perder
										impulso.
									</CardDescription>
								</CardHeader>
							</Card>
						</li>
					</ol>
				</section>

				<footer
					className={`${contentClassName} flex items-center justify-between gap-4 pb-4 max-md:flex-col max-md:items-start`}
				>
					<div>
						<strong>NoteTimer</strong>
						<p>Menos ruido. Más foco. Un lugar para cada cosa.</p>
					</div>
					<Button
						variant="outline"
						size="sm"
						type="button"
						onClick={() => navigate({ to: "/auth/register" })}
					>
						Crear tu cuenta
					</Button>
				</footer>
			</main>
		</>
	);
}
