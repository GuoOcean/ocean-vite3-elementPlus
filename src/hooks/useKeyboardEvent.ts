import { useMagicKeys, whenever } from "@vueuse/core";

export default function useKeys(keysMap: Record<string, Function>) {
  const magicKeys = useMagicKeys();
  Object.keys(keysMap).forEach((key) => {
    whenever(magicKeys[key], () => keysMap[key]());
    // whenever(magicKeys[key], (e)=>{
    //     e.preventDefault() // 防止默认行为，避免输入框内容变化
    //     keysMap[key](e)
    // })
  });
}
