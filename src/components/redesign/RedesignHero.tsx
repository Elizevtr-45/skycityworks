import { Check } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg";

export function RedesignHero() {
  return (
    <section id="top" className="relative min-h-screen bg-black overflow-hidden">
      <div className="container-px mx-auto max-w-7xl pt-24 md:pt-28 pb-16">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
          {/* LEFT — hero card */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[560px] md:min-h-[640px]">
            <img
              src={heroImg}
              alt="Премиальный интерьер квартиры после ремонта во Владивостоке"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            <div className="relative h-full flex flex-col justify-end p-6 md:p-10 lg:p-12">
              <span className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-[#FF6A00]/15 border border-[#FF6A00]/30 text-[#FF6A00] text-xs font-semibold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A00]" />
                Капитальный ремонт «под ключ»
              </span>

              <h1 className="mt-5 font-display font-bold uppercase text-white text-3xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
                Ремонт квартир,<br className="hidden sm:block" />
                <span className="text-[#FF6A00]">коттеджей и таунхаусов</span><br className="hidden sm:block" />
                «под ключ» во Владивостоке
              </h1>

              <ul className="mt-7 space-y-2.5 text-white/85 text-sm md:text-base max-w-xl">
                {[
                  "Цена фиксируется в договоре — никаких «доплат потом»",
                  "Скидка 30 000 ₽ на ремонт при заказе механизированной штукатурки",
                  "Предварительный расчёт стоимости за 30 минут",
                  "Дизайн-проект в подарок при заказе «под ключ»",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="h-5 w-5 shrink-0 text-[#FF6A00] mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center px-7 h-12 rounded-full bg-[#FF6A00] text-white font-semibold hover:bg-[#ff7a1f] transition-colors"
                >
                  Рассчитать стоимость
                </a>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
                  className="inline-flex items-center justify-center px-7 h-12 rounded-full border border-white/25 text-white font-semibold hover:bg-white hover:text-black transition-colors"
                >
                  Получить консультацию
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — lead form card */}
          <RedesignLeadCard />
        </div>

        {/* stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { n: "7+", t: "лет на рынке" },
            { n: "2800+", t: "сданных объектов" },
            { n: "2 года", t: "гарантии в договоре" },
            { n: "10%", t: "скидка участникам СВО" },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="font-display text-2xl md:text-3xl font-bold text-[#FF6A00]">{s.n}</div>
              <div className="text-white/70 text-xs md:text-sm mt-1">{s.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RedesignLeadCard() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("open-lead-form"));
      }}
      className="relative rounded-2xl md:rounded-3xl bg-white/[0.04] border border-white/10 p-6 md:p-8 backdrop-blur-sm flex flex-col"
    >
      <div className="flex items-center gap-2 text-[#FF6A00] text-xs font-semibold uppercase tracking-wider">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A00]" />
        Скидка до 200 000 ₽
      </div>
      <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold text-white leading-tight">
        Рассчитать стоимость ремонта
      </h2>
      <p className="mt-2 text-sm text-white/70">
        Ответьте на пару вопросов — менеджер свяжется с вами за 30 минут и подготовит смету.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <input
          type="text"
          required
          placeholder="Ваше имя"
          className="h-12 rounded-xl bg-black/40 border border-white/10 px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6A00] transition-colors"
        />
        <input
          type="tel"
          required
          placeholder="Номер телефона"
          className="h-12 rounded-xl bg-black/40 border border-white/10 px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6A00] transition-colors"
        />
        <select
          defaultValue=""
          className="h-12 rounded-xl bg-black/40 border border-white/10 px-4 text-white focus:outline-none focus:border-[#FF6A00] transition-colors"
        >
          <option value="" disabled className="bg-black">Тип объекта</option>
          <option className="bg-black">Квартира в новостройке</option>
          <option className="bg-black">Вторичное жильё</option>
          <option className="bg-black">Дом / таунхаус</option>
          <option className="bg-black">Санузел</option>
        </select>

        <button
          type="submit"
          className="mt-2 h-12 rounded-xl bg-[#FF6A00] text-white font-semibold hover:bg-[#ff7a1f] transition-colors"
        >
          Отправить заявку
        </button>
        <p className="text-[11px] text-white/45 leading-snug">
          Нажимая кнопку, вы соглашаетесь с обработкой персональных данных в соответствии с политикой конфиденциальности.
        </p>
      </div>
    </form>
  );
}
