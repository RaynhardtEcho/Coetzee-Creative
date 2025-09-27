'use client';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import { H1, Text } from '@/components/atoms/Typography';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <H1>Websites that whisper luxury and convert with clarity.</H1>
          <Text>Strategic, premium web design for brands that value trust and results.</Text>
         <div className="flex items-center justify-center gap-3">
  <Button variant="solid">Start a Project</Button>
  <Button variant="outline" tone="neutral">View Portfolio</Button>
</div>
        </motion.div>
      </div>
    </section>
  );
}
