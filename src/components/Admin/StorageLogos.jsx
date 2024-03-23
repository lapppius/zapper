// import Image from "next/image";
// import StorageLogosOptions from "./StorageLogosOptions";
// import { useState, useEffect } from "react";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";
// import { PropTypes } from "prop-types";

// StorageLogos.propTypes = { storageLogos: PropTypes.array };

// export default function StorageLogos({ storageLogos }) {
// 	const storage = getStorage();
// 	const [downloadURLs, setDownloadURLs] = useState([]);

// 	useEffect(() => {
// 		const fetchDownloadURLs = async () => {
// 			const urls = await Promise.all(
// 				storageLogos.map(async (item) => {
// 					const downloadURL = await getDownloadURL(ref(storage, item.fullPath));
// 					return { downloadURL, name: item.name };
// 				})
// 			);
// 			setDownloadURLs(urls);
// 		};

// 		fetchDownloadURLs();
// 	}, [storage, storageLogos]);

// 	return (
// 		<ul className="flex flex-wrap gap-1 row-start-5 row-span-1 col-start-1 col-span-2 max-h-[150px] overflow-y-auto">
// 			{downloadURLs.map((item, index) => (
// 				<li
// 					key={index}
// 					className=" w-[100px] h-[100px] overflow-hidden grid grid-rows-[1fr_auto] grid-cols-1  justify-items-center items-center relative"
// 				>
// 					<div className="row-start-1 row-span-1 col-span-1 overflow-clip h-[70px] w-[70px] flex items-center">
// 						<Image
// 							src={item.downloadURL}
// 							alt={item.name}
// 							height="70"
// 							width="70"
// 						/>
// 					</div>
// 					<span className="truncate w-[85px] row-start-2 row-span-1 col-span-1 ">
// 						{item.name}
// 					</span>
// 					<StorageLogosOptions />
// 				</li>
// 			))}
// 		</ul>
// 	);
// }
