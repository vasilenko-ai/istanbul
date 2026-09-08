'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, BedDouble, Compass, MapPin, Search, Ship, Sparkles, Utensils, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Section = 'districts' | 'food' | 'hotels' | 'places';
type Side = 'Все' | 'Европа' | 'Азия' | 'Острова';
type Place = { id: string; section: Exclude<Section, 'districts'>; title: string; side: Exclude<Side, 'Все'>; area: string; type: string; description: string; link?: string; detail?: string };

const places: Place[] = [
  { id: 'r001', section: 'food', title: 'Cuma', side: 'Европа', area: 'Çukurcuma', type: 'Ресторан · кафе', description: 'Маленький модный ресторан на любой приём пищи: вино и необычная кухня.', link: 'https://maps.app.goo.gl/zCyFdQXVkmGgkwcq6?g_st=ic' },
  { id: 'r002', section: 'food', title: 'Ulus 29', side: 'Европа', area: 'Ulus', type: 'Ресторан с видом', description: 'Красивый ресторан с видом на Босфор. Обязательно бронировать.', link: 'https://maps.app.goo.gl/FENv393Wnus1neer8?g_st=ic', detail: 'Особенный вечер' },
  { id: 'r004', section: 'food', title: 'Olden', side: 'Европа', area: 'Центр', type: 'Ресторан · бар', description: 'Красивый ресторан с баром. Стол лучше бронировать заранее.', link: 'https://maps.app.goo.gl/kqscymq17VAX6s5U7?g_st=com.google.maps.preview.copy' },
  { id: 'r005', section: 'food', title: 'Salon Galata', side: 'Европа', area: 'Galata', type: 'Ресторан', description: 'Атмосферное место с большой историей и хорошей едой. Вида нет — и это не мешает.' },
  { id: 'r006', section: 'food', title: 'Karaköy Fish House', side: 'Европа', area: 'Karaköy', type: 'Рыба · стрит-фуд', description: 'Простое нетуристическое место у рыбного рынка. Берите рыбный бутерброд в лаваше или хлебе.', link: 'https://maps.app.goo.gl/YZ3h2Togrgy9gaf1A?g_st=ic', detail: 'Быстрый обед' },
  { id: 'r008', section: 'food', title: 'Güney Restaurant', side: 'Европа', area: 'Galata', type: 'Ресторан', description: 'Простой вариант перекусить прямо у Галатской башни — с видом на Галату.' },
  { id: 'r011', section: 'food', title: 'Bebek Balıkçı', side: 'Европа', area: 'Bebek', type: 'Рыбный ресторан', description: 'Белые скатерти, мезе, ракы и вино — всё в лучших традициях турецких рыбных ресторанов.', link: 'https://maps.app.goo.gl/QMWNLCXWY1k8xBDF7?g_st=ic', detail: 'Турецкая классика' },
  { id: 'r013', section: 'food', title: 'The Populist', side: 'Европа', area: 'Galataport', type: 'Гастропаб · пивоварня', description: 'Популярный гастропаб с собственным пивом. Удобно совместить с прогулкой по набережной.' },
  { id: 'r016', section: 'food', title: 'Develi', side: 'Азия', area: 'Kalamış Marina', type: 'Мясной ресторан', description: 'Мясной ресторан в марине Каламыш — для неспешного обеда или ужина.', link: 'https://maps.app.goo.gl/mUUTMhWrcfQkSwjt6' },
  { id: 'r017', section: 'food', title: 'Del Mare', side: 'Азия', area: 'Çengelköy', type: 'Рыбный ресторан', description: 'Лучше приезжать за час до заката: отличный вид на Босфорский мост и уходящее солнце.', link: 'https://maps.app.goo.gl/75XTP4JbbgyJu2wP7?g_st=ic', detail: 'За час до заката' },
  { id: 'r018', section: 'food', title: 'Develi Marin', side: 'Азия', area: 'Kalamış', type: 'Ресторан', description: 'Хорошая локация у воды и более простой формат, чем у соседей.', link: 'https://maps.app.goo.gl/5QB35mRrcy2GdDoA7?g_st=ic' },
  { id: 'r019', section: 'food', title: 'Strada', side: 'Азия', area: 'Cadde', type: 'Ресторан', description: 'Хорошая кухня, вино и интерьер. Универсальный вариант на вечер.', link: 'https://maps.app.goo.gl/9QeJ2NDbW28vxraJ6?g_st=ic' },
  { id: 'r020', section: 'food', title: 'Townhouse', side: 'Азия', area: 'Cadde', type: 'Гастропаб', description: 'Очень европейский гастропаб: отличное меню, стейки, хорошая барная и винная карта.', link: 'https://maps.app.goo.gl/xw2rviTqriDVBpMKA?g_st=ic' },
  { id: 'r021', section: 'food', title: 'Ysabel', side: 'Азия', area: 'Cadde', type: 'Гастропаб', description: 'Приятное место с хорошей винной картой, в первую очередь — с местными винами.', link: 'https://maps.app.goo.gl/nAwLLQbrZ118UpHq7?g_st=ic' },
  { id: 'r022', section: 'food', title: 'Paolina', side: 'Азия', area: 'Suadiye', type: 'Коктейли · фьюжн', description: 'Коктейльный гастропаб с неплохой едой. Порции больше, чем кажутся в меню.' },
  { id: 'r026', section: 'food', title: 'Hatay Gurme', side: 'Азия', area: 'Ataşehir', type: 'Турецкий завтрак', description: 'Традиционный турецкий завтрак — тот самый стол, на котором помещается не всё.', link: 'https://maps.app.goo.gl/42ypAX5c5LZV91um7?g_st=ic', detail: 'На завтрак' },
  { id: 'r027', section: 'food', title: 'Agababa Döner & Yemek', side: 'Азия', area: 'Ümraniye', type: 'Дёнер', description: 'Прекрасный дёнер, если вдруг окажетесь в Умрание.', link: 'https://maps.app.goo.gl/RG6qNMEWYdmZ1Hd67?g_st=ic' },
  { id: 'r030', section: 'food', title: 'Paper', side: 'Азия', area: 'Suadiye', type: 'Кафе · кофейня', description: 'Вкусные боулы, десерты и кофе — хороший дневной вариант.' },
  { id: 'r032', section: 'food', title: 'Küff Kollektif', side: 'Азия', area: 'Moda', type: 'Кафе · бар', description: 'Европейское меню, адаптированный стрит-фуд, демократичные цены и бар.', link: 'https://maps.app.goo.gl/iRBC58D2g5QgJBFZ7?g_st=ic' },
  { id: 'r041', section: 'food', title: 'Tatar Salim', side: 'Азия', area: 'Ataşehir', type: 'Дёнер · суп', description: 'Лучший mercimek çorbası, который мы пробовали, и прекрасный дёнер. Идти максимально голодными.', link: 'https://maps.app.goo.gl/obJGi3rDjKtd7hDN8?g_st=ipc', detail: 'Идти голодными' },
  { id: 'r042', section: 'food', title: 'Tatar Salim', side: 'Азия', area: 'Cadde', type: 'Дёнер · суп', description: 'Филиал любимого места с отличным чечевичным супом и дёнером.', link: 'https://maps.app.goo.gl/KxuZ3deSF13EAuzk7?g_st=ipc' },
  { id: 'r043', section: 'food', title: 'İnsula Cafe', side: 'Острова', area: 'Heybeliada', type: 'Кафе · завтраки', description: 'Спокойное место для завтрака на Хейбелиаде.', link: 'https://maps.app.goo.gl/QmzuFTWn7ruBqNFw8?g_st=ic' },
  { id: 'r045', section: 'food', title: 'Ozcan Restaurant', side: 'Азия', area: 'Уточняем', type: 'Рыбный ресторан', description: 'Один из наших любимых рыбных ресторанов в городе.', detail: 'Любимое' },
  { id: 'r049', section: 'food', title: 'Kuzu Lahmacun', side: 'Азия', area: 'Уточняем', type: 'Лахмаджун', description: 'Хорошее место для лахмаджуна — просто и по делу.' },
  { id: 'r051', section: 'food', title: 'Say Cheese', side: 'Азия', area: 'Уточняем', type: 'Паста', description: 'Сюда — за пастой.' },
  { id: 'r052', section: 'food', title: "Maggie's Bakery", side: 'Азия', area: 'Уточняем', type: 'Пекарня · бранч', description: 'Приятное кафе для вегетарианского бранча.' },
  { id: 'r053', section: 'food', title: 'Bedri Usta', side: 'Азия', area: 'Kalamış', type: 'Кебаб', description: 'Добротный кебаб-ресторан в Каламыше.' },
  { id: 'h001', section: 'hotels', title: 'Wyndham Grand Istanbul Kalamış Marina', side: 'Азия', area: 'Kalamış', type: 'Большой отель', description: 'Отличный вариант в респектабельном жилом районе — местные «Хамовники».', link: 'https://maps.app.goo.gl/AGYRUWLZjBvrH9jd9?g_st=iw', detail: 'У марины' },
  { id: 'h002', section: 'hotels', title: 'DoubleTree by Hilton — Moda', side: 'Азия', area: 'Moda · Kadıköy', type: 'Большой отель', description: 'Рядом рестораны и магазины, пешком до паромного причала — удобно ехать куда угодно.', link: 'https://maps.app.goo.gl/ykjgvZyyKRWH3VPL9', detail: 'У парома' },
  { id: 'h003', section: 'hotels', title: '39 Kalamış Marina Hotel', side: 'Азия', area: 'Kalamış', type: 'Бутик-отель', description: 'Милый небольшой отель. Были здесь один раз — очень понравилось.', link: 'https://maps.app.goo.gl/3n3QMjrpFZCvUedLA?g_st=iw', detail: 'Жили сами' },
  { id: 'h004', section: 'hotels', title: 'Raffles Istanbul', side: 'Европа', area: 'Zorlu · Beşiktaş', type: 'Премиальный отель', description: 'Один из лучших отелей города, прямо в Zorlu. До туристических мест удобнее на такси.', link: 'https://maps.app.goo.gl/AsKjuGRpSma38WqJ6' },
  { id: 'h005', section: 'hotels', title: 'Swissôtel The Bosphorus', side: 'Европа', area: 'Beşiktaş', type: 'Большой отель', description: 'Рядом дворец Долмабахче; пешком до Galataport, чуть дальше — до Taksim.', link: 'https://maps.app.goo.gl/yZGsC7JxhTexetbU9' },
  { id: 'h006', section: 'hotels', title: 'Hilton Istanbul Bosphorus', side: 'Европа', area: 'Harbiye · Taksim', type: 'Большой отель', description: 'Большой хороший отель в пешей доступности от площади Taksim и улицы İstiklal.', link: 'https://maps.app.goo.gl/4Bb5pxe5Dw7TwAAy8' },
  { id: 'h007', section: 'hotels', title: 'The Marmara Taksim', side: 'Европа', area: 'Taksim', type: 'Большой отель', description: 'Прямо на площади Таксим, в начале улицы Истикляль.', link: 'https://maps.app.goo.gl/jvHM16AjAmtBNYB69', detail: 'Самый центр' },
  { id: 'h008', section: 'hotels', title: 'Burdock Hotel', side: 'Европа', area: 'Karaköy', type: 'Бутик-отель', description: 'Очень хороший небольшой отель в пешей доступности от Galataport.', link: 'https://maps.app.goo.gl/4qXkGF6L6fQjcxsh7' },
  { id: 'h010', section: 'hotels', title: 'Adahan DeCamondo Pera', side: 'Европа', area: 'Pera · Beyoğlu', type: 'Бутик-отель', description: 'В центре Бейоглу, с отличной террасой для завтраков. Останавливались здесь в 2021 году.', link: 'https://maps.app.goo.gl/M3N6gxsB1guSpu23A', detail: 'Жили сами' },
  { id: 'h016', section: 'hotels', title: 'The Galata Istanbul Hotel — MGallery', side: 'Европа', area: 'Galata · Karaköy', type: 'Бутик-отель', description: 'Рядом Галатская башня; пешком до Galataport и Cihangir. Хороший вид.', link: 'https://maps.app.goo.gl/MYsvKuP7ndPe6K4m6?g_st=com.google.maps.preview.copy' },
  { id: 'p001', section: 'places', title: 'Айя-София', side: 'Европа', area: 'Sultanahmet', type: 'История', description: 'Обязательна в первой поездке — даже если вы не живёте в историческом центре.' },
  { id: 'p002', section: 'places', title: 'Голубая мечеть', side: 'Европа', area: 'Sultanahmet', type: 'История', description: 'Главная остановка первого дня рядом с Айя-Софией.' },
  { id: 'p003', section: 'places', title: 'Цистерна Базилика', side: 'Европа', area: 'Sultanahmet', type: 'История', description: 'Подземная пауза в насыщенном маршруте по Султанахмету.' },
  { id: 'p005', section: 'places', title: 'İstiklal Caddesi', side: 'Европа', area: 'Beyoğlu', type: 'Прогулка', description: 'Одна из визитных карточек города: магазины, люди и много туристической энергии.' },
  { id: 'p006', section: 'places', title: 'Галатская башня', side: 'Европа', area: 'Galata', type: 'Вид · история', description: 'Логичная точка маршрута от Истикляль вниз к воде.' },
  { id: 'p007', section: 'places', title: 'Галатский мост', side: 'Европа', area: 'Karaköy · Eminönü', type: 'Прогулка', description: 'Связывает две части исторического маршрута и даёт почувствовать город у воды.' },
  { id: 'p008', section: 'places', title: 'Galataport', side: 'Европа', area: 'Karaköy', type: 'Набережная · музеи', description: 'Современная набережная на Босфоре, музей современного искусства и рестораны.' },
  { id: 'p009', section: 'places', title: 'Дворец Долмабахче', side: 'Европа', area: 'Beşiktaş', type: 'История', description: 'Финальная большая точка прогулки от Каракёя вдоль Босфора.' },
  { id: 'p010', section: 'places', title: 'Паром в Kadıköy', side: 'Азия', area: 'Босфор · Kadıköy', type: 'Транспорт как впечатление', description: 'Не просто способ добраться: ветер, чай и лучший переход между двумя сторонами города.', detail: 'Обязательно хотя бы раз' },
  { id: 'p011', section: 'places', title: 'Принцевы острова', side: 'Острова', area: 'Adalar', type: 'На целый день', description: 'Если позволяет погода, лучше отдать островам отдельный день.' },
  { id: 'p012', section: 'places', title: 'La Commune', side: 'Азия', area: 'Уточняем', type: 'Винный магазин', description: 'Небольшой приятный магазин с вином.' },
  { id: 'p013', section: 'places', title: 'Vina wine&more', side: 'Азия', area: 'Уточняем', type: 'Винный магазин', description: 'Ещё один хороший адрес для вина.' },
  { id: 'p014', section: 'places', title: 'ruth.', side: 'Азия', area: 'Уточняем', type: 'Мультибрендовый магазин', description: 'Симпатичный независимый мультибрендовый магазин.' },
  { id: 'p015', section: 'places', title: 'Güven Art Store', side: 'Азия', area: 'Уточняем', type: 'Арт-магазин', description: 'Хороший магазин для тех, кто любит материалы, бумагу и вещи для творчества.' },
];

