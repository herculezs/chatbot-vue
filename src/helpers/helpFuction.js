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

  setChosenGroupCharacteristic(event, myResultsScore, othersResultScoreData, chooseOtherResult) {
    if (event === 'Open' && (myResultsScore.opensResult || othersResultScoreData.opensResult)) {
      chooseOtherResult(event, 'opensResult', true, '#FC6F4D', '#B15771', '#c85e3f', '#88444e');
    } else if (event === 'Conscientious' && (myResultsScore.conscientiousResult
      || othersResultScoreData.conscientiousResult)) {
      chooseOtherResult(event, 'conscientiousResult', true, '#FD7c49', '#BE6867', '#be5f3c', '#974c4c');
    } else if (event === 'Extraverted' && (myResultsScore.extravertedResult
      || othersResultScoreData.extravertedResult)) {
      chooseOtherResult(event, 'extravertedResult', true, '#FD8945', '#CB795D', '#d27037', '#99534d');
    } else if (event === 'Agreeable' && (myResultsScore.agreeableResult
      || othersResultScoreData.agreeableResult)) {
      chooseOtherResult(event, 'agreeableResult', true, '#FE9741', '#D88B53', '#9d542b', '#ba744c');
    } else if (event === 'Neurotic' && (myResultsScore.neuroticResult
      || othersResultScoreData.neuroticResult)) {
      chooseOtherResult(event, 'neuroticResult', true, '#FEA43D', '#E59C49', '#9d5828', '#ae6a49');
    } else if (event === 'General' && (myResultsScore.mainResult
      || othersResultScoreData.mainResult)) {
      chooseOtherResult(event, 'mainResult', false, '#9C11F2', '#ff5151', '#5e119f', '#bf4545');
    }
  },
};

export default generalFunction;
