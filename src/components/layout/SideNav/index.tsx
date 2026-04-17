import { useState } from 'react';
import { Layout, Menu, Tooltip } from 'antd';
import {
  FolderOutlined,
  SearchOutlined,
  BugOutlined,
  ApartmentOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { COLORS } from '../../../constants/theme';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const TOP_ITEMS: MenuItem[] = [
  {
    key: 'explorer',
    icon: <FolderOutlined />,
    label: (
      <Tooltip title="Explorer" placement="right">
        Explorer
      </Tooltip>
    ),
  },
  {
    key: 'search',
    icon: <SearchOutlined />,
    label: (
      <Tooltip title="Search" placement="right">
        Search
      </Tooltip>
    ),
  },
  // { key: 'debug',    icon: <BugOutlined />,    label: <Tooltip title="Debug" placement="right">Debug</Tooltip> },
  // { key: 'graph',    icon: <ApartmentOutlined />, label: <Tooltip title="Graph" placement="right">Graph</Tooltip> },
  // { key: 'plugins',  icon: <AppstoreOutlined />, label: <Tooltip title="Plugins" placement="right">Plugins</Tooltip> },
];

const BOTTOM_ITEMS: MenuItem[] = [
  // {
  //   key: 'account',
  //   icon: <UserOutlined />,
  //   label: (
  //     <Tooltip title="Account" placement="right">
  //       Account
  //     </Tooltip>
  //   ),
  // },
  // {
  //   key: 'settings',
  //   icon: <SettingOutlined />,
  //   label: (
  //     <Tooltip title="Settings" placement="right">
  //       Settings
  //     </Tooltip>
  //   ),
  // },
];

const SideNav = () => {
  const [selected, setSelected] = useState<string>('explorer');

  return (
    <Sider
      width={56}
      style={{
        overflow: 'hidden',
        borderRight: `1px solid ${COLORS.outlineVariant}18`,
        display: 'flex',
        flexDirection: 'column',
      }}
      theme="dark"
    >
      {/* Top icons */}
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[selected]}
        onClick={({ key }) => setSelected(key)}
        inlineCollapsed
        items={TOP_ITEMS}
        style={{ flex: 1, border: 'none', paddingTop: 8 }}
      />

      {/* Bottom icons pushed to bottom */}
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[selected]}
        onClick={({ key }) => setSelected(key)}
        inlineCollapsed
        items={BOTTOM_ITEMS}
        style={{ border: 'none', paddingBottom: 8 }}
      />
    </Sider>
  );
};

export default SideNav;
