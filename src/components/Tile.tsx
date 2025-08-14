import "../styles/Tile.css";

interface TileProps {
  value: number;
}

export default function Tile({ value }: TileProps) {
  return (
    <div className={`tile ${value > 0 ? `tile-${value}` : ""}`}>
      {value !== 0 ? value : ""}
    </div>
  );
}
