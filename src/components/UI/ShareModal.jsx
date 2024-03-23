import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ShareModal({ isOpen, onClose, children, onOpen }) {
	const dialogRef = useRef(null);

	useEffect(() => {
		if (isOpen) {
			// Focus on the dialog when it opens
			dialogRef.current.focus();
		}
	}, [isOpen]);

	const handleKeyDown = (e) => {
		// Close the dialog on Escape key press
		if (e.key === "Escape") {
			onClose();
		}
	};

	return isOpen
		? createPortal(
			<div
				ref={dialogRef}
				tabIndex="-1"
				className="absolute "
				onKeyDown={handleKeyDown}
				onMouseOver={onOpen}
				onMouseLeave={onClose}
			>
				<div className="dialog-overlay" onClick={onClose}></div>
				<div className="dialog-content">{children}</div>
			</div>,
			document.getElementsByClassName("RadioHeader_headerButtons__Qav_B")[0]
		)
		: null;
}
