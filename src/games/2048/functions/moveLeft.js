export const compress = (row) => {
  const filtered = row.filter((value) => value !== 0);
  while (filtered.length < 4) {
    filtered.push(0);
  }

  return filtered;
};

export const merge = (row) => {
  const newRow = [...row];

  for (let i = 0; i < 3; i++) {
    if (newRow[i] !== 0 && newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      newRow[i + 1] = 0;
    }
  }

  return newRow;
};

export const moveRowLeft = (row) => {
  let newRow = compress(row);
  newRow = merge(newRow);
  newRow = compress(newRow);

  return newRow;
};

export const moveLeft = (board) => {
  return board.map((row) => moveRowLeft(row));
};
