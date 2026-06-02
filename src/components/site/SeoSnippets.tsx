/**
 * SEO-блок с короткими тематическими абзацами.
 * Каждый абзац оптимизирован под отдельный поисковый запрос —
 * поисковик подтянет нужный фрагмент в сниппет под ссылкой сайта.
 */
export function SeoSnippets() {
  return (
    <section
      id="seo-overview"
      aria-label="О компании СКАЙСИТИ — ремонт квартир во Владивостоке"
      className="py-16 md:py-20 bg-background border-t border-border"
    >
      <div className="container-px mx-auto max-w-5xl">
        <h2 className="sr-only">Ремонт квартир под ключ во Владивостоке — СКАЙСИТИ</h2>

        {/* Главный абзац — дублирует meta description для общего запроса */}
        <p className="reveal text-base md:text-lg text-foreground leading-relaxed mb-8">
          <strong>Ремонт квартир во Владивостоке</strong> без переплат. Эконом. Стандарт. Премиум.
          Цена фиксируется в договоре. Столешница из камня. Мебель на заказ. Скидка 10%
          участникам СВО. Изделия из керамогранита. Кэшбэк 10%.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-sm md:text-base text-muted-foreground leading-relaxed">
          <p className="reveal">
            <strong className="text-foreground">Мебель на заказ Владивосток.</strong> Кухни,
            гардеробные, корпусная мебель и шкафы под потолок. Собственное производство, фасады
            МДФ и шпон, столешницы из натурального камня и керамогранита.
          </p>

          <p className="reveal">
            <strong className="text-foreground">Скидка 10% участникам СВО.</strong> Ветеранам и
            действующим участникам специальной военной операции — фиксированная скидка на любой
            пакет ремонта по предъявлении документа.
          </p>

          <p className="reveal">
            <strong className="text-foreground">Кэшбэк 10% за ремонт.</strong> Возвращаем 10% от
            стоимости работ на следующий заказ или услуги нашего шоурума — мебель, керамогранит,
            сантехнику.
          </p>

          <p className="reveal">
            <strong className="text-foreground">Изделия из керамогранита.</strong> Столешницы,
            фартуки, подоконники и облицовка ванных комнат. Точный раскрой, бесшовные стыки,
            монтаж под ключ.
          </p>
        </div>
      </div>
    </section>
  );
}
