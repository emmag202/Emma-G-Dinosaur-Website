const quizForm = document.querySelector("#quizForm");
const resultCard = document.querySelector("#resultCard");
const resultTitle = document.querySelector("#resultTitle");
const resultText = document.querySelector("#resultText");
const restartButton = document.querySelector("#restartButton");

const results = {
  billy: {
    title: "Billy",
    text: "You are like Billy! You love the outdoors and an adventure, whether that’s a playdate at the park or a fun hike in the mountains or at the beach. It seems you can never be kept inside or stay still. You also have a bit of curiosity in you and can’t help checking some cool rocks or plants on your adventures."
  },
  sally: {
    title: "Sally",
    text: "You are like Sally! You like to crack some jokes and just make people smile. As long as there are smiles, life is okay! You always have a smile on too. You love hanging out with your friends and dressing up in costumes or nice outfits for fun!"
  },
  andy: {
    title: "Andy",
    text: "You are like Andy! You are quite shy and don’t love talking to people. You are into more indoorsy activities like reading and videogames. You also enjoy some warm weather and having creative opportunities in your life."
  },
  rexy: {
    title: "Rexy",
    text: "You are like Rexy! You love making new friends and making sure everyone has a person to talk to. You are a bit of a chatter mouth which is fine, but sometimes teachers get a bit annoyed. You also love your family and are protective of them."
  },
  tracey: {
    title: "Tracey",
    text: "You are like Tracey! You are kind of quiet but you are smart. Your friend group is small, but you love them all. You like things in a more organized manner and try your very best to always tell the truth."
  },
  victor: {
    title: "Victor",
    text: "You are like Victor! You are a bit hyper and all over the place, you like to be always active. You love building things with legos or wood or pipecleaners. You also like being fast and playing sports. The more you can go out and run and play the happier you are."
  },
  pam: {
    title: "Pam",
    text: "You are like Pam! You are pretty good at art and people are impressed. You are a positive person who likes to see the good in things. You also love to use your artistic talent to create presents for family and friends; it could be a card, a drawing, or a sculpture. You love to make sure your friends are loved and are a very sweet person."
  },
  penny: {
    title: "Penny",
    text: "You are like Penny! You tend to take charge of situations and lead people. You make sure things are done correctly and people are happy. You also are a very thoughtful person who likes to gives whether that be in the forms of gifts or presents."
  },
  cleo: {
    title: "Cleo",
    text: "You are like Cleo! Though not a dinosaur you are still very loved. You are a bit mischievous and like to cause some problems, but you always make sure others know you love them. You are pretty good at solving problems and do well in some stressful situations. You also are very imaginative and love to play pretend or think of some fun scenarios and maybe create them."
  }
};

const matchingGrid = {
  adventurer: {
    yellow: "billy",
    green: "sally",
    blue: "andy"
  },
  funMaker: {
    yellow: "rexy",
    green: "sally",
    blue: "tracey"
  },
  builder: {
    yellow: "victor",
    green: "pam",
    blue: "andy"
  },
  caretaker: {
    yellow: "cleo",
    green: "penny",
    blue: "tracey"
  },
  aestheticThinker: {
    yellow: "rexy",
    green: "sally",
    blue: "tracey"
  },
  chaos: {
    yellow: "cleo",
    green: "sally",
    blue: "tracey"
  }
};

function countAnswers(questionNames) {
  const score = {};

  for (const questionName of questionNames) {
    const checkedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);

    if (!checkedAnswer) {
      return null;
    }

    const answerValue = checkedAnswer.value;
    score[answerValue] = (score[answerValue] || 0) + 1;
  }

  return score;
}

function findWinner(score) {
  let winner = "";
  let highestScore = -1;

  for (const answerValue in score) {
    if (score[answerValue] > highestScore) {
      winner = answerValue;
      highestScore = score[answerValue];
    }
  }

  return winner;
}

quizForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const personalityScore = countAnswers(["personality1", "personality2", "personality3", "personality4"]);
  const socialScore = countAnswers(["social1", "social2", "social3"]);

  if (!personalityScore || !socialScore) {
    quizForm.reportValidity();
    return;
  }

  const personalityType = findWinner(personalityScore);
  const socialEnergy = findWinner(socialScore);
  const dinoName = matchingGrid[personalityType][socialEnergy];

  resultTitle.textContent = results[dinoName].title;
  resultText.textContent = results[dinoName].text;
  resultCard.hidden = false;
  resultCard.scrollIntoView({ behavior: "smooth" });
});

restartButton.addEventListener("click", function () {
  quizForm.reset();
  resultCard.hidden = true;
  quizForm.scrollIntoView({ behavior: "smooth" });
});
