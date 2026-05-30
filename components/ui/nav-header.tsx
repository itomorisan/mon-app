"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Position = { left: number; width: number; opacity: number };

function NavHeader() {
  const [position, setPosition] = useState<Position>({ left: 0, width: 0, opacity: 0 });

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      <Tab setPosition={setPosition} href="/">Home</Tab>
      <Tab setPosition={setPosition} href="/soirees">Soirées</Tab>
      <Tab setPosition={setPosition} href="#">Lieux</Tab>
      <Tab setPosition={setPosition} href="#">About</Tab>
      <Tab setPosition={setPosition} href="#">Contact</Tab>
      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  href: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10 block cursor-pointer text-xs uppercase text-white mix-blend-difference md:text-base"
    >
      <Link href={href} className="block px-3 py-1.5 md:px-5 md:py-3">
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  return <motion.li animate={position} className="absolute z-0 h-7 rounded-full bg-black md:h-12" />;
};

export default NavHeader;
