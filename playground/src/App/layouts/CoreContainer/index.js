import React, { useEffect, useState } from 'react';
import urlParse from 'url-parse';
import { connect, router } from 'dva';
import { Layout, Menu, Affix, Icon, Row, Col } from 'antd';
import '@education/themes/lib/index.css';
import { cx, css } from 'emotion';
import { commonClassName, theme as appThemeClassName, componentClassName } from '@education/themes';
import ReduxedBreadcrumb from './components/ReduxedBreadcrumb';
import CustomHeader from './components/Header';
import { HEADER, SIDER } from '../../constants/layout';
import { EXCLUDED_AUTH_ROUTES } from '../../config';
const { Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

const { useHistory } = router;

const compareUrl = (a, b) => {
	return a === b;
};

const unShownClassName = (visible, ...args) => {
	return cx({ [commonClassName.unShown]: !visible }, ...args);
};

function BaseLayout({ children, user, authOptions = {}, ...props }) {
	const history = useHistory();
	const { layout: { shownParts = {}, theme = 'base' } } = props;
	const { excludedRoutes = [] } = authOptions;
	const appExcludedRoutes = (EXCLUDED_AUTH_ROUTES || []).concat(excludedRoutes);
	const [ collapsed, setCollapsed ] = useState(false);
	useEffect(
		() => {
			const onHashChange = (event) => {
				const { newURL, oldURL } = event;
				console.log('TCL: BaseLayout -> onHashChange -> newURL, oldURL', newURL, oldURL);
				if (compareUrl(newURL, oldURL)) {
					event.preventDefault();
					event.stopPropagation();
				}
				if (!user.auth.isAuthenticated) {
					const hash = urlParse(newURL);
					if (appExcludedRoutes.includes(hash)) return history.push('/login');
					else {
						event.preventDefault();
						event.stopPropagation();
					}
				}
			};
			window.addEventListener('hashchange', onHashChange);
			return () => {
				console.log('BaseLayout rerender');
				window.removeEventListener('hashchange', onHashChange);
			};
		},
		[ history, user, appExcludedRoutes ]
	);
	return (
		<React.Fragment>
			<Layout
				style={{ minHeight: '100vh' }}
				className={cx(appThemeClassName.base, commonClassName.noPadding, commonClassName.noMargin, {
					[appThemeClassName.dark]: theme === 'dark'
				})}
			>
				<CustomHeader className={unShownClassName(shownParts[HEADER])} />
				<Layout>
					<Affix
						offsetTop={0}
						className={unShownClassName(
							shownParts[SIDER],
							css`
								background: ${theme === 'base' ? '#fff' : '#001529'};
							`
						)}
					>
						<Row type="flex" justify="center" align="middle">
							<Col>
								<Icon
									className={css`
										font-size: 12px;
										font-weight: bold;
										line-height: 21px;
									`}
									type={collapsed ? 'menu-unfold' : 'menu-fold'}
									onClick={() => setCollapsed(!collapsed)}
								/>
							</Col>
						</Row>
						<Sider
							theme={theme === 'dark' ? 'dark' : 'light'}
							collapsible
							collapsed={collapsed}
							onCollapse={() => setCollapsed(!collapsed)}
							className={css`border-top: 1px solid #f8f8f8;`}
						>
							<Menu
								theme={theme === 'dark' ? 'dark' : 'light'}
								defaultSelectedKeys={[ '1' ]}
								mode="inline"
							>
								<Menu.Item key="1">
									<Icon type="pie-chart" />
									<span>Option 1</span>
								</Menu.Item>
								<Menu.Item key="2">
									<Icon type="desktop" />
									<span>Option 2</span>
								</Menu.Item>
								<SubMenu
									key="sub1"
									title={
										<span>
											<Icon type="user" />
											<span>User</span>
										</span>
									}
								>
									<Menu.Item key="3">Tom</Menu.Item>
									<Menu.Item key="4">Bill</Menu.Item>
									<Menu.Item key="5">Alex</Menu.Item>
								</SubMenu>
								<SubMenu
									key="sub2"
									title={
										<span>
											<Icon type="team" />
											<span>Team</span>
										</span>
									}
								>
									<Menu.Item key="6">Team 1</Menu.Item>
									<Menu.Item key="8">Team 2</Menu.Item>
								</SubMenu>
								<Menu.Item key="9">
									<Icon type="file" />
									<span>File</span>
								</Menu.Item>
							</Menu>
						</Sider>
					</Affix>
					<Layout className={cx(commonClassName.noMargin, commonClassName.noPadding)}>
						<Content>
							<ReduxedBreadcrumb />{' '}
							{/* please check models/layout-> breadcrumb to use the auto redux breadcrumb  */}
							<Row style={{ background: '#fff', minHeight: 360, height: '100%' }}>{children}</Row>
						</Content>
						<Footer className={componentClassName.Footer}>ReDesign By Neyio using Ant Design.</Footer>
					</Layout>
				</Layout>
			</Layout>
		</React.Fragment>
	);
}
export default connect(({ user, layout }) => ({ user, layout }))(BaseLayout);
