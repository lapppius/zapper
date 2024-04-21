import { auth } from "@/auth";
import Image from "next/image";
import NavLink from "./UI/NavLink";
import Menu from "./UI/Menu";
import { redirect } from "next/navigation";

import styles from "./header.module.scss";
import SearchBar from "./SearchBar";

export default async function Header() {
  const search = async (data) => {
    "use server";
    console.log(data);
    redirect(`/search?q=${encodeURIComponent(data)}`);
  };

  const session = await auth();

  return (
    <>
      <header className={styles.header}>
        <nav>
          <ul>
            <NavLink title="Home" href="/" />
            <NavLink title="Genres" href="/genres" />
            <NavLink title="Countries" href="/countries" />
          </ul>
          <SearchBar placeholder="Search Radios" action={search} />
          {/* <ul>
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
					</ul> */}
        </nav>
      </header>
    </>
  );
}
