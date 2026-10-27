"use client";

import { containDialogFocus } from "@/lib/dialog-keyboard";
import Image from "next/image";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import type { InstitutionPhoto } from "@/lib/institution";
export function Gallery({ photos }: { photos: InstitutionPhoto[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<InstitutionPhoto>();
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {photos.map((photo) => (
          <figure key={photo.src}>
            <button
              type="button"
              className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl"
              aria-label={`Enlarge photograph: ${photo.alt}`}
              onClick={() => {
                setSelected(photo);
                dialog.current?.showModal();
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
              />
            </button>
            {photo.caption && (
              <figcaption className="mt-3 text-sm text-slate">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
      <dialog
        onKeyDown={containDialogFocus}
        ref={dialog}
        aria-label={selected?.alt ?? "School photograph"}
        className="m-auto max-h-[90dvh] w-[min(90vw,70rem)] rounded-2xl bg-paper p-4 backdrop:bg-ink/85"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <form method="dialog" className="mb-3 flex justify-end">
          <button
            className="site-button bg-ink text-paper"
            aria-label="Close enlarged photograph"
          >
            <X size={18} />
            Close
          </button>
        </form>
        {selected && (
          <Image
            src={selected.src}
            alt={selected.alt}
            width={selected.width}
            height={selected.height}
            sizes="90vw"
            className="max-h-[70dvh] w-full object-contain"
          />
        )}
        {selected?.caption && (
          <p className="mt-3 text-sm">{selected.caption}</p>
        )}
      </dialog>
    </>
  );
}
