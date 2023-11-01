import Header from '../components/Header';
import * as makeTest from '../testdata/testdata.js'
import PersonIcon from '@mui/icons-material/Person';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import HomeIcon from '@mui/icons-material/Home';
import BathtubIcon from '@mui/icons-material/Bathtub';

const roomTempData = makeTest.makeTestData(); // This is a temporary data for testing

export default function RoomInfo() {
  const nowRomeNum = 0; //추후 prop으로 받아오면 될듯

  const styles = {
    RomeInfo_ImgContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      height: '500px',
    },
    RomeInfo_MiniImgContainer: {
      display: 'flex',
      width: '50%',
      alignItems: 'center',
    },
    RomeInfo_ImgContainer2: {
      display: 'flex',
      flexDirection: 'column',
    },
    RomeInfo_ImgContainer_img: {
      objectFit: 'cover',
      height: '100%',
      borderRadius: '15px',
    },
    RomeInfo_MiniImgContainer_img: {
      height: '250px',
      borderRadius: '15px',
    },
    RomeInfo_detail: {
      display: 'flex',
      width: '80%',
      marginLeft: '10%',
      flexWrap: 'wrap',
      flexDirection: 'column',
      alignContent: 'center',
    },
  };

  return (
    <div>
      <Header />
      <div id="RomeInfo-ImgContainer" style={styles.RomeInfo_ImgContainer}>
        <img src={roomTempData[nowRomeNum].images[0]} alt="" style={styles.RomeInfo_ImgContainer_img} />
        <div id="RomeInfo-ImgContainer2" style={styles.RomeInfo_ImgContainer2}>
          <div id="RomeInfo-MiniImgContainer" style={styles.RomeInfo_MiniImgContainer}>
            <img src={roomTempData[nowRomeNum].images[1]} alt="" style={styles.RomeInfo_MiniImgContainer_img} />
            <img src={roomTempData[nowRomeNum].images[2]} alt="" style={styles.RomeInfo_MiniImgContainer_img} />
          </div>
          <div id="RomeInfo-MiniImgContainer" style={styles.RomeInfo_MiniImgContainer}>
            <img src={roomTempData[nowRomeNum].images[3]} alt="" style={styles.RomeInfo_MiniImgContainer_img} />
            <img src={roomTempData[nowRomeNum].images[4]} alt="" style={styles.RomeInfo_MiniImgContainer_img} />
          </div>
        </div>
      </div>
      <div id="RomeInfo-detail" style={styles.RomeInfo_detail}>
        <PersonIcon />
        <SingleBedIcon />
        <HomeIcon />
        <BathtubIcon />
      </div>
    </div >
  );
}