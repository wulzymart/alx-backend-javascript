const Utils = {
  calculateNumber(type, a, b) {
  const rounded_a = Math.round(a);
  const rounded_b = Math.round(b);

  switch (type) {
    case "SUM":
      return rounded_a + rounded_b;
    case "SUBTRACT":
      return rounded_a - rounded_b;
    case "DIVIDE":
      if (rounded_b === 0) {
        return "Error";
      }
      return rounded_a / rounded_b;
    default:
      break;
  }
}
};

module.exports = Utils;
