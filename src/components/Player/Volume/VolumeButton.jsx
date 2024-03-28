import PlayerButton from "../PlayerButton";
import VolumeUpIcon from "../../UI/Icons/VolumeUpIcon";
import VolumeOffIcon from "../../UI/Icons/VolumeOffIcon";
import VolumeDownIcon from "../../UI/Icons/VolumeDownIcon";

export default function VolumeButton({ mute, volume }) {
  return (
    <PlayerButton
      icon={
        volume > 0.6 ? (
          <VolumeUpIcon />
        ) : volume > 0 ? (
          <VolumeDownIcon />
        ) : (
          <VolumeOffIcon />
        )
      }
      onClick={mute}
    />
  );
}
