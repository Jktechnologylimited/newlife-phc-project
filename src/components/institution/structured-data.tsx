import { institutionSchema } from "@/lib/institution-schema";
export function StructuredData({ kind }: { kind: "school" | "church" }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(institutionSchema(kind)).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}
