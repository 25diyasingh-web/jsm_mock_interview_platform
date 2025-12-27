"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getTechLogos } from "@/lib/utils";

export default function DisplayTechIcons({ techStack }: { techStack: string[] }) {
  const [icons, setIcons] = useState<{ tech: string; url: string }[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const result = await getTechLogos(techStack);
        setIcons(result);
      } catch (e) {
        console.error("Error loading tech icons", e);
      }
    }
    load();
  }, [techStack]);

  if (!icons.length) return <p>--</p>;

  return (
    <div className="flex items-center gap-2">
      {icons.slice(0, 3).map(({ tech, url }, i) => (
        <Image key={i} src={url} alt={tech} width={30} height={30} />
      ))}
    </div>
  );
}
