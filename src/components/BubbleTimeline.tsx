type Mood = 'bull' | 'bear' | 'mixed';

interface TimelineEntry {
  month: string;
  mood: Mood;
  headline: string;
  detail: string;
}

interface BubbleTimelineProps {
  locale?: 'en' | 'es';
}

const entries: Record<'en' | 'es', TimelineEntry[]> = {
  en: [
    {
      month: 'Mar',
      mood: 'mixed',
      headline: 'Peak "is it a bubble?" searches',
      detail:
        'OpenAI closes a round at an $852B valuation. Anthropic run-rate revenue roughly doubles to ~$20B.',
    },
    {
      month: 'Apr–May',
      mood: 'bull',
      headline: 'Revenue answers back',
      detail:
        'Anthropic run-rate reported at ~$30B (Apr), then ~$47B (May). Fed survey: AI climbs to a top-3 financial stability risk.',
    },
    {
      month: 'Jun',
      mood: 'bear',
      headline: 'First real crack',
      detail:
        'Tech leads the sharpest sell-off in over a year. Bears start going public against parts of the AI trade.',
    },
    {
      month: 'Jul',
      mood: 'bear',
      headline: 'Chips give back $1T',
      detail:
        'Nvidia sheds roughly $1T in market value in under two months. Big Tech still guides ~$700B+ of 2026 capex.',
    },
    {
      month: 'Aug',
      mood: 'bear',
      headline: 'Debt becomes the story',
      detail:
        'Hyperscalers tap external financing as capex outruns cash flow. CoreWeave borrows at ~10.4%.',
    },
    {
      month: 'Sep',
      mood: 'mixed',
      headline: 'Rate hike, then records',
      detail:
        'Fed hikes for the first time in 3+ years (3.75–4%). AI stocks drop, then the Nasdaq hits a new high on Sep 21.',
    },
    {
      month: 'Oct',
      mood: 'bear',
      headline: 'The institutions weigh in',
      detail:
        'IMF, Australia\'s central bank and Ray Dalio warn of a bust. OpenAI run-rate ~$50B disappoints. Anthropic IPO slips to November.',
    },
  ],
  es: [
    {
      month: 'Mar',
      mood: 'mixed',
      headline: 'Pico de búsquedas "¿es una burbuja?"',
      detail:
        'OpenAI cierra una ronda a una valoración de $852B. Los ingresos anualizados de Anthropic casi se duplican a ~$20B.',
    },
    {
      month: 'Abr–May',
      mood: 'bull',
      headline: 'Los ingresos responden',
      detail:
        'Anthropic reporta ~$30B anualizados (abr) y ~$47B (may). Encuesta de la Fed: la IA sube al top 3 de riesgos financieros.',
    },
    {
      month: 'Jun',
      mood: 'bear',
      headline: 'La primera grieta',
      detail:
        'La tecnología lidera la caída más fuerte en más de un año. Los bajistas empiezan a posicionarse en público.',
    },
    {
      month: 'Jul',
      mood: 'bear',
      headline: 'Los chips devuelven $1T',
      detail:
        'Nvidia pierde ~$1T de capitalización en menos de dos meses. Big Tech mantiene más de ~$700B de capex para 2026.',
    },
    {
      month: 'Ago',
      mood: 'bear',
      headline: 'La deuda se vuelve la historia',
      detail:
        'Los hyperscalers recurren a financiación externa porque el capex supera su flujo de caja. CoreWeave se endeuda al ~10,4%.',
    },
    {
      month: 'Sep',
      mood: 'mixed',
      headline: 'Subida de tipos, luego récords',
      detail:
        'La Fed sube tipos por primera vez en más de 3 años (3,75–4%). Las acciones de IA caen y el Nasdaq marca récord el 21 de sep.',
    },
    {
      month: 'Oct',
      mood: 'bear',
      headline: 'Las instituciones opinan',
      detail:
        'El FMI, el banco central de Australia y Ray Dalio advierten de un estallido. Los ~$50B anualizados de OpenAI decepcionan. La OPV de Anthropic pasa a noviembre.',
    },
  ],
};

const labels = {
  en: { title: 'Seven Months of the AI Bubble Debate', bull: 'Bullish', bear: 'Bearish', mixed: 'Mixed' },
  es: { title: 'Siete meses del debate de la burbuja de IA', bull: 'Alcista', bear: 'Bajista', mixed: 'Mixto' },
};

const moodStyles: Record<Mood, { dot: string; text: string }> = {
  bull: { dot: 'bg-green-500', text: 'text-green-400' },
  bear: { dot: 'bg-red-500', text: 'text-red-400' },
  mixed: { dot: 'bg-yellow-500', text: 'text-yellow-400' },
};

export default function BubbleTimeline({ locale = 'en' }: BubbleTimelineProps) {
  const t = labels[locale];

  return (
    <div className="my-8 p-6 bg-surface rounded-lg border border-border">
      <h3 className="text-xl font-bold text-text-primary mb-6 text-center">
        {t.title}
      </h3>

      <ol className="relative border-l border-border ml-3 space-y-6">
        {entries[locale].map((entry) => {
          const style = moodStyles[entry.mood];
          return (
            <li key={entry.month} className="ml-6">
              <span
                className={`absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full ${style.dot}`}
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-sm font-mono text-text-secondary w-16">
                  {entry.month}
                </span>
                <span className="text-text-primary font-semibold">
                  {entry.headline}
                </span>
                <span className={`text-xs font-semibold ${style.text}`}>
                  {t[entry.mood]}
                </span>
              </div>
              <p className="text-sm text-text-secondary mt-1">{entry.detail}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
