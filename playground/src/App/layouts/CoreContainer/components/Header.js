import React from 'react';
import { PageHeader, Divider, Button } from 'antd';
import { css } from 'emotion';
import { APP_NAME, APP_NAME_ENG } from '../../../config';

const Header = React.forwardRef((props, ref) => {
	return (
		<div ref={ref} className={props.className}>
			<PageHeader
				className={css`border-bottom: 1px solid #eee;`}
				onBack={() => {}}
				backIcon={false}
				title={
					<span className={css`font-size: 1rem;`}>
						{APP_NAME}
						<Divider type="vertical" />
						{APP_NAME_ENG}
					</span>
				}
				subTitle="控制面板"
				extra={[
					<Button type="primary" key={1}>
						登出
					</Button>
				]}
			/>
		</div>
	);
});
export default Header;
