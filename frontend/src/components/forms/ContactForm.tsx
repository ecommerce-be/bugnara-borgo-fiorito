import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSubmitContact } from '../../hooks/useApi';
import { Button } from '../ui/Button';
import { SmallBloom } from '../decorative/Botanical';
import type { ContactSubject } from '../../types/api';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: ContactSubject;
  message: string;
}

const initial: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: 'GENERIC_INFO',
  message: '',
};

const subjects: Array<{ value: ContactSubject; label: string; description: string }> = [
  {
    value: 'JOIN_INITIATIVE',
    label: 'Aderire all\'iniziativa',
    description: 'Voglio far entrare la mia casa o il mio angolo nella mappa.',
  },
  {
    value: 'SUGGEST_SPOT',
    label: 'Suggerire un luogo',
    description: 'Conosco un angolo o uno spazio pubblico che merita.',
  },
  {
    value: 'GENERIC_INFO',
    label: 'Informazioni generiche',
    description: 'Vorrei sapere di più sul progetto.',
  },
];

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const submit = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit.mutate(
      {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        subject: form.subject,
        message: form.message.trim(),
      },
      {
        onSuccess: () => setForm(initial),
      }
    );
  };

  const isSent = submit.isSuccess;
  const isError = submit.isError;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isSent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <SmallBloom className="w-12 h-12 text-bloom-deep mx-auto mb-6" />
            <h3 className="font-display text-3xl text-ink mb-4">Grazie!</h3>
            <p className="font-serif text-lg text-ink-soft max-w-md mx-auto leading-relaxed mb-8">
              Il tuo messaggio è arrivato. Ti risponderemo appena possibile — di solito entro qualche giorno.
            </p>
            <button
              type="button"
              onClick={() => submit.reset()}
              className="link-editorial font-sans text-sm"
            >
              Scrivere un altro messaggio
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Subject — radio cards */}
            <fieldset>
              <legend className="eyebrow mb-4">Per quale motivo ci scrivi?</legend>
              <div className="grid sm:grid-cols-3 gap-3">
                {subjects.map(s => {
                  const active = form.subject === s.value;
                  return (
                    <label
                      key={s.value}
                      className={`block cursor-pointer p-4 border rounded-sm transition-all ${
                        active
                          ? 'border-bloom-deep bg-bloom/5 shadow-paper'
                          : 'border-stone-deep/40 hover:border-ink/60'
                      }`}
                    >
                      <input
                        type="radio"
                        name="subject"
                        value={s.value}
                        checked={active}
                        onChange={() => setForm(f => ({ ...f, subject: s.value }))}
                        className="sr-only"
                      />
                      <div className={`font-display text-lg mb-1 ${active ? 'text-bloom-deep' : 'text-ink'}`}>
                        {s.label}
                      </div>
                      <div className="font-serif text-sm text-ink-soft leading-snug">
                        {s.description}
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Name + Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <Field
                label="Nome"
                value={form.name}
                onChange={v => setForm(f => ({ ...f, name: v }))}
                required
                placeholder="Come ti chiami?"
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={v => setForm(f => ({ ...f, email: v }))}
                required
                placeholder="dove possiamo risponderti"
              />
            </div>

            {/* Phone (optional) */}
            <Field
              label="Telefono (opzionale)"
              type="tel"
              value={form.phone}
              onChange={v => setForm(f => ({ ...f, phone: v }))}
              placeholder="se preferisci che ti chiamiamo"
            />

            {/* Message */}
            <div>
              <label className="block eyebrow mb-2" htmlFor="msg">Messaggio</label>
              <textarea
                id="msg"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
                rows={6}
                placeholder="Raccontaci cosa hai in mente…"
                className="w-full px-4 py-3 bg-paper-soft border border-stone-deep/40 rounded-sm font-serif text-lg text-ink leading-relaxed focus:border-ink focus:outline-none focus:ring-2 focus:ring-bloom/30 transition-all"
              />
              <p className="font-sans text-xs text-ink-faint mt-2">
                Minimo 10 caratteri. Niente fretta — prendi pure il tempo che ti serve.
              </p>
            </div>

            {/* Error */}
            {isError && (
              <div className="p-4 border border-red-700/40 bg-red-50 rounded-sm font-serif text-red-800">
                Qualcosa è andato storto nell'invio. Riprova fra qualche istante, oppure scrivici direttamente a <a href="mailto:ciao@bugnarafiorito.it" className="underline">ciao@bugnarafiorito.it</a>.
              </div>
            )}

            {/* Submit */}
            <div className="flex items-center gap-6 pt-2">
              <Button type="submit" variant="primary">
                {submit.isPending ? 'Invio in corso…' : 'Invia il messaggio'}
                <span aria-hidden>→</span>
              </Button>
              <p className="font-sans text-xs text-ink-faint">
                I tuoi dati non vengono condivisi con nessuno.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

function Field({ label, value, onChange, type = 'text', placeholder, required }: FieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div>
      <label htmlFor={id} className="block eyebrow mb-2">
        {label}{required && <span className="text-bloom-deep ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-paper-soft border border-stone-deep/40 rounded-sm font-serif text-lg text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-bloom/30 transition-all"
      />
    </div>
  );
}
