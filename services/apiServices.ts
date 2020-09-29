export const getQuestionsRequest = (
  difficulty: string,
  selectedCategory: string
) => {
  const url = selectedCategory
    ? `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${difficulty}&type=boolean`
    : `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=boolean`;
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getCategoriesRequest = () => {
  return fetch("https://opentdb.com/api_category.php")
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};
