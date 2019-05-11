import React from "react";

interface Props {
  genre: string;
}

const GenreEmoji = ({ genre }: Props) => {
  let emoji: any;
  switch (genre) {
    case "액션":
      emoji = "🏃‍♂️";
      break;
    case "판타지":
      emoji = "🧙‍♂️";
      break;
    case "SF":
      emoji = "👨‍🚀";
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
    case "코미디":
      emoji = "🤣";
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
      emoji = "🕵️‍♂️";
      break;
    case "스릴러":
      emoji = "😱";
      break;
    case "범죄":
      emoji = "👮‍♂️";
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
    case "역사":
      emoji = "📚";
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
  return (
    <span>
      {emoji}
      {genre}
    </span>
  );
};

export default GenreEmoji;
