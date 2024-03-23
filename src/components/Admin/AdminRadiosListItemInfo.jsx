"use client";
import { useState } from "react";
import Button from "@/components/UI/Button";
import DownArrowIcon from "@/components/UI/Icons/DownArrowIcon";

export default function AdminRadiosListItemInfo({ radio }) {
	const [showAll, setShowAll] = useState(false);

	return (
		<>
			<Button onClick={() => setShowAll(!showAll)} icon={<DownArrowIcon />} />
			{showAll ? (
				<table>
					<tbody>
						{Object.entries(radio).map(([key, value]) => (
							<tr key={key + value}>
								<th key={key}>{key}</th>
								<td>
									{typeof value === "object"
										? JSON.stringify(value)
										: value instanceof Date
										? value.toLocaleString()
										: value}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : null}
		</>
	);
}
