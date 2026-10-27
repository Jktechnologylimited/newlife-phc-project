"use client";

import { containDialogFocus } from "@/lib/dialog-keyboard";
import Image from "next/image";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import type { InstitutionPhoto } from "@/lib/institution";
export function Gallery({
  photos,
  editorial = false,
}: {
  photos: InstitutionPhoto[];
  editorial?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<InstitutionPhoto>();
  return (
    <>
      <div className={editorial ? "editorial-gallery" : "photo-gallery"}>
        {photos.map((photo) => (
          <figure key={photo.src}>
            <button
              type="button"
              className="gallery-button group"
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
                sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 60vw"
                className="gallery-image"
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
            className="button-primary"
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
