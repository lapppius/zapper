"use client";
import { useRef } from "react";
import styles from "./adminModal.module.scss";

export default function AdminModal(props) {
	const modalRef = useRef(null);
	const toggle = () => {
		modalRef.current.show();
	};
	return (
		<>
			{props.icon ? (
				<button onClick={toggle} size="small">
					{props.icon}
				</button>
			) : (
				<button onClick={toggle}>{props.title}</button>
			)}
			<dialog ref={modalRef} className={styles.adminModal}>
				<button
					onClick={() => {
						modalRef.current.close();
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-9 h-9"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
				</button>
				<h1 className="text-xl font-bold text-slate-50 ">{props.title}</h1>
				{/* {props.info?.message ? (
							<div
								role="alert"
								className={`border border-gray-600  rounded p-2 sticky top-0 z-10`}
							>
								<p className="sticky top-0 font-semibold text-md text-slate-50">
									{props.info.message}
								</p>
							</div>
						) : undefined} */}
				<div className="flex flex-col gap-1">{props.children}</div>
			</dialog>
		</>
	);
}
