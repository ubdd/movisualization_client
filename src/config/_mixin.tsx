// sizes for media queries
const sizes = {
  desktop: 922,
  tablet: 768,
  phone: 576
};

const posterWidth = 6;

export const fontSize = {
  smallFontSize: "9px",
  normalFontSize: "12px",
  largeFontSize: "15px"
};

export const posterSize = {
  width: `${posterWidth}rem`,
  height: `${posterWidth * 1.4375}rem`
};

export const websiteTitle = "👀 Movisualization";

export const headerHeight = "6rem";

export const color = {
  bgColor: "#14181C",
  fontColor: "#FFF",
  mainColor: "#f6e58d"
};

const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

export const media: any = {
  custom: customMediaQuery,
  desktop: customMediaQuery(sizes.desktop),
  tablet: customMediaQuery(sizes.tablet),
  phone: customMediaQuery(sizes.phone)
};

/*

  rawValue: raw value
  minEntry: minimum raw value
  maxEntry: maximum, raw value
  normalizedMin: minimum normalized value
  normalizedMax: maximum normalized value
  fixed: fixed point

  */
export const normalize = (
  rawValue: number,
  minEntry: number,
  maxEntry: number,
  normalizedMin: number,
  normalizedMax: number,
  fixed: number
) => {
  const mx =
    Math.log(rawValue - minEntry + 1) / Math.log(maxEntry - minEntry + 1);
  const preshiftNormalized = mx * (normalizedMax - normalizedMin);
  const shiftedNormalized = preshiftNormalized + normalizedMin;
  if (shiftedNormalized === NaN) {
    console.error(
      "Raw value is lower than min entry or entered wrong raw value."
    );
    return minEntry.toFixed(fixed);
  }
  if (shiftedNormalized > normalizedMax) {
    console.error(
      "Raw value exceeds max entry.\n you should increase max entry."
    );
    return normalizedMax.toFixed(fixed);
  }
  return shiftedNormalized.toFixed(fixed);
};
