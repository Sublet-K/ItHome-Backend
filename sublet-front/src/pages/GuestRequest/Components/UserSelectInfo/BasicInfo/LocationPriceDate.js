import { IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchPriceRange from '@core/Header/Desktop/components/SearchPriceRange.js';
import SearchDate from '@core/Header/Desktop/components/SearchDate.js';

import GuestRequeststyles from '../../styles/GuestRequest.styles.js';


export function LocationOnButton() {
	const styles = GuestRequeststyles();
	return (
		<div style={styles.Requestselect}>
			<IconButton style={styles.RequestLocation}>
				위치
				<LocationOnIcon />
			</IconButton>
		</div>
	);
};

export function SearchPriceButton() {
	const styles = GuestRequeststyles();
	return (
		<div style={styles.Requestselect}>
			<SearchPriceRange />
		</div>
	);
};


export function SearchDateButton() {
	const styles = GuestRequeststyles();

	return (
		<IconButton style={styles.RequestminiBox1}>
			<SearchDate />
		</IconButton>
	);
};