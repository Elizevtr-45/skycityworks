import { useState, type FormEvent } from "react";

export function LeadForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-dark">
      <div className="container-px mx-auto max-w-4xl">
        <div className="reveal text-center mb-12">
          <div className="flex items-center gap-3 justify-center mb-4">
            <span className="gold-divider" />
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">Заявка</span>
          </div>
          <h2 className="font-display font-bold uppercase text-white text-3xl md:text-4xl lg:text-5xl">
            Получите расчет стоимости
          </h2>
          <p className="mt-4 text-white/70">
            Перезвоним в течение 15 минут. Бесплатный осмотр, замер и смета — без обязательств.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="reveal grid md:grid-cols-3 gap-4 bg-white/5 border border-white/10 p-6 md:p-10 rounded-sm"
        >
          <input
            required
            placeholder="Имя"
            className="bg-transparent border border-white/20 text-white placeholder:text-white/40 px-4 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors"
          />
          <input
            required
            type="tel"
            placeholder="Телефон"
            className="bg-transparent border border-white/20 text-white placeholder:text-white/40 px-4 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors"
          />
          <input
            required
            type="number"
            placeholder="Площадь, м²"
            className="bg-transparent border border-white/20 text-white placeholder:text-white/40 px-4 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            className="md:col-span-3 mt-2 px-8 py-4 bg-primary text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-all hover:-translate-y-0.5"
          >
            {sent ? "Спасибо! Мы свяжемся с вами" : "Отправить"}
          </button>
          <p className="md:col-span-3 text-white/40 text-xs text-center">
            Нажимая «Отправить», вы соглашаетесь с политикой обработки персональных данных.
          </p>
        </form>
      </div>
    </section>
  );
}
