"use client";

import { useState } from "react";
import styles from "./modal.module.scss";
import Button from "./Button";
import Backdrop from "./Backdrop";
import CloseIcon from "../UI/Icons/CloseIcon";

export default function Modal({ title, children, icon }) {
	const [open, setOpen] = useState(false);

	const toggle = (e) => {
		e.preventDefault();
		setOpen(!open);
	};

	return (
		<>
			{open && (
				<Backdrop
					onClick={(e) => {
						toggle(e);
					}}
				>
					<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
						<Button
							icon={<CloseIcon />}
							onClick={toggle}
							style={{ right: "-5px", top: "-5px", position: "absolute" }}
						/>
						<h1>{title}</h1>
						{children}
					</div>
				</Backdrop>
			)}
			<Button title={title} icon={icon} onClick={toggle} />
		</>
	);
}
