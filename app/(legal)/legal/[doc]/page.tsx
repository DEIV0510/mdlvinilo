import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentoLegalVista } from "@/components/legal/DocumentoLegalVista";
import { documento as cookies } from "@/content/legal/cookies";
import { documento as privacidad } from "@/content/legal/privacidad";
import { documento as terminos } from "@/content/legal/terminos";
import { canonica } from "@/lib/seo";

const documentos = { privacidad, terminos, cookies } as const;
type Slug = keyof typeof documentos;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(documentos).map((doc) => ({ doc }));
}

type Props = { params: Promise<{ doc: string }> };

function buscar(doc: string) {
  return doc in documentos ? documentos[doc as Slug] : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = buscar((await params).doc);
  if (!d) return {};
  return {
    title: d.titulo,
    description: d.resumen,
    alternates: canonica(`/legal/${d.slug}`),
  };
}

export default async function PaginaLegal({ params }: Props) {
  const d = buscar((await params).doc);
  if (!d) notFound();
  return <DocumentoLegalVista doc={d} />;
}
