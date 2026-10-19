"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";

/**
 * «Mi selección»: lista de consulta guardada solo en este dispositivo
 * (localStorage). No es un carrito de pago: al enviarla se abre WhatsApp
 * con el mensaje listo y la venta se confirma con el equipo.
 */
export interface ItemSeleccion {
  id: string;
  slug: string;
  nombre: string;
  talla?: string;
  color?: string;
  cantidad: number;
}

interface Contexto {
  items: ItemSeleccion[];
  total: number;
  /** true cuando ya se leyó el almacenamiento del navegador. */
  listo: boolean;
  agregar: (item: Omit<ItemSeleccion, "id" | "cantidad">, cantidad?: number) => void;
  cambiarCantidad: (id: string, cantidad: number) => void;
  quitar: (id: string) => void;
  vaciar: () => void;
  abierto: boolean;
  abrir: () => void;
  cerrar: () => void;
  aviso: string;
  avisar: (texto: string) => void;
}

const CLAVE = "mdl-lista-consulta";
const MAX_ITEMS = 30;
const MAX_CANTIDAD = 20;
const VACIA: ItemSeleccion[] = [];

function idDe(i: { slug: string; talla?: string; color?: string }) {
  return [i.slug, i.talla ?? "", i.color ?? ""].join("|");
}

function texto(v: unknown, max = 120): string | undefined {
  return typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined;
}

/** Valida lo leído de localStorage: nunca confiar en datos guardados. */
function sanear(crudo: unknown): ItemSeleccion[] {
  if (!crudo || typeof crudo !== "object") return VACIA;
  const lista = (crudo as { items?: unknown }).items;
  if (!Array.isArray(lista)) return VACIA;
  const limpios: ItemSeleccion[] = [];
  for (const x of lista.slice(0, MAX_ITEMS)) {
    if (!x || typeof x !== "object") continue;
    const o = x as Record<string, unknown>;
    const slug = texto(o.slug, 120);
    const nombre = texto(o.nombre, 160);
    if (!slug || !nombre || !/^[a-z0-9-]+$/.test(slug)) continue;
    const talla = texto(o.talla, 40);
    const color = texto(o.color, 40);
    const n = Number(o.cantidad);
    const cantidad = Number.isFinite(n) ? Math.min(MAX_CANTIDAD, Math.max(1, Math.round(n))) : 1;
    limpios.push({ id: idDe({ slug, talla, color }), slug, nombre, talla, color, cantidad });
  }
  return limpios;
}

/* ─────────── Almacén externo (localStorage + sincronía entre pestañas) ─────────── */

let estado: ItemSeleccion[] | null = null;
const oyentes = new Set<() => void>();

function leer(): ItemSeleccion[] {
  try {
    const guardado = localStorage.getItem(CLAVE);
    return guardado ? sanear(JSON.parse(guardado)) : VACIA;
  } catch {
    return VACIA;
  }
}

function instantanea(): ItemSeleccion[] {
  if (estado === null) estado = leer();
  return estado;
}

function escribir(siguiente: ItemSeleccion[]) {
  estado = siguiente;
  try {
    if (siguiente.length) localStorage.setItem(CLAVE, JSON.stringify({ v: 1, items: siguiente }));
    else localStorage.removeItem(CLAVE);
  } catch {
    /* sin persistencia: la lista funciona solo en memoria */
  }
  oyentes.forEach((o) => o());
}

function suscribir(oyente: () => void) {
  oyentes.add(oyente);
  const alCambiarOtraPestana = (e: StorageEvent) => {
    if (e.key === CLAVE) {
      estado = leer();
      oyentes.forEach((o) => o());
    }
  };
  window.addEventListener("storage", alCambiarOtraPestana);
  return () => {
    oyentes.delete(oyente);
    window.removeEventListener("storage", alCambiarOtraPestana);
  };
}

const sinSuscripcion = () => () => {};

/* ─────────── Proveedor ─────────── */

const ConsultaContext = createContext<Contexto | null>(null);

export function ConsultaProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(suscribir, instantanea, () => VACIA);
  const listo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [abierto, setAbierto] = useState(false);
  const [aviso, setAviso] = useState("");
  const temporizador = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const avisar = useCallback((t: string) => {
    setAviso(t);
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setAviso(""), 4200);
  }, []);

  const agregar = useCallback<Contexto["agregar"]>(
    (item, cantidad = 1) => {
      const id = idDe(item);
      const prev = instantanea();
      const existe = prev.find((p) => p.id === id);
      if (existe) {
        escribir(
          prev.map((p) => (p.id === id ? { ...p, cantidad: Math.min(MAX_CANTIDAD, p.cantidad + cantidad) } : p)),
        );
      } else if (prev.length < MAX_ITEMS) {
        escribir([...prev, { ...item, id, cantidad: Math.min(MAX_CANTIDAD, Math.max(1, cantidad)) }]);
      } else {
        avisar("Tu selección está llena. Envía la consulta o quita alguna pieza.");
        return;
      }
      avisar(`«${item.nombre}» se agregó a tu selección.`);
    },
    [avisar],
  );

  const cambiarCantidad = useCallback((id: string, cantidad: number) => {
    escribir(
      instantanea().map((p) =>
        p.id === id ? { ...p, cantidad: Math.min(MAX_CANTIDAD, Math.max(1, Math.round(cantidad))) } : p,
      ),
    );
  }, []);

  const quitar = useCallback((id: string) => escribir(instantanea().filter((p) => p.id !== id)), []);
  const vaciar = useCallback(() => escribir(VACIA), []);
  const abrir = useCallback(() => setAbierto(true), []);
  const cerrar = useCallback(() => setAbierto(false), []);

  const valor = useMemo<Contexto>(
    () => ({
      items,
      total: items.reduce((n, i) => n + i.cantidad, 0),
      listo,
      agregar,
      cambiarCantidad,
      quitar,
      vaciar,
      abierto,
      abrir,
      cerrar,
      aviso,
      avisar,
    }),
    [items, listo, agregar, cambiarCantidad, quitar, vaciar, abierto, abrir, cerrar, aviso, avisar],
  );

  return <ConsultaContext.Provider value={valor}>{children}</ConsultaContext.Provider>;
}

export function useConsulta(): Contexto {
  const ctx = useContext(ConsultaContext);
  if (!ctx) throw new Error("useConsulta debe usarse dentro de <ConsultaProvider>");
  return ctx;
}

/** Versión tolerante para componentes que pueden renderizarse fuera del proveedor. */
export function useConsultaOpcional(): Contexto | null {
  return useContext(ConsultaContext);
}
