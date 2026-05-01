const greenLight = [
  { id: 0, color: '#eee' },
  { id: 1, color: '#d6e685' },
  { id: 2, color: '#8cc665' },
  { id: 3, color: '#44a340' },
  { id: 4, color: '#1e6823' },
];

const greenDark = [
  { id: 0, color: '#0d1117' },
  { id: 1, color: '#0e4429' },
  { id: 2, color: '#26a641' },
  { id: 3, color: '#39d353' },
  { id: 4, color: '#56d364' },
];

const allColors = {
  dark: greenDark,
  light: greenLight,
};

const indexedColors = Object.fromEntries(
  Object.entries(allColors).map(([modo, arrColors]) => [
    modo,
    Object.fromEntries(arrColors.map((item) => [item.id, item.color])),
  ]),
);
export { greenLight, greenDark, indexedColors };
