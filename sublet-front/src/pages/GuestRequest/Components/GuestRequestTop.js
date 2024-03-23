
import { IconButton } from '@mui/material';
import GuestRequeststyles from './styles/GuestRequest.styles.js';
import * as ps from "../../components/styles/Public.styles.js"



export function GuestRequestTop() {
	const location = useLocation();
	const handleReload = () => {
		if (location.pathname === '/') {
			window.location.reload();
		} else {
			window.location.href = '/GuestRequest';
		}
	};
	const styles = GuestRequeststyles();

	return (
		<>
			<div>
				<IconButton onClick={handleReload} style={styles.logoContainer}>
					<img src="logo.png" style={styles.logoIcon} alt="logo" />
				</IconButton>
			</div>
			<hr />
			<div>
				<div style={styles.GuestRequest_RequestContainer}>
					<div className="mt-5">
						<span className="text-5xl font-extrabold">요청서를 작성하세요</span>
					</div>
					<div className="mt-3">
						<hr />
						{/* <span className="text-xl font-extrabold">
							요청에 적합한 숙소가 나오면 이메일을 받으실 수 있습니다.
						</span> */}
						<ps.Label>요청에 적합한 숙소가 나오면 이메일을 받으실 수 있습니다.</ps.Label>
					</div>
				</div>
			</div>
		</>
	);
};

