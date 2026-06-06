import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import type { Guest, GuestFormData, Analytics } from "../types";

export function DashboardPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [form, setForm] = useState<GuestFormData>({ first_name: "", last_name: "" });
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchGuests();
  }, []);

  async function fetchGuests() {
    setLoading(true);
    const { data, error } = await supabase.from("guests").select("*").order("created_at", { ascending: false });
    if (!error && data) setGuests(data);
    setLoading(false);
  }

  function generateSlug(firstName: string, lastName: string): string {
    const initials = (firstName.charAt(0) + lastName.charAt(0)).toLowerCase();
    const random = Math.random().toString(36).substring(2, 6);
    return `${initials}_${random}`;
  }

  function getAnalytics(): Analytics {
    const total = guests.length;
    const attending = guests.filter((g) => g.attending).length;
    const not_attending = guests.filter((g) => !g.attending && g.responded_at).length;
    const pending = guests.filter((g) => !g.responded_at).length;
    return { total, attending, not_attending, pending };
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const slug = generateSlug(form.first_name, form.last_name);
    const { error } = await supabase.from("guests").insert({
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      invite_slug: slug,
      attending: false,
      guest_count: 0,
    });
    if (!error) {
      setForm({ first_name: "", last_name: "" });
      setShowForm(false);
      fetchGuests();
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingGuest) return;
    const { error } = await supabase
      .from("guests")
      .update({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
      })
      .eq("id", editingGuest.id);
    if (!error) {
      setEditingGuest(null);
      setForm({ first_name: "", last_name: "" });
      fetchGuests();
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("guests").delete().eq("id", id);
    if (!error) {
      setConfirmDelete(null);
      fetchGuests();
    }
  }

  function startEdit(guest: Guest) {
    setEditingGuest(guest);
    setForm({
      first_name: guest.first_name,
      last_name: guest.last_name,
    });
  }

  function getInviteUrl(slug: string) {
    return `${window.location.origin}/invite/${slug}`;
  }

  async function copyLink(slug: string, id: string) {
    await navigator.clipboard.writeText(getInviteUrl(slug));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const analytics = getAnalytics();
  const filtered = guests.filter((g) => g.first_name.toLowerCase().includes(search.toLowerCase()) || g.last_name.toLowerCase().includes(search.toLowerCase()));

  const stats = [
    { label: "Invitados", value: analytics.total, color: "text-primary", bg: "bg-primary/5" },
    { label: "Confirmados", value: analytics.attending, color: "text-secondary-dark", bg: "bg-secondary-light/20" },
    { label: "No Asistirán", value: analytics.not_attending, color: "text-error", bg: "bg-error/5" },
    { label: "Pendientes", value: analytics.pending, color: "text-on-surface/50", bg: "bg-on-surface/5" },
  ];

  return (
    <main className="min-h-dvh bg-surface">
      <div className="max-w-6xl mx-auto px-mobile md:px-desktop py-10 md:py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-heading text-heading md:text-[40px] text-primary">Dashboard</h1>
            <p className="font-body text-body text-on-surface/60 mt-1">Administra tus invitados y sus enlaces</p>
          </div>
          <button
            onClick={() => {
              setEditingGuest(null);
              setForm({ first_name: "", last_name: "" });
              setShowForm(true);
            }}
            className="px-6 py-3 bg-primary text-white font-body text-caption uppercase tracking-widest rounded-xl hover:bg-primary-dark transition-all">
            + Añadir
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-5 md:p-6 text-center`}>
              <p className={`font-heading text-[28px] md:text-[36px] ${s.color}`}>{s.value}</p>
              <p className="font-body text-caption text-on-surface/60 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="md:grid md:grid-cols-5 md:gap-6 space-y-6 md:space-y-0">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-[22px] text-primary">Estado RSVP</h2>
              <span className="font-body text-caption text-on-surface/50 uppercase tracking-wider">
                {analytics.attending + analytics.not_attending}/{analytics.total} responded
              </span>
            </div>

            {loading ? (
              <div className="invitation-glass rounded-2xl p-6 text-center">
                <p className="font-body text-body text-on-surface/40">Cargando...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="invitation-glass rounded-2xl p-6 text-center">
                <p className="font-body text-body text-on-surface/40">No se encontraron invitados</p>
              </div>
            ) : (
              <div className="invitation-glass rounded-2xl divide-y divide-outline/5 overflow-hidden">
                {filtered.map((guest) => {
                  const statusIcon = !guest.responded_at ? "schedule" : guest.attending ? "check_circle" : "cancel";
                  const statusColor = !guest.responded_at ? "text-on-surface/30" : guest.attending ? "text-secondary-dark" : "text-error";
                  const statusLabel = !guest.responded_at ? "Pendiente" : guest.attending ? "Asiste" : "No asiste";

                  return (
                    <div key={guest.id} className="flex items-center gap-3 px-4 md:px-5 py-3.5 hover:bg-white/30 transition-colors">
                      <span className={`material-symbols-outlined text-[18px] shrink-0 ${statusColor}`} style={{ fontVariationSettings: '"FILL" 1' }}>
                        {statusIcon}
                      </span>
                      <span className="font-body text-body text-primary font-medium flex-1 truncate min-w-0">
                        {guest.first_name} {guest.last_name}
                      </span>
                      <span className={`font-body text-caption uppercase tracking-wider shrink-0 ${statusColor}`}>{statusLabel}</span>
                      {guest.attending && guest.guest_count > 0 && <span className="font-body text-[12px] text-on-surface/50 shrink-0">+{guest.guest_count}</span>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-[22px] text-primary">Lista de Invitados</h2>
              <span className="font-body text-caption text-on-surface/50 uppercase tracking-wider">{filtered.length} invitados</span>
            </div>

            <div className="invitation-glass rounded-2xl overflow-hidden">
              <div className="p-4 md:p-5 border-b border-outline/10">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface/40 text-xl">search</span>
                  <input
                    type="text"
                    placeholder="Buscar invitado..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white/60 border border-outline/20 rounded-xl pl-11 pr-4 py-2.5 font-body text-sm text-on-surface focus:outline-none focus:border-secondary-dark/30 transition-colors"
                  />
                </div>
              </div>

              {loading ? (
                <div className="p-8 text-center">
                  <p className="font-body text-body text-on-surface/40">Cargando invitados...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="font-body text-body text-on-surface/40">No se encontraron invitados</p>
                </div>
              ) : (
                <div className="divide-y divide-outline/5">
                  {filtered.map((guest) => (
                    <div key={guest.id} className="flex items-start gap-1.5 px-4 md:px-5 py-3 hover:bg-white/30 transition-colors">
                      <div className="flex-1 min-w-0">
                        <span className="block font-body text-body text-primary font-medium leading-tight wrap-break-word">
                          {guest.first_name} {guest.last_name}
                        </span>
                        <button
                          onClick={() => copyLink(guest.invite_slug, guest.id)}
                          className="mt-1 inline-flex max-w-full items-center gap-1 text-xs text-on-surface/50 hover:text-secondary-dark transition-colors">
                          <span className="material-symbols-outlined text-[13px]">{copiedId === guest.id ? "check" : "link"}</span>
                          <span className="font-body max-w-[52vw] sm:max-w-[200px] truncate text-left">{copiedId === guest.id ? "¡Copiado!" : `/${guest.invite_slug}`}</span>
                        </button>
                      </div>
                      <div className="ml-1 flex items-center gap-0 shrink-0 self-start">
                        <button onClick={() => startEdit(guest)} className="rounded-md p-0.5 md:p-1 hover:bg-white/60 text-on-surface/50 hover:text-primary transition-all" title="Editar">
                          <span className="material-symbols-outlined text-[14px] md:text-[16px]">edit</span>
                        </button>
                        <button onClick={() => setConfirmDelete(guest.id)} className="rounded-md p-0.5 md:p-1 hover:bg-white/60 text-on-surface/50 hover:text-error transition-all" title="Eliminar">
                          <span className="material-symbols-outlined text-[14px] md:text-[16px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {(showForm || editingGuest) && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowForm(false);
              setEditingGuest(null);
            }}>
            <motion.div
              className="invitation-glass rounded-2xl p-8 md:p-10 w-full max-w-lg"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}>
              <h2 className="font-heading text-heading text-primary mb-6">{editingGuest ? "Editar Invitado" : "Nuevo Invitado"}</h2>
              <form onSubmit={editingGuest ? handleUpdate : handleCreate} className="space-y-5">
                <div>
                  <label className="font-body text-caption text-on-surface/60 uppercase tracking-wider mb-1.5 block">Nombre</label>
                  <input
                    type="text"
                    required
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    className="w-full bg-white/60 border border-outline/20 rounded-xl px-5 py-3.5 font-body text-body text-on-surface focus:outline-none focus:border-secondary-dark/30 transition-colors"
                    placeholder="Ej. Carlos"
                  />
                </div>
                <div>
                  <label className="font-body text-caption text-on-surface/60 uppercase tracking-wider mb-1.5 block">Apellido</label>
                  <input
                    type="text"
                    required
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    className="w-full bg-white/60 border border-outline/20 rounded-xl px-5 py-3.5 font-body text-body text-on-surface focus:outline-none focus:border-secondary-dark/30 transition-colors"
                    placeholder="Ej. Martinez"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingGuest(null);
                    }}
                    className="flex-1 px-6 py-3.5 border border-outline/30 text-on-surface/70 font-body text-caption uppercase tracking-widest rounded-xl hover:bg-white/60 transition-all">
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 px-6 py-3.5 bg-primary text-white font-body text-caption uppercase tracking-widest rounded-xl hover:bg-primary-dark transition-all">
                    {editingGuest ? "Guardar" : "Crear"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConfirmDelete(null)}>
            <motion.div
              className="invitation-glass rounded-2xl p-8 md:p-10 w-full max-w-sm text-center"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}>
              <span className="material-symbols-outlined text-4xl text-error mb-4" style={{ fontVariationSettings: '"FILL" 1' }}>
                warning
              </span>
              <h2 className="font-heading text-heading text-primary mb-2">¿Eliminar invitado?</h2>
              <p className="font-body text-body text-on-surface/60 mb-6">Esta acción no se puede deshacer.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 px-6 py-3.5 border border-outline/30 text-on-surface/70 font-body text-caption uppercase tracking-widest rounded-xl hover:bg-white/60 transition-all">
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  className="flex-1 px-6 py-3.5 bg-error text-white font-body text-caption uppercase tracking-widest rounded-xl hover:bg-red-700 transition-all">
                  Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
