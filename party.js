// Who's playing whom: shown on index.html#/party. Edit freely if someone changes their mind;
// no rebuild needed, just reload the page. Ids are the character ids in characters.js
// (the same as lore/<id>.md). `secondary` is the backup if the primary dies; leave it out if none.
// Array order = order on the page.

const PARTY = [
  { player: "Lena", primary: "stargazer", secondary: "flagellant" },
  { player: "Nikki", primary: "knight-errant", secondary: "summoner" },
  { player: "Payotn", primary: "sorceress", secondary: "squire" },
  { player: "Andrew", primary: "swordsaint", secondary: "relentless" },
  { player: "David (King San)", primary: "pomander", secondary: "squire" },
  { player: "Rylie", primary: "guttersnipe", secondary: "wretched" },
  { player: "Blake", primary: "pomander", secondary: "bird-keeper" },
];
