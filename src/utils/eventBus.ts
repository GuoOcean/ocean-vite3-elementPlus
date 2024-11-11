import mitt from "mitt";

// 定义事件类型
type MittTypes = {
  [key: string | symbol]: any;
  // someEvent: string;
  // anotherEvent: number;
  // 这里可以定义其他事件类型
};
export default mitt<MittTypes>();
