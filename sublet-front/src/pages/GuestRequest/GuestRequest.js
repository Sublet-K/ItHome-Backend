import React from 'react';
import { Dialog, Popover } from '@headlessui/react';

import { GuestRequestTop } from './Components/GuestRequestTop.js';
import { UserSelectInfo } from './Components/UserSelectInfo/index.js';
import { ComfilrmButton } from './Components/ConfilrmButton/ConfilrmButton.js';

import * as s from './Components/styles/GuestRequest.styles.js';
import GuestRequeststyles from './Components/styles/GuestRequest.styles.js';



function GuestRequest() {
	const styles = GuestRequeststyles();
	return (
		<div style={styles.BigContainer}>
			<GuestRequestTop />
			<div style={styles.GuestRequest_Content}>
				{/* 요청서 정보 입력 */}
				<s.GuestRequestDetail>
					<Popover.Group style={styles.RequestBox}>
						<UserSelectInfo />
						<ComfilrmButton />
					</Popover.Group>
				</s.GuestRequestDetail>
				<s.GuestRequestmap>
					<p> 지도</p>
				</s.GuestRequestmap>
			</div>
		</div>
	);
}



export default GuestRequest;
