import * as pathGenerator from "../js/pathGenerator.js";
import * as svgData from "../constants/svgData.js";

const LAYOUT_MAP = [
  [false, false, true, false, false, false],
  [true, false, false, true, true, false],
  [false, true, true, true, false, true],
  [true, false, false, true, false, false],
  [false, false, true, true, true, false],
  [false, true, false, false, true, true],
];
const ANIMATION_CONTAINER = document.querySelector(".container");
const SVG_CONTAINER = document.querySelector("svg");
const ANIMATION_DATA = [
  [
    { start: 14, end: 6, direction: pathGenerator.UP_LEFT },
    { start: 14, end: 18, direction: pathGenerator.DOWN_LEFT },
    { start: 2, end: 10, direction: pathGenerator.RIGHT_DOWN },
    { start: 10, end: 28, direction: pathGenerator.STRAIGHT },
    { start: 34, end: 26, direction: pathGenerator.LEFT_UP },
  ],

  [
    { start: 10, end: 21, direction: pathGenerator.DOWN_LEFT },
    { start: 17, end: 21, direction: pathGenerator.DOWN_LEFT },
    { start: 26, end: 13, direction: pathGenerator.LEFT_UP },
    { start: 2, end: 13, direction: pathGenerator.LEFT_DOWN },
    { start: 9, end: 13, direction: pathGenerator.LEFT_DOWN },
  ],

  [
    { start: 21, end: 10, direction: pathGenerator.RIGHT_UP },
    { start: 17, end: 35, direction: pathGenerator.STRAIGHT },
    { start: 6, end: 2, direction: pathGenerator.RIGHT_UP },
    { start: 18, end: 31, direction: pathGenerator.DOWN_RIGHT },
    { start: 13, end: 26, direction: pathGenerator.DOWN_RIGHT },
  ],

  [
    { start: 31, end: 18, direction: pathGenerator.UP_LEFT },
    { start: 31, end: 34, direction: pathGenerator.STRAIGHT },
    { start: 28, end: 15, direction: pathGenerator.UP_LEFT },
    { start: 6, end: 9, direction: pathGenerator.STRAIGHT },
  ],
];
const ONE_ANIMATION_GROUP_TIME = 3000;
const DELAY_BETWEEN_ANIMATIONS = 1000;
const TOTAL_ANIMATION_TIME =
  ANIMATION_DATA.length * (ONE_ANIMATION_GROUP_TIME + DELAY_BETWEEN_ANIMATIONS);
export const CARD_NAMES = [
  "Scholar - 0",
  "Inbox - 1",
  "Battery - 2",
  "Notif - 3",
  "Lab - 4",
  "Light - 5",
  "Book - 6",
  "Bookmark - 7",
  "Job - 8",
  "Spider - 9",
  "Chart - 10",
  "Chat - 11",
  "Chat - 12",
  "Database - 13",
  "Todo - 14",
  "Code - 15",
];
export const STROKE_ANIMATIONS = [
  "stroke-anim-1",
  "stroke-anim-2",
  "stroke-anim-3",
  "stroke-anim-4",
];

export const AnimationConfig = {
  layoutMap: LAYOUT_MAP,
  animationContainer: ANIMATION_CONTAINER,
  drawChildElement: (isActiveChild, activeCount) => {
    const cell = document.createElement("div");
    if (!isActiveChild) return cell;

    // Giving Default Cell CSS and HTML
    cell.classList.add("card");
    cell.innerHTML = svgData.svgArray[activeCount];

    // Creating new paragraph for the cell
    let child = document.createElement("p");
    child.classList.add("hidden-text");
    child.textContent = CARD_NAMES[activeCount++];
    cell.appendChild(child);

    return cell;
  },
  svgContainer: SVG_CONTAINER,
  animationGroups: ANIMATION_DATA,
  time: {
    animationGroupTime: ONE_ANIMATION_GROUP_TIME,
    delayBetweenGroups: DELAY_BETWEEN_ANIMATIONS,
    totalAnimationTime: TOTAL_ANIMATION_TIME,
  },
};
