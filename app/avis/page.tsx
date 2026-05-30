"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, PartyPopper, MapPin, User, Mail } from "lucide-react";
import { Dock } from "@/components/ui/dock";
import { TestimonialsColumn, Testimonial } from "@/components/ui/testimonials-columns";

const testimonials: Testimonial[] = [
  {
    text: "J'ai trouvé la meilleure soirée techno de ma vie en 2 clics. L'interface est super clean.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    name: "Camille Rousseau",
    role: "Étudiante",
  },
  {
    text: "Enfin une app qui me montre les vraies bonnes adresses près de chez moi. Adopté.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    name: "Lucas Martin",
    role: "DJ amateur",
  },
  {
    text: "Le rooftop sunset trouvé via l'app était incroyable. Ambiance au top, prix correct.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    name: "Sarah Lemoine",
    role: "Photographe",
  },
  {
    text: "Simple, rapide, élégant. Je trouve une soirée chaque week-end sans prise de tête.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    name: "Thomas Bernard",
    role: "Développeur",
  },
  {
    text: "J'adore la transition et le design minimaliste. Ça donne envie de sortir.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
    name: "Léa Dubois",
    role: "Designer",
  },
  {
    text: "Parfait pour découvrir les soirées underground qu'on ne trouve nulle part ailleurs.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80",
    name: "Maxime Petit",
    role: "Musicien",
  },
];

const col1 = testimonials.slice(0, 2);
const col2 = testimonials.slice(2, 4);
const col3 = testimonials.slice(4, 6);

export default function AvisPage() {
  const router = useRouter();

  const dockItems = [
    { icon: Home, label: "Home", onClick: () => router.push("/?skip=1") },
    { icon: PartyPopper, label: "Soirées", onClick: () => router.push("/soirees") },
    { icon: MapPin, label: "Lieux" },
    { icon: User, label: "Avis", onClick: () => router.push("/avis") },
    { icon: Mail, label: "Contact" },
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-white to-zinc-100 text-zinc-900 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 pt-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-zinc-400 font-mono uppercase tracking-widest"
        >
          ils sortent avec nous
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-semibold mt-3"
        >
          Ce qu'en pensent les fêtards
        </motion.h1>
      </div>

      <div className="flex justify-center gap-6 mt-12 px-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[70vh] overflow-hidden">
        <TestimonialsColumn testimonials={col1} duration={15} />
        <TestimonialsColumn testimonials={col2} duration={19} className="hidden md:block" />
        <TestimonialsColumn testimonials={col3} duration={17} className="hidden lg:block" />
      </div>

      <div className="fixed bottom-6 left-0 right-0 z-50">
        <Dock items={dockItems} />
      </div>
    </main>
  );
}
