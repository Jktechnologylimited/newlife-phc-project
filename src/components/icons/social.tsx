import type { SVGProps } from "react";

function Base(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  );
}

export function FacebookGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H6v3h2v8h3v-8h2.6l.4-3H11V7.7c0-.8.4-1.2 1.3-1.2H15V3Z" />
    </Base>
  );
}

export function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function YoutubeGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path d="M10.5 9.5 15 12l-4.5 2.5v-5Z" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function LinkedinGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <line x1="7.5" y1="10" x2="7.5" y2="16.5" />
      <circle cx="7.5" cy="7" r="0.6" fill="currentColor" stroke="none" />
      <path d="M11.5 16.5V10M11.5 12.5c0-1.4 1-2.5 2.3-2.5s2.2 1 2.2 2.5v4" />
    </Base>
  );
}

export function WhatsappGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props} strokeLinejoin="round">
      <path d="M4 20.5 5.2 16.3A8.5 8.5 0 1 1 8.4 19.4Z" />
      <path
        d="M8.7 8.6c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4.2.5.6 1.6.7 1.7.1.1.1.3 0 .5-.1.2-.2.3-.3.5-.2.2-.3.3-.1.6.5.8 1 1.4 1.7 1.9.6.4.9.5 1.1.4.2-.1.7-.6.9-.9.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4 0 .2 0 1-.4 1.4-.4.4-1.2.8-2 .8-1.7 0-3.4-1-4.6-2.1-1.2-1.2-2.1-2.9-2.1-4.6 0-.8.3-1.6.7-2Z"
        fill="currentColor"
        stroke="none"
      />
    </Base>
  );
}
