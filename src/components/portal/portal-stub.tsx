export function PortalStub({ title, description }: { title: string; description: string }) {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl">{title}</h1>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate">{description}</p>
      <div className="mt-8 flex items-center gap-3 rounded-xl bg-paper-dim px-5 py-4">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-church" />
        <p className="text-sm text-slate">
          This section is routed and ready — full functionality lands in the next build phase.
        </p>
      </div>
    </div>
  );
}
