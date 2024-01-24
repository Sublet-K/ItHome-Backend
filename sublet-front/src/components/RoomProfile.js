import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const RoomProfile = ({ room, toggleLikes, likes }) => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      margin: "1em",
    },
    roomTitleAndLike: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    roomTitle: {
      fontSize: "1.2em",
      fontWeight: "bold",
    },
    price: {
      fontSize: "1.2em",
    },
  };

  const moveToRoomInfo = ({ room }) => { // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
    navigate('/roominfo', {
      room: room,
    });
  };

  if (!room) return <div></div>;
  return (
    <div style={styles.container}>
      <IconButton onClick={() => moveToRoomInfo({ room })}>
        <img
          src={
            process.env.REACT_APP_BACKEND_URL +
            "/public/" +
            room.image_id[0] +
            ".jpg"
          }
          alt="Room image"
        />
      </IconButton>
      <div style={styles.roomTitleAndLike}>
        <span onClick={() => moveToRoomInfo({ room })}>
          <div style={styles.roomTitle}>
            {room.city} {room.gu} {room.dong}
          </div>
          <div style={styles.price}>
            ₩{room.price * 30}/1개월
          </div>
        </span>
        <IconButton onClick={toggleLikes(room)}>
          {(likes[room.key] !== undefined) ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </div>
    </div>
  );
}

export default RoomProfile;
