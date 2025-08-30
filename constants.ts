import { Location } from './types';

export const ANCESTRIES: string[] = [
  "Viking Norsemen",
  "Roman Legionary",
  "Feudal Japanese Samurai",
  "Mongol Horde",
  "Egyptian Empire Builder",
  "Celtic Tribesman",
  "Mauryan Indian"
];

export const DEFAULT_MAP_IMAGE = "https://images.unsplash.com/photo-1543949882-911872583592?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const LOCATIONS: Location[] = [
  {
    id: "northumbria",
    name: "Northumbrian Coast",
    coordinates: { top: "30%", left: "48%" },
    npc: { 
      name: "Bjorn the Skald", 
      title: "Keeper of Sagas",
      backstory: "Bjorn sailed on the first longships to reach these shores. His eyes have seen the fury of the raid and the sorrow of its aftermath. Now, his voice carries the weight of those memories."
    },
    context: "The first Viking raids on the monasteries of England, a clash of faiths and futures.",
    imageUrl: "https://images.unsplash.com/photo-1508880193394-0a9726286751?q=80&w=2862&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "gaul",
    name: "Forests of Gaul",
    coordinates: { top: "45%", left: "52%" },
    npc: { name: "Cassius the Veteran", title: "Centurion of the Ninth" },
    context: "The brutal campaigns of Caesar to bring Gaul under Roman dominion, fighting against fierce tribal warriors.",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "kyoto",
    name: "Fields of Kyoto",
    coordinates: { top: "42%", left: "85%" },
    npc: { name: "Kenshin the Ronin", title: "Sword Saint" },
    context: "The Sengoku period, a time of constant civil war where ambitious daimyo fought for control of Japan.",
    imageUrl: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "khwarazm",
    name: "Plains of Khwarazm",
    coordinates: { top: "40%", left: "65%" },
    npc: { name: "Altan the Scout", title: "Eye of the Khan" },
    context: "The unstoppable Mongol invasion of the Khwarazmian Empire, a campaign of speed, terror, and conquest.",
    imageUrl: "https://images.unsplash.com/photo-1634842743484-93666d3a821e?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "nubia",
    name: "Deserts of Nubia",
    coordinates: { top: "65%", left: "58%" },
    npc: { name: "Nia the Priestess", title: "Voice of the Gods" },
    context: "The expansion of the New Kingdom of Egypt into Nubian lands, seeking gold, resources, and control of the Nile.",
    imageUrl: "https://images.unsplash.com/photo-1528962297839-a7d0c36034f3?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
      id: "caledonia",
      name: "Misty Highlands of Caledonia",
      coordinates: { top: "25%", left: "45%" },
      npc: { name: "Morag the Wise", title: "Seer of the Tribes" },
      context: "The defiant resistance of the Celtic tribes against the advancing Roman legions at the edge of the known world.",
      imageUrl: "https://images.unsplash.com/photo-1547919371-0677a288c8b6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
      id: "indus",
      name: "Indus River Valley",
      coordinates: { top: "60%", left: "75%" },
      npc: { name: "Arya the Chronicler", title: "Keeper of Vedas" },
      context: "The rise of the Mauryan Empire under Chandragupta, pushing back the Greek successors of Alexander the Great from the borders of India.",
      imageUrl: "https://images.unsplash.com/photo-1599831022131-6a2c2b3e8a4a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];
