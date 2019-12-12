import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect, router } from 'dva';
import { css } from 'emotion';
import { routes as ROUTES } from '../routes';

const { Link } = router;

const LoginForm = props => {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  const { getFieldDecorator } = props.form;
  return (
    <section
      className={css`
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        & h2.title {
          text-align: left;
          font-size: 18px;
          margin-bottom: 1rem;
          font-weight: 400;
        }
        & .login-form {
          width: 280px;
        }
        & .login-form-button {
          width: 100%;
        }
      `}
    >
      <Form onSubmit={handleSubmit} className="login-form">
        <h2 className="title">登录</h2>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <span>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住我</Checkbox>)}
            <Link to={ROUTES.resetPassword} className="login-form-forgot">
              忘记密码
            </Link>
          </span>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登 录
          </Button>
          或 <Link to={ROUTES.register}>注册</Link>
        </Form.Item>
      </Form>
    </section>
  );
};

const WrappedLoginForm = Form.create({ name: 'normal_login_1' })(LoginForm);
export default connect(null)(WrappedLoginForm);
