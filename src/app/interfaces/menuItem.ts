export interface menuItem {
  title?: string;
  icon?: string;
  active?: boolean;
  type?: string;
  route?: string;
  showSubMenu?: boolean;
  subMenus?: menuItem[];
}
