import { school, church, productionOrigin } from "@/lib/institution";

export function institutionSchema(kind: "school" | "church") {
  const institution = kind === "school" ? school : church;
  const path = kind === "school" ? "/" : "/church";
  const url = productionOrigin
    ? new URL(path, productionOrigin).toString()
    : undefined;
  return {
    "@context": "https://schema.org",
    "@type": kind === "school" ? "School" : "Church",
    name: institution.name,
    ...(url ? { url, "@id": `${url}#institution` } : {}),
    ...(institution.telephone ? { telephone: institution.telephone } : {}),
    ...(institution.email ? { email: institution.email } : {}),
    ...(kind === "school"
      ? {
          foundingDate: "1994",
          founder: { "@type": "Person", name: "Doris Abili" },
          slogan: school.motto,
          address: {
            "@type": "PostalAddress",
            addressLocality: school.locality,
          },
          parentOrganization: { "@type": "Church", name: church.name },
        }
      : {}),
    ...(productionOrigin && institution.hero
      ? { image: new URL(institution.hero.src, productionOrigin).toString() }
      : {}),
  };
}
