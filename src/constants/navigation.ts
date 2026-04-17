export interface NavLink {
  key: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface FooterLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface HeaderAction {
  key: string;
  icon: string;
}
export const NAV_LINKS: NavLink[] = [
  { key: 'explore', label: 'Explore', href: '#', active: false },
  { key: 'problems', label: 'Problems', href: '#', active: true },
  // { key: 'contest',  label: 'Contest',  href: '#', active: false },
  // { key: 'discuss',  label: 'Discuss',  href: '#', active: false },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Navigation',
    links: [
      { label: 'Explore', href: '#', active: false },
      { label: 'Problems', href: '#', active: true },
      { label: 'Contest', href: '#', active: false },
      { label: 'Discuss', href: '#', active: false },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Support', href: '#' },
      { label: 'Community', href: '#' },
    ],
  },
];

export const HEADER_ACTIONS: HeaderAction[] = [
  { key: 'notifications', icon: 'notifications' },
  { key: 'settings', icon: 'settings' },
];
