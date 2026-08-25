export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  route: string;
  badge?: string;
  backgroundColor?: string;
  iconColor?: string;
}

export interface QuickAccessItem {
  id: string;
  title: string;
  iconName: string;
  route: string;
  color: string;
  bgColor: string;
}
