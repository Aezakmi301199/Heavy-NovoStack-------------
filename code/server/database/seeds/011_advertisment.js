/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export const seed = async function(knex) {
  await knex('advertisment').del()
  await knex('advertisment').insert([
    {user_id:13,category:'Трактор',exposition:'John Deere 8295 R – американский трактор, обладающий всеми преимуществами более дорогих машин из своей ценовой категории. Технически совершенный трактор, но при этом он является одним из самых популярных в классе – во многом благодаря сбалансированным характеристикам, оптимальному набору сложной электроники и высокой функциональности. Машина оказалась весьма эффективной в сельском хозяйстве, а также при выполнении совмещенных операций.Данный трактор в идеальном техническом состоянии. Общая наработка 12366 м.ч., капремонт двигателя в 2021г. Наработка после капремонта 1360 м.ч. коробка на отлично, передний мост и бортовые редуктора перебраны, новый аккумулятор.Полностью обслужен. Никаких денежных вложений не требует. Полностью готов к работе.Среди подобной техники на нашем рынке, это лучший вариант!',
    title:'John Deere 8000 Series',cost:9900000,location:'Суходольская 16',brand:'John Deere',mileage:325},
    {user_id:2,category:'Трактор',exposition:'Трактор FENDT 930 Vario TMS2008 год.Куплен 2008.Выпуск 2007.Наработка 600 моточасов.310 л.с. номинальная мощность.Рама, двигатель, КПП, мосты, навеска - Всё в ИДЕАЛЬНОМ состоянии.После капремонта наработка 600 моточасов.Общая наработка 12900 моточасов.Состояние отличнейшее.Абсолютно без вложений.Полностью готов к выполнению любых задач.Дорожный просвет (клиренс): 51 см Радиус поворота: 6,5 м Размер колес: передние - 650/65R34, задние - 710/70R42. Скорость - 60 км/ч.Объем бака - 625 л.',title:'Fendt Vario 930',
    cost:6400000,location:'Суходольская 16',brand:'Fendt',mileage:500},
    {user_id:13,category:'Трактор',exposition:'Трактор предназначен для выполнения:комплекса работ в сельском хозяйстве по предпосевной обработке почвы, посева, посадки, ухода за посевами, уборкой овощей, трав, технических культур;специальных работ в промышленности и коммунальных хозяйствах;может использоваться в качестве базы для монтажа на раме и навесной системе различного оборудования.',
    title:'JCB Fastrac',cost:1300000,location:'Суходольская 16',brand:'JCB',mileage:3000},
    {user_id:5,category:'Бульдозер',exposition:'Продается бульдозер Komatsu D65. Год выпуска - 2012. Масса - 15,62 т. Наработка - 13 000 мото часов. Габаритные размеры, мм: 6600х3100х3460. Мощность - 207 л.с. Состояние отличное.Продажа осуществляется компанией Техбаза официальным дилером: WACKER NEUSON, LOCUST, WEIDEMANN, BEAVER, XGMA TRADE IN (прием б/у техники в зачет стоимости при покупке новой) BUY BACK (обратный выкуп) Доставка техники по России своим трейлером. Звонок по России БЕСПЛАТНЫЙ, ежедневно с 9:00 до 18:00, воскресенье - выходной.',
    title:'Komatsu D65',cost:8000000,location:'Суходольская 16',brand:'Komatsu',mileage:5000},
    {user_id:5,category:'Бульдозер',exposition:'Продается Бульдозep гуceничный SHЕНWА (НВХG) SD7 24 тонны б/уДвигатель: Cummins Емкость отвала, м3: 8,4 Tеxника полностью провepeнa и гoтoвa к экcплуатации, вложeний нe требуeт. Peальный нapабoткa – 2800 м.ч. (любые провepки) Машина без залогов и ограничений. Возможно приобретение в лизинг. Цена указана с НДС! Юридически безопасная сделка. По всем вопросам ЗВОНИТЕ!'
    ,title:'Бульдозер Shehwa SD 7',cost:9500000,location:'Суходольская 16',brand:'Shehwa',mileage:6000},
    
  ]);
};
