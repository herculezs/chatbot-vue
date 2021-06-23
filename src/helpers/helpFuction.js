import constants from '@constants/index';

const generalFunction = {
  Coordinates(Res) {
    const finalCategoryFormula = Res.split(/(?=[-+])/);

    const currentCards = Object.values(constants.cards);

    const matchScore = [];

    currentCards.forEach((x) => {
      const xAxis = x.alphaBetaScore.x;
      const yAxis = x.alphaBetaScore.y;

      const betaY = (+finalCategoryFormula[3]
        + +finalCategoryFormula[1] - +finalCategoryFormula[4]);
      const alphaX = (+finalCategoryFormula[0] + +finalCategoryFormula[2]);

      const score = ((xAxis - alphaX) ** 2)
        + ((yAxis - betaY) ** 2);


      matchScore.push({
        matchScore: score,
        title: x.title,
        value: [x.value[0], x.value[1]],
      });
    });

    matchScore.sort((a, b) => a.matchScore - b.matchScore);
    const [x, y] = matchScore[0].value;
    const character = matchScore[0].title;

    return [x, y, character];
  },
};

export default generalFunction;
