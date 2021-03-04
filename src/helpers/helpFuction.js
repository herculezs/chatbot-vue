import constants from '@constants/index';

const generalFunction = {
  Coordinates(Res) {
    const finalCategoryFormula = Res.split(/(?=[-+])/);

    const currentCards = Object.values(constants.cards);

    const matchScore = [];

    currentCards.forEach((x) => {
      const openess = x.categories.OPENESS;
      const conscientiousness = x.categories.CONSCIENTIOUSNESS;
      const extraversion = x.categories.EXTRAVERSION;
      const agreeableness = x.categories.AGREEABLENESS;
      const neuroticism = x.categories.NEUROTICISM;

      const score = ((finalCategoryFormula[0] - openess) ** 2)
        + ((finalCategoryFormula[1] - conscientiousness) ** 2)
        + ((finalCategoryFormula[2] - extraversion) ** 2)
        + ((finalCategoryFormula[3] - agreeableness) ** 2)
        + ((finalCategoryFormula[4] - neuroticism) ** 2);

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
