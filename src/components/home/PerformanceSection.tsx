'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const Counter = ({ end, duration = 2000, suffix = '', prefix = '' }: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      // const start = 0;
      const step = end / (duration / 16);
      
      const counter = setInterval(() => {
        countRef.current += step;
        
        if (countRef.current >= end) {
          countRef.current = end;
          clearInterval(counter);
        }
        
        setCount(Math.floor(countRef.current));
      }, 16);
      
      return () => clearInterval(counter);
    }
  }, [inView, end, duration]);

  return (
    <span className="text-4xl md:text-5xl font-bold" ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

export const PerformanceSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { id: 1, value: 10, label: 'Éditions du forum', suffix: '+' },
    { id: 2, value: 40, label: 'Entreprises participantes', suffix: '+' },
    { id: 3, value: 1500, label: 'Étudiants participants', suffix: '+' },
    { id: 4, value: 200, label: 'Offres d\'emploi et de stage', suffix: '+' },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary-800 text-white relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"></div>
        <div className="absolute top-10 right-1/4 w-40 h-40 rounded-full bg-white/5 blur-2xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            Nos Performances
          </h2>
          <p className="text-lg md:text-xl mb-12 text-center max-w-3xl mx-auto text-white/90">
            Le Forum ECC en quelques chiffres clés qui témoignent de son succès
            et de son impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 text-white relative">
                <Counter end={stat.value} suffix={stat.suffix} />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-secondary"></div>
              </div>
              <p className="text-lg font-medium mt-2 text-white">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
