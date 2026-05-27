import { Breadcrumb, Space } from "antd";

export const AppBreadcrumb = ({ items = [] }: { items: any }) => (
    <Space size={6} align="center" wrap>
        <Breadcrumb
            separator=">"
            items={[
                {
                    title: 'Home',
                },
                {
                    title: 'Application Center',
                    href: '',
                },
                {
                    title: 'Application List',
                    href: '',
                },
                {
                    title: 'An Application',
                },
            ]}
        />
    </Space>
);