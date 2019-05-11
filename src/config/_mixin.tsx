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

export const websiteTitle = "Movisualization";

export const headerHeight = "6rem";

export const color = { bgColor: "#14181C", fontColor: "#FFF" };

const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

export const media: any = {
  custom: customMediaQuery,
  desktop: customMediaQuery(sizes.desktop),
  tablet: customMediaQuery(sizes.tablet),
  phone: customMediaQuery(sizes.phone)
};
