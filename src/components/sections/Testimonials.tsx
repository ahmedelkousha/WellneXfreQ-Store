import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

export default function Testimonials() {
  const { t } = useTranslation();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    dragFree: true,
    containScroll: 'trimSnaps',
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="pt-16 pb-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn}
          className="text-center mb-20"
        >
          <h3 className="font-heading text-primary text-xs tracking-[0.2em] font-semibold mb-4 uppercase">
            {t('home.testimonials.badge')}
          </h3>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            {t('home.testimonials.title')}
            <br />
            <span className="text-primary italic font-normal">
              {t('home.testimonials.title_highlight')}
            </span>
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto text-sm md:text-lg text-center">
            {t('home.testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="relative">
          {/* Carousel Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 md:gap-8">
              {(
                t('home.testimonials.items', { returnObjects: true }) as any[]
              ).map((item, idx) => (
                <div
                  key={idx}
                  className="flex-[0_0_100%] md:flex-[0_0_calc(50%-1rem)] lg:flex-[0_0_calc(33.333%-1.33rem)] min-w-0"
                >
                  <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 md:p-10 hover:border-primary/30 group transition-all flex flex-col h-full shadow-lg">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <p className="text-white/80 italic mb-10 leading-relaxed text-lg quote-marks">
                      "{item.quote}"
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0 border border-primary/20">
                        {'0' + (idx + 1)}
                      </div>
                      <div>
                        <h4 className="text-white font-bold tracking-tight">
                          {item.name}
                        </h4>
                        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em]">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unified Navigation controls (Arrows and Dots) */}
          <div className="flex items-center justify-center gap-6 mt-12 mb-8">
            <Button
              size="icon"
              variant="ghost"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-primary hover:text-black hover:border-primary disabled:opacity-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <div className="flex items-center gap-2">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-primary w-8' : 'bg-white/10 w-4 hover:bg-white/20'}`}
                />
              ))}
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-primary hover:text-black hover:border-primary disabled:opacity-20"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="text-center mt-12">
            <p className="text-white/40 text-[10px] uppercase tracking-widest italic max-w-2xl mx-auto opacity-60">
              {t('home.testimonials.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
