import React, { useCallback, useEffect } from "react";

const keyCodeMapping = {
  a: "KeyA",
  b: "KeyB",
  c: "KeyC",
  d: "KeyD",
  e: "KeyE",
  f: "KeyF",
  g: "KeyG",
  h: "KeyH",
  i: "KeyI",
  j: "KeyJ",
  k: "KeyK",
  l: "KeyL",
  m: "KeyM",
  n: "KeyN",
  o: "KeyO",
  p: "KeyP",
  q: "KeyQ",
  r: "KeyR",
  s: "KeyS",
  t: "KeyT",
  u: "KeyU",
  v: "KeyV",
  w: "KeyW",
  x: "KeyX",
  y: "KeyY",
  z: "KeyZ",
  "0": "Digit0",
  "1": "Digit1",
  "2": "Digit2",
  "3": "Digit3",
  "4": "Digit4",
  "5": "Digit5",
  "6": "Digit6",
  "7": "Digit7",
  "8": "Digit8",
  "9": "Digit9",
  ESC: "Escape",
  Enter: "Enter",
  Backspace: "Backspace",
};
type KeyCodeMappingKey = keyof typeof keyCodeMapping;
type SpecialKey = "Shift" | "Control" | "Alt" | "Command";
/**
 * @description 该hook为一个键盘事件的hook，目前可以绑定的键位最多为2个，当触发键盘事件时会执行对应的回调
 * @param {[KeyCodeMappingKey, SpecialKey?]} keySet keySet为一个数组，最大长度是2，数组的第一位只能为键盘上的字母和数字，数组的第二位只能是Shift、Control、Alt、Command中的一个
 * @param {(e?: KeyboardEvent) => void} callback 触发键盘事件后的回调
 * @param {[deep:React.DependencyList]} deep effect的依赖
 * @param {React.RefObject<HTMLElement>} [target] 需要监听哪个元素并设置keyboard事件，默认是window
 */
export default function useKeyBoardWatchEvent(
  keySet: [KeyCodeMappingKey, SpecialKey?],
  callback: (e: KeyboardEvent) => void = () => {},
  deep: React.DependencyList = [],
  target?: React.RefObject<HTMLElement>
) {
  const handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    const [keycode, specialkey] = keySet;
    // 不能用keyCode，这个属性已经在官方被deprecated，doc：https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    const eventKeyCode = e.code;
    // 你设置的key
    const setKey = keyCodeMapping[keycode];
    // 如果没有设置特殊key，就看用户当前的key是否匹配，匹配执行callback
    if (!specialkey) return eventKeyCode === setKey && callback(e);
    // 如果设置了两个就走下面
    const isMetaKey = e.metaKey;
    const isShiftKey = e.shiftKey;
    const isContrlKey = e.ctrlKey;
    const isAltKey = e.altKey;
    switch (specialkey) {
      case "Alt":
        isAltKey && eventKeyCode === setKey && callback(e);
        break;
      case "Control":
        isContrlKey && eventKeyCode === setKey && callback(e);
        break;
      case "Shift":
        isShiftKey && eventKeyCode === setKey && callback(e);
        break;
      case "Command":
        isMetaKey && eventKeyCode === setKey && callback(e);
        break;
    }
  };
  const errorCheck = useCallback(() => {
    let noError = true;
    if (!keySet || !keySet.length) {
      console.error("useKeyBoardWatchEvent Error: invalid keyCodeSet");
      noError = false;
    }
    if (keySet.length > 2) {
      console.error("useKeyBoardWatchEvent Error: keyCodeSet.length must <= 2");
      noError = false;
    }
    if (!(keySet[0] in keyCodeMapping)) {
      console.error(
        "useKeyBoardWatchEvent Error: keyCodeSet[0] doesn't exist in keyCodeMapping"
      );
      noError = false;
    }
    return noError;
  }, []);
  useEffect(() => {
    if (!errorCheck()) return;
    (target?.current! || window).addEventListener("keydown", handleKeyDown);
    return () => {
      (target?.current! || window).removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [...deep, target]);
}
