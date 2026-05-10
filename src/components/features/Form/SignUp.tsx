import { Button, Checkbox, Divider, Form, Input, Typography, Card, Space, Spin } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GithubOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import UserService from '../../../services/UserService';
import { useEffect, useState } from 'react';
import { COLORS } from '../../../constants/theme';
import { useAuth } from '../../../contexts/AuthContext';
import { UserRole, UserRoleLabel } from '../../../enums/UserRole';

const { Title, Text, Link } = Typography;

const style = {
  input: {
    background: '#2b2b30',
    border: '1px solid #38383f',
    color: '#ffffff',
    borderRadius: 10,
  },
  label: { color: '#d1d5db', fontSize: 13, letterSpacing: 1.8, fontWeight: 600 },
};

interface User {
  name?: string;
  email: string;
  password: string;
  phone?: number | string;
}
const initialValue: User = {
  name: '',
  email: '',
  password: '',
  phone: '',
};

export const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { setUser } = useAuth();

  const location = useLocation();
  const isLogin = !!location.pathname.split('/').find((val) => val == 'sign-in');
  const btnText = isLogin ? 'Login to continue' : 'Create account';
  const footerText = isLogin ? "Don't have an account?" : 'Already have an account?';

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const res = isLogin
        ? await UserService.loginUser(values)
        : await UserService.createUser(values);
      if (res.data) {
        if (!isLogin) {
          navigate('/sign-in');
        } else {
          setUser({ ...res.data, role: UserRoleLabel[res.data.role as keyof typeof UserRole] });
          navigate('/');
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.resetFields();
  }, [location.pathname]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, #101828 0%, #05070d 55%, #020305 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
      }}
    >
      <Card
        bordered={false}
        style={{
          width: 460,
          borderRadius: 18,
          padding: '14px 8px',

          background: 'rgba(255, 255, 255, 0.08)',

          backdropFilter: 'blur(18px)',

          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
        }}
      >
        {/* HEADER */}

        <div
          style={{
            textAlign: 'center',
            marginBottom: 36,
          }}
        >
          <Title
            level={2}
            style={{
              color: '#ffffff',
              marginBottom: 8,
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            Create Environment
          </Title>

          <Text
            style={{
              color: '#9ca3af',
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            Initialize your developer profile to begin architecting solutions.
          </Text>
        </div>

        <Form
          layout="vertical"
          requiredMark={false}
          validateTrigger="onBlur"
          onFinish={handleSubmit}
          initialValues={initialValue}
          form={form}
        >
          {!isLogin && (
            <Form.Item
              hidden={isLogin}
              label={<span style={style.label}>FULL NAME</span>}
              name="name"
              rules={[
                {
                  required: true,
                  message: '*Mandatory',
                },
                {
                  type: 'string',
                  message: 'Invalid format',
                },
              ]}
            >
              <Input
                size="large"
                prefix={
                  <UserOutlined
                    style={{
                      color: '#9ca3af',
                    }}
                  />
                }
                placeholder="Linus Torvalds"
                style={style.input}
              />
            </Form.Item>
          )}

          <Form.Item
            label={<span style={style.label}>EMAIL</span>}
            name="email"
            rules={[
              {
                required: true,
                message: '*Mandatory',
              },
              {
                type: 'email',
                message: 'Invalid email format',
              },
            ]}
          >
            <Input
              size="large"
              prefix={
                <MailOutlined
                  style={{
                    color: '#9ca3af',
                  }}
                />
              }
              placeholder="architect@code.io"
              style={style.input}
            />
          </Form.Item>

          {!isLogin && (
            <Form.Item
              label={<span style={style.label}>PHONE</span>}
              hidden={isLogin}
              name="phone"
              rules={[{ required: true, message: '*Mandatory' }]}
            >
              <Input
                size="large"
                //   prefix={
                //     // <AtCircleOutlined
                //     //   style={{
                //     //     color: '#9ca3af',
                //     //   }}
                //     // />
                //   }
                placeholder="9078159032"
                style={style.input}
                maxLength={10}
                inputMode="decimal"
              />
            </Form.Item>
          )}

          {/* PASSWORD */}

          <Form.Item
            label={<span style={style.label}>PASSWORD</span>}
            name="password"
            rules={[
              { required: true, message: '*Mandatory' },
              { type: 'string', message: 'Invalid format' },
            ]}
          >
            <Input.Password
              size="large"
              prefix={
                <LockOutlined
                  style={{
                    color: '#9ca3af',
                  }}
                />
              }
              placeholder="••••••••••"
              style={style.input}
            />
          </Form.Item>

          {/* PASSWORD STRENGTH */}

          {!isLogin && (
            <div
              style={{
                marginTop: -10,
                marginBottom: 28,
              }}
            >
              <Text
                style={{
                  color: '#22c55e',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                STRENGTH: STRONG
              </Text>
            </div>
          )}

          {/* TERMS */}

          <Form.Item hidden={isLogin}>
            <Checkbox
              style={{
                color: '#d1d5db',
                fontSize: 15,
                lineHeight: 1.7,
              }}
            >
              I agree to the <Link>Terms of Service</Link> and acknowledge the{' '}
              <Link>Privacy Policy</Link>.
            </Checkbox>
          </Form.Item>

          <Button
            type="primary"
            block
            htmlType="submit"
            size="large"
            disabled={loading}
            style={{
              marginTop: 18,
              borderRadius: 10,
              border: 'none',
              fontSize: 18,
              fontWeight: 500,
              background: 'linear-gradient(90deg, #a5bfff 0%, #005eff 100%)',
              boxShadow: '0 12px 35px rgba(0,94,255,0.35)',
            }}
            iconPosition="end"
            styles={{
              icon: {
                visibility: loading ? 'visible' : 'hidden',
              },
            }}
            onClick={() => {
              console.log('clicked');
            }}
            icon={
              <Spin
                indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 24 }} spin />}
              />
            }
          >
            {btnText}
          </Button>

          {/* DIVIDER */}

          <Divider
            plain
            style={{
              color: '#8b8f98',
              borderColor: '#2b2f36',
              marginTop: 42,
              marginBottom: 36,
              letterSpacing: 3,
            }}
            size="small"
          >
            OR CONTINUE WITH
          </Divider>

          {/* GITHUB BUTTON */}

          <Button
            block
            size="large"
            icon={<GithubOutlined />}
            style={{
              background: '#2b2b30',
              border: '1px solid #3b3b42',
              color: '#ffffff',
              borderRadius: 10,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            GitHub
          </Button>
        </Form>

        <div
          style={{
            textAlign: 'center',
            marginTop: 42,
          }}
        >
          <Space size={4}>
            <Text
              style={{
                color: '#9ca3af',
                fontSize: 16,
              }}
            >
              {footerText}
            </Text>

            <Link
              style={{
                fontSize: 16,
                fontWeight: 600,
              }}
              onClick={() => {
                const url = isLogin ? '/sign-up' : '/sign-in';
                navigate(url);
              }}
            >
              {isLogin ? `Sign up` : `Sign in`}
            </Link>
          </Space>
        </div>
      </Card>
    </div>
  );
};
