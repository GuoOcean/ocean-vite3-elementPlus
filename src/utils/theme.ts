// 处理主题样式
export function handleThemeStyle(theme: string | null) {
  document.documentElement.style.setProperty("--el-color-primary", theme);
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(
      `--el-color-primary-light-${i}`,
      `${getLightColor(theme, i / 10)}`
    );
  }
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(
      `--el-color-primary-dark-${i}`,
      `${getDarkColor(theme, i / 10)}`
    );
  }
  // document.documentElement.style.setProperty(
  //   "--el-menu-base-level-padding",
  //   "16px"
  // );
  // document.documentElement.style.setProperty("--el-menu-level-padding", "16px");
  document.documentElement.style.setProperty("--el-menu-item-height", "40px");
  document.documentElement.style.setProperty(
    "--el-menu-sub-item-height",
    "40px"
  );
}

// hex颜色转rgb颜色
export function hexToRgb(str: any) {
  str = str.replace("#", "");
  let hexs = str.match(/../g);
  for (let i = 0; i < 3; i++) {
    hexs[i] = parseInt(hexs![i], 16);
  }
  return hexs;
}

// rgb颜色转Hex颜色
export function rgbToHex(r: any, g: any, b: any) {
  let hexs = [r.toString(16), g.toString(16), b.toString(16)];
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length == 1) {
      hexs[i] = `0${hexs[i]}`;
    }
  }
  return `#${hexs.join("")}`;
}

// 变浅颜色值
export function getLightColor(color: any, level: any) {
  let rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) {
    rgb![i] = Math.floor((255 - rgb![i]) * level + rgb![i]);
  }
  return rgbToHex(rgb[0], rgb![1], rgb![2]);
}

// 变深颜色值
export function getDarkColor(color: any, level: any) {
  let rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor(rgb[i] * (1 - level));
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}
