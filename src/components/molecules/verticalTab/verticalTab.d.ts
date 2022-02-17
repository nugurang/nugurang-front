declare interface VerticalTabItemObject {
  name: string;
  icon?: IconObject;
  title?: string;
  subtitle?: string;
  onClickTitle?: () => void;
  child?: React.ReactNode;
}

declare interface VerticalTabStateObject {
  index: number;
  depth: number;
}
