export default function ModalContent({ onClose }) {
	return (
		<div className="w-full h-full bg-black bg-opacity-75">
			<div>Im a modal dialog</div>
			<button onClick={onClose}>Close</button>
		</div>
	);
}
