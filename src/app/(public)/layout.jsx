export default function PublicLayout({ children }) {
	return (
		<div className="public_layout max-w-[var(--content-width)] w-full  h-fit p-1.5 ">
			{children}
		</div>
	);
}
