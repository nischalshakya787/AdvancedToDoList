const header = {
  "X-Api-Key": "dg8M0oRnpZHlcsZKjeac2w==Zvgmdkvk7MAcwnl4",
};
const motivationalField = document.querySelector(".motivation");
const motivationalLoader = document.querySelector(".motivationLoader");
const author = document.querySelector(".author");

const generateMotivation = () => {
  motivationalLoader.style.display = "block";
  const motivation = fetch(
    "https://api.api-ninjas.com/v1/quotes?category=inspirational",
    {
      headers: header,
    }
  );
  motivation
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      response.forEach((element) => {
        console.log(element);
        let motivationQuote = element.quote;
        let writer = element.author;
        console.log(motivationQuote);
        motivationalLoader.style.display = "none";
        motivationalField.innerHTML = `<span class="quote">${motivationQuote}</span>`;
        author.innerHTML = writer;
      });
    })
    .catch((error) => {
      motivationalLoader.style.display = "none";
      motivationalField.innerHTML = `<span>Error Fetching Motivational Quotes</span>`;
      console.log(error);
    });
};

generateMotivation();
