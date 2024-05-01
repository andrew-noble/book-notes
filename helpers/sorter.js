//sorts based on provided criteria. See Array.prototype.sort() MDN docs
export default function sortBooks(array, criteria) {
  let sortedArray = [];
  if (criteria === "title") {
    sortedArray = array.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
  }
  if (criteria === "recency") {
    sortedArray = array.sort((a, b) => {
      return b.date - a.date;
    });
  }
  if (criteria === "rating") {
    sortedArray = array.sort((a, b) => {
      return b.rating - a.rating;
    });
  }

  return sortedArray;
}
