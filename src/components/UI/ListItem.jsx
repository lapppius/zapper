import Image from "next/image";
import Link from "next/link";

export default function ListItem({ country }) {
  return (
    <li
      className="flex flex-row p-2 border border-[var(--dark-cyan-back)] rounded-[var(--radius)] bg-[var(--secondary-dark)] gap-2 items-center"
      key={country.id}
    >
      <div className="relative h-[40px] w-[40px] rounded-full overflow-hidden">
        <Image
          src={`/flags/png/${country?.alpha2Code.toLowerCase()}.png`}
          alt={`Flag of ${country?.enName}`}
          fill
          sizes="(max-width: 350px) 20px,(max-width: 768px) 40px"
          style={{
            objectFit: "cover",
          }}
          loading="lazy"
        />
      </div>
      <Link href={`countries/${country.alpha2Code}`}>{country?.enName}</Link>
    </li>
  );
}
