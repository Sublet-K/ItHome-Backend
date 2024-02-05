import React from "react";
import map from './map.png' /* import로 임시 map image 들고옴. */
import { IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Dialog, Popover } from '@headlessui/react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DaypickerComponent from '../components/DaypickerComponent.js';
import PriceRangeFilter from '../components/PriceRangeFilter.js';
import GuestRequeststyles from '../components/styles/GuestRequest.styles.js';
import * as s from '../components/styles/GuestRequest.styles.js';
import DropdownButton from '../components/DropdownButton.js';



function GuestRequest() {
	const location = useLocation();

	const handleReload = () => {
		if (location.pathname === '/') {
			window.location.reload();
		}
		else {
			window.location.href = '/GuestRequest';
		}
	};
	const styles = GuestRequeststyles();
	return (
		<div style={styles.BigContainer}>
			<div>
				<IconButton onClick={handleReload} style={styles.logoContainer}>
					<img src="logo.png" style={styles.logoIcon} alt="logo" />
				</IconButton>
			</div>
			<hr />
			<div>
				<div style={styles.GuestRequest_RequestContainer}>
					<div className='mt-5'>
						<span className='text-5xl font-extrabold'>요청서를 작성하세요</span>
					</div>
					<div className='mt-3'>
						<hr />
						<span className='text-xl font-extrabold'>요청에 적합한 숙소가 나오면 이메일을 받으실 수 있습니다.</span>
					</div>
				</div>
				<div style={styles.GuestRequest_Content}>		{/* 요청서 정보 입력 */}
					<div style={styles.GuestRequest_Detail}>
						<Popover.Group style={styles.RequestBox}>
							<div>
								<p style={styles.GuestRequest_DetailTitle}>* 기본 정보 입력</p>
								<div style={styles.RequestBoxContainer} >

									<div style={styles.Requestselect}>
										<IconButton style={styles.RequestLocation}>
											위치
											<LocationOnIcon />
										</IconButton>
									</div>
									<div style={styles.Requestselect}>
										<DaypickerComponent />
									</div>
								</div>
							</div>
							<div style={styles.RequestBoxContainer2}>
								<IconButton style={styles.RequestminiBox1}>
									<PriceRangeFilter />
								</IconButton>
								<DropdownButton
									ButtonText='숙박 유형'
									MenuText1='단기'
									MenuText2='중기'
									MenuText3='장기'
									MenuText4='SignOut'
								/>
							</div>
							<div>
								<p style={styles.GuestRequest_DetailTitle}>방 정보 입력</p>
								<div>
									<DropdownButton
										ButtonText='임대'
										MenuText1='단기'
										MenuText2='중기'
										MenuText3='장기'
										MenuText4='SignOut'
									/>
								</div>
								<div>
									<DropdownButton
										ButtonText='최대 인원'
										MenuText1='단기'
										MenuText2='중기'
										MenuText3='장기'
										MenuText4='SignOut'
									/>
									<DropdownButton
										ButtonText='건물 유형'
										MenuText1='단기'
										MenuText2='중기'
										MenuText3='장기'
										MenuText4='SignOut'
									/>
								</div>
								<div>
									<DropdownButton
										ButtonText='욕실 개수'
										MenuText1='단기'
										MenuText2='중기'
										MenuText3='장기'
										MenuText4='SignOut'
									/>
									<DropdownButton
										ButtonText='침실 개수'
										MenuText1='단기'
										MenuText2='중기'
										MenuText3='장기'
										MenuText4='SignOut'
									/>
								</div>
							</div>
							<div>
								<p style={styles.GuestRequest_DetailTitle}>추가 사항</p>
								<div>
									<s.Checkbox_additional type='checkbox' />
									<s.additional_text>요청 매물 알람 설정</s.additional_text>
								</div>
								<div>
									<s.Checkbox_additional type="checkbox" />
									<s.additional_text>완전 계약 인증된 매물만 보기</s.additional_text>
								</div>
							</div>
							<div className="mt-4">
								<s.confilrmButton>
									확인하기
								</s.confilrmButton>
							</div>


						</Popover.Group>
					</div>
					<div style={styles.GuestRequest_map}>
						<img src={map} alt="nothing" style={styles.GuestRequest_map_img} /> {/* 임시 지도 이미지 */}
					</div>
				</div>
			</div>
		</div>
	);
}


export default GuestRequest;
