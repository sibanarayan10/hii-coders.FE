import { useState } from 'react';
import { Typography, Divider, Tooltip, Upload, message } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
    CameraOutlined,
    CrownOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { THEME } from '../../constants/theme';
import { UserRole } from '../../enums/UserRole';

const { Text } = Typography;

interface ProfilePopoverProps {
    onClose: () => void;
}

export const ProfilePopover = ({ onClose }: ProfilePopoverProps) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleLogout = async () => {
        await logout();
        onClose();
        navigate('/auth/sign-in');
    };

    const handleAvatarChange = (file: File) => {
        // Local preview — swap this for an API call when endpoint is ready:
        // await UserService.uploadAvatar(file);
        setUploading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            setAvatarUrl(e.target?.result as string);
            setUploading(false);
            message.success('Profile picture updated');
        };
        reader.readAsDataURL(file);
        return false; // prevent antd auto-upload
    };

    const initials = user?.name
        ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
        : '?';

    const isAdmin = user?.role === UserRole.ADMIN;

    return (
        <>
            <div
                onClick={onClose}
                style={{ position: 'fixed', inset: 0, zIndex: 199 }}
            />

            <div
                style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    width: 240,
                    background: '#0d1530',
                    border: `1px solid ${THEME.bgCardBorder}`,
                    borderRadius: 14,
                    boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
                    zIndex: 200,
                    overflow: 'hidden',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Avatar + user info */}
                <div style={{ padding: '20px 20px 16px', textAlign: 'center' }}>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: 12 }}>
                        {/* Avatar circle */}
                        <div
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: '50%',
                                background: avatarUrl
                                    ? 'transparent'
                                    : `linear-gradient(135deg, ${THEME.accent}, #a084ee)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: `2px solid ${THEME.bgCardBorder}`,
                                overflow: 'hidden',
                                margin: '0 auto',
                            }}
                        >
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <Text style={{ color: '#fff', fontSize: 22, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                                    {initials}
                                </Text>
                            )}
                        </div>

                        {/* Camera upload badge */}
                        <Upload
                            accept="image/*"
                            showUploadList={false}
                            beforeUpload={handleAvatarChange}
                        >
                            <Tooltip title="Change photo">
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        width: 22,
                                        height: 22,
                                        borderRadius: '50%',
                                        background: THEME.accent,
                                        border: `2px solid #0d1530`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'transform 0.15s',
                                    }}
                                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.15)')}
                                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
                                >
                                    <CameraOutlined style={{ color: '#fff', fontSize: 11 }} />
                                </div>
                            </Tooltip>
                        </Upload>
                    </div>

                    {/* Name */}
                    <Text
                        style={{
                            color: THEME.textPrimary,
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: 15,
                            display: 'block',
                            lineHeight: 1.3,
                        }}
                    >
                        {user?.name ?? 'Guest'}
                    </Text>

                    {/* Email */}
                    <Text
                        style={{
                            color: THEME.textSecondary,
                            fontSize: 12,
                            fontFamily: "'Space Grotesk', sans-serif",
                            display: 'block',
                            marginTop: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {user?.email ?? ''}
                    </Text>

                    {/* Role badge */}
                    {isAdmin && (
                        <span
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                marginTop: 8,
                                background: 'rgba(108,99,255,0.12)',
                                border: `1px solid rgba(108,99,255,0.25)`,
                                borderRadius: 20,
                                padding: '2px 10px',
                            }}
                        >
                            <CrownOutlined style={{ color: THEME.accent, fontSize: 10 }} />
                            <Text style={{ color: THEME.accent, fontSize: 11, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                                Admin
                            </Text>
                        </span>
                    )}
                </div>

                <Divider style={{ borderColor: THEME.bgCardBorder, margin: 0 }} />



                <Divider style={{ borderColor: THEME.bgCardBorder, margin: 0 }} />

                {/* Logout */}
                <div style={{ padding: '8px 8px' }}>
                    <MenuItem
                        icon={<LogoutOutlined style={{ fontSize: 13 }} />}
                        label="Sign Out"
                        onClick={handleLogout}
                        danger
                    />
                </div>
            </div>
        </>
    );
};

// ── small reusable menu row ──────────────────────────────────────────────────
const MenuItem = ({
    icon,
    label,
    onClick,
    danger,
}: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    danger?: boolean;
}) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '9px 12px',
            borderRadius: 8,
            cursor: 'pointer',
            color: danger ? THEME.accentRed : THEME.textSecondary,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            transition: 'background 0.15s, color 0.15s',
            userSelect: 'none',
        }}
        onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = danger
                ? 'rgba(255,107,107,0.08)'
                : 'rgba(108,99,255,0.1)';
            (e.currentTarget as HTMLElement).style.color = danger ? THEME.accentRed : THEME.textPrimary;
        }}
        onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color = danger ? THEME.accentRed : THEME.textSecondary;
        }}
    >
        {icon}
        {label}
    </div>
);
