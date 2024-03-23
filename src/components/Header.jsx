import { auth } from "@/auth";
import Image from "next/image";
import NavLink from "./UI/NavLink";
import Menu from "./UI/Menu";

import styles from "./styles/header.module.scss";

export default async function Header() {
	const session = await auth();

	return (
		<>
			<header className={styles.header}>
				<nav>
					<ul>
						<NavLink title="Radios" href="/radios" />
						<NavLink title="Genres" href="/genres" />
						<NavLink title="Countries" href="/countries" />
						<NavLink title="About" href="/about" />
					</ul>
					<ul>
						{session?.user ? (
							<div>
								<li className="flex h-fit">
									<Menu
										image={
											session.user.image !== null ? (
												<Image
													alt={session.user.name}
													src={session.user?.image}
													width={32}
													height={32}
													className="rounded-full"
												/>
											) : (
												<></>
											)
										}
									/>
								</li>
							</div>
						) : (
							<NavLink href="/login" title="Login" />
						)}
					</ul>
				</nav>
			</header>
		</>
	);
}
