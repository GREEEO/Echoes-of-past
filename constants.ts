
import { Location } from './types';

export const ANCESTRIES: string[] = [
  "Viking Norsemen",
  "Roman Legionary",
  "Feudal Japanese Samurai",
  "Mongol Horde",
  "Egyptian Empire Builder",
  "Celtic Tribesman"
];

export const LOCATIONS: Location[] = [
  {
    id: "northumbria",
    name: "Northumbrian Coast",
    coordinates: { top: "30%", left: "48%" },
    npc: { name: "Bjorn the Skald", title: "Keeper of Sagas" },
    context: "The first Viking raids on the monasteries of England, a clash of faiths and futures."
  },
  {
    id: "gaul",
    name: "Forests of Gaul",
    coordinates: { top: "45%", left: "52%" },
    npc: { name: "Cassius the Veteran", title: "Centurion of the Ninth" },
    context: "The brutal campaigns of Caesar to bring Gaul under Roman dominion, fighting against fierce tribal warriors."
  },
  {
    id: "kyoto",
    name: "Fields of Kyoto",
    coordinates: { top: "42%", left: "85%" },
    npc: { name: "Kenshin the Ronin", title: "Sword Saint" },
    context: "The Sengoku period, a time of constant civil war where ambitious daimyo fought for control of Japan."
  },
  {
    id: "khwarazm",
    name: "Plains of Khwarazm",
    coordinates: { top: "40%", left: "65%" },
    npc: { name: "Altan the Scout", title: "Eye of the Khan" },
    context: "The unstoppable Mongol invasion of the Khwarazmian Empire, a campaign of speed, terror, and conquest."
  },
  {
    id: "nubia",
    name: "Deserts of Nubia",
    coordinates: { top: "65%", left: "58%" },
    npc: { name: "Nia the Priestess", title: "Voice of the Gods" },
    context: "The expansion of the New Kingdom of Egypt into Nubian lands, seeking gold, resources, and control of the Nile."
  },
  {
      id: "caledonia",
      name: "Misty Highlands of Caledonia",
      coordinates: { top: "25%", left: "45%" },
      npc: { name: "Morag the Wise", title: "Seer of the Tribes" },
      context: "The defiant resistance of the Celtic tribes against the advancing Roman legions at the edge of the known world."
  }
];