const districts = [
  { id: 'd001', title: 'Sultanahmet', side: 'Европа', verdict: 'Скорее не жить', description: 'Обязателен для первого знакомства с городом, но вечером может быть скучно. Лучше приехать сюда на целый день.', bestFor: 'Первая поездка · историческая классика', note: 'Айя-София → Голубая мечеть → Цистерна → рынки' },
  { id: 'd002', title: 'Taksim', side: 'Европа', verdict: 'С оговорками', description: 'Рядом Истикляль и множество туристических мест. Центрально, шумно и всегда многолюдно.', bestFor: 'Транспорт · короткая поездка', note: 'Истикляль → магазины → Галата' },
  { id: 'd003', title: 'Karaköy', side: 'Европа', verdict: 'Да', description: 'Ближе к Босфору, Galataport и мосту. Удобно гулять у воды и подниматься к Галате.', bestFor: 'Первая поездка · рестораны · вода', note: 'Karaköy → Galataport → Dolmabahçe' },
  { id: 'd004', title: 'Şişhane / Galata', side: 'Европа', verdict: 'Да', description: 'Хороший компромисс между водой и Истикляль: удобно ходить в обе стороны.', bestFor: 'Городские прогулки · виды', note: 'İstiklal → Galata Tower → Galata Bridge' },
  { id: 'd005', title: 'Cihangir', side: 'Европа', verdict: 'Да', description: 'Холмистый район с узкими улицами, независимыми магазинами и характерной публикой.', bestFor: 'Кафе · локальная атмосфера', note: 'Taksim → Çukurcuma → Cihangir → Galataport' },
  { id: 'd006', title: 'Nişantaşı / Şişli', side: 'Европа', verdict: 'Да', description: 'Более европейская среда, дорогие магазины и хорошие отели. Рядом парк Maçka.', bestFor: 'Шопинг · комфорт · деловая поездка', note: 'Nişantaşı → Maçka Parkı → Dolmabahçe' },
  { id: 'd007', title: 'Bomonti', side: 'Европа', verdict: 'Для повторной поездки', description: 'Модный городской район и хороший второй уровень знакомства с европейской стороной.', bestFor: 'Современный город · без туристов', note: 'Bomonti → Şişli → Nişantaşı' },
  { id: 'd008', title: 'Moda', side: 'Азия', verdict: 'Да, особенно не впервые', description: 'Живой локальный район с ресторанами, магазинами и прогулками. Рядом паромы Kadıköy.', bestFor: 'Еда · локальная жизнь · море', note: 'Паром → Kadıköy → прогулка по Moda' },
  { id: 'd009', title: 'Kalamış', side: 'Азия', verdict: 'Да, особенно не впервые', description: 'Спокойный респектабельный жилой район у марины, совсем рядом с Модой.', bestFor: 'Комфорт · длинная поездка · тишина', note: 'Kalamış Marina → Caddebostan → Moda' },
];

