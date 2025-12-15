const createRandomNumber = (length: number): number[] => {
  const result: number[] = [];

  while (result.length < length) {
    const randomNum = Math.floor(Math.random() * 9) + 1;

    if (!result.includes(randomNum)) {
      result.push(randomNum);
    }
  }

  return result;
};

export default createRandomNumber;
