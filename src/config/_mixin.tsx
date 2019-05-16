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
  fontColor: "#ffffff",
  mainColor: "#f6e58d"
};

// export const color = {
//   bgColor: "#ffffff",
//   fontColor: "#14181C",
//   mainColor: "#f6e58d"
// };

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
  if (isNaN(shiftedNormalized)) {
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

export const koreanNumeral = (num: number, withScale: boolean) => {
  if (10000 <= num && num < 10000000) {
    const man = Math.floor(num / 10000);
    const chun = Math.floor((num % 10000) / 1000);
    return (
      man + (chun !== 0 ? `.${chun}` : "") + (withScale === true ? "만" : "")
    );
  } else if (10000000 <= num) {
    const urk = Math.floor(num / 100000000);
    const man = Math.floor((num % 100000000) / 10000000);
    return (
      urk + (man !== 0 ? `.${man}` : "") + (withScale === true ? "억" : "")
    );
  } else {
    return num;
  }
};

/* get related emoji from genre */
export const genreWithEmoji = (genre: string) => {
  let emoji: any;
  switch (genre) {
    case "액션":
      emoji = "🏃‍";
      break;
    case "판타지":
      emoji = "🧙‍";
      break;
    case "SF":
      emoji = "👽";
      break;
    case "모험":
      emoji = "🧭";
      break;
    case "공포":
      emoji = "👻";
      break;
    case "애니메이션":
      emoji = "👀";
      break;
    case "가족":
      emoji = "👪";
      break;
    case "코미디":
      emoji = "🤣";
      break;
    case "드라마":
      emoji = "🎭";
      break;
    case "미스터리":
      emoji = "🕵️‍";
      break;
    case "스릴러":
      emoji = "😱";
      break;
    case "범죄":
      emoji = "👮‍";
      break;
    case "로맨스":
      emoji = "🥰";
      break;
    case "음악":
      emoji = "🎶";
      break;
    case "역사":
      emoji = "📚";
      break;
    case "전쟁":
      emoji = "🔫";
      break;
    case "다큐멘터리":
      emoji = "📹";
      break;
    case "서부":
      emoji = "🌵";
      break;
    case "TV 영화":
      emoji = "📽️";
      break;
    default:
      break;
  }
  return `${emoji} ${genre}`;
};