const sectionMeta = {
  districts: { label: 'Где жить', icon: Compass, intro: 'Стамбул — город без одного центра. Выбор района здесь важнее количества звёзд у отеля.' },
  food: { label: 'Есть и пить', icon: Utensils, intro: 'Наши рестораны, бары, завтраки и простые места — от белых скатертей до рыбного бутерброда.' },
  hotels: { label: 'Отели', icon: BedDouble, intro: 'Точки, где жили мы или друзья, плюс варианты, которые уверенно рекомендуем по расположению.' },
  places: { label: 'Другие места', icon: Sparkles, intro: 'Классика, прогулки, паромы, острова и несколько любимых магазинов.' },
};
const sides: Side[] = ['Все', 'Европа', 'Азия', 'Острова'];
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Home() {
  const [section, setSection] = useState<Section>('districts');
  const [side, setSide] = useState<Side>('Все');
  const [query, setQuery] = useState('');
  const activeMeta = sectionMeta[section];
  const visiblePlaces = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('ru');
    return places.filter((p) => p.section === section && (side === 'Все' || p.side === side) && (!q || `${p.title} ${p.area} ${p.type} ${p.description}`.toLocaleLowerCase('ru').includes(q)));
  }, [query, section, side]);
  const visibleDistricts = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('ru');
    return districts.filter((d) => (side === 'Все' || d.side === side) && (!q || `${d.title} ${d.description} ${d.bestFor}`.toLocaleLowerCase('ru').includes(q)));
  }, [query, side]);
  const resultCount = section === 'districts' ? visibleDistricts.length : visiblePlaces.length;

  function chooseSection(value: string) { setSection(value as Section); setSide('Все'); setQuery(''); }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="К началу гайда"><span className="brand-mark">İ</span><span><b>Стамбул</b><small>Олег × Маша</small></span></a>
        <a className="header-link" href="#guide">Открыть гид <ArrowUpRight aria-hidden="true" /></a>
      </header>
      <section className="hero" id="top">
        <img src={`${assetBase}/istanbul-bosphorus-pages.jpg`} alt="Вид на Стамбул и Босфор с городского парома на закате" />
        <div className="hero-shade" />
        <div className="hero-copy"><div className="eyebrow"><Ship aria-hidden="true" /> Личный гид · обновляем по мере жизни</div><h1>Стамбул<br />без универсальных<br />советов</h1><p>Где остановиться, куда идти голодным и ради какого вида планировать закат.</p></div>
        <div className="hero-stamp" aria-hidden="true"><span>41°01′</span><b>İST</b><span>28°58′</span></div>
      </section>
      <section className="guide-shell" id="guide">
        <div className="guide-heading"><div><p className="kicker">Проверено на себе и близких</p><h2>{activeMeta.label}</h2></div><p>{activeMeta.intro}</p></div>
        <Tabs value={section} onValueChange={chooseSection} className="section-tabs"><TabsList aria-label="Разделы гида">{(Object.entries(sectionMeta) as [Section, typeof sectionMeta[Section]][]).map(([value, meta]) => { const Icon = meta.icon; return <TabsTrigger key={value} value={value}><Icon aria-hidden="true" />{meta.label}</TabsTrigger>; })}</TabsList></Tabs>
        <div className="filters"><div className="side-filter" role="group" aria-label="Сторона города">{sides.map((item) => <Button key={item} type="button" variant={side === item ? 'default' : 'outline'} aria-pressed={side === item} onClick={() => setSide(item)}>{item}</Button>)}</div><div className="search-box"><Search aria-hidden="true" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Район, кухня или место" aria-label="Поиск по гиду" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Очистить поиск"><X aria-hidden="true" /></button>}</div></div>
        <div className="result-line"><span>{resultCount}</span> {section === 'districts' ? 'районов' : 'мест в подборке'}</div>
        {section === 'districts' ? <><div className="route-strip"><div className="route-title"><span>3</span><p><b>дня в городе</b><br />если живёте в Beyoğlu</p></div><div><small>День 1</small><p>Sultanahmet: Айя-София, Голубая мечеть, Цистерна и рынки</p></div><div><small>День 2</small><p>İstiklal, маленькие магазины, Галатская башня и мост</p></div><div><small>День 3</small><p>Karaköy, Galataport, Dolmabahçe и, если есть силы, паром в Moda</p></div></div><div className="district-grid">{visibleDistricts.map((d, i) => <article className="district-card" key={d.id}><div className="district-index">0{i + 1}</div><div className="district-main"><div className="card-topline"><span>{d.side}</span><b>{d.verdict}</b></div><h3>{d.title}</h3><p>{d.description}</p><div className="district-best">{d.bestFor}</div></div><div className="district-route"><MapPin aria-hidden="true" /><span>{d.note}</span></div></article>)}</div></> : <div className="place-grid">{visiblePlaces.map((p, i) => <article className="place-card" key={p.id}><div className="place-number">{String(i + 1).padStart(2, '0')}</div><div className="place-content"><div className="card-topline"><span>{p.side} · {p.area}</span>{p.detail && <b>{p.detail}</b>}</div><h3>{p.title}</h3><div className="place-type">{p.type}</div><p>{p.description}</p></div>{p.link ? <a className="map-link" href={p.link} target="_blank" rel="noreferrer" aria-label={`Открыть ${p.title} на карте`}><MapPin aria-hidden="true" /><span>На карте</span><ArrowUpRight aria-hidden="true" /></a> : <div className="map-link map-link-muted"><MapPin aria-hidden="true" /><span>Ссылка скоро</span></div>}</article>)}</div>}
        {resultCount === 0 && <div className="empty-state"><Compass aria-hidden="true" /><h3>Здесь пока ничего</h3><p>Попробуйте другую сторону города или очистите поиск.</p><Button type="button" onClick={() => { setSide('Все'); setQuery(''); }}>Показать всё</Button></div>}
      </section>
      <footer><div><span className="brand-mark">İ</span><p><b>Это живой список.</b><br />Проверяйте часы работы и бронируйте популярные места заранее.</p></div><p>Собрано Олегом и Машей<br />в Стамбуле и для Стамбула</p></footer>
    </main>
  );
}
