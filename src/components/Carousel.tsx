import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react";
import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = PropsWithChildren & EmblaOptionsType;

const Carousel = ({ children, ...options }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">{children}</div>
      </div>
      <CarouselControls
        canScrollPrev={prevBtnEnabled}
        canScrollNext={nextBtnEnabled}
        onPrev={() => emblaApi?.scrollPrev()}
        onNext={() => emblaApi?.scrollNext()}
      />
    </div>
  );
};
export default Carousel;

type CarouselControlsProps = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrev(): void;
  onNext(): void;
};

const CarouselControls = (props: CarouselControlsProps) => {
  return (
    <div>
      <button
        onClick={() => {
          if (props.canScrollPrev) {
            props.onPrev();
          }
        }}
        disabled={!props.canScrollPrev}
        className="absolute left-1 top-[50%] translate-y-[-50%] rounded-full bg-white p-3 text-slate-600 shadow-xl"
      >
        <ChevronLeftIcon className="h-7 w-7" aria-hidden="true" />
      </button>
      <button
        onClick={() => {
          if (props.canScrollNext) {
            props.onNext();
          }
        }}
        disabled={!props.canScrollNext}
        className="absolute right-1 top-[50%] translate-y-[-50%] rounded-full bg-white p-3 text-slate-600 shadow-xl"
      >
        <ChevronRightIcon className="h-7 w-7" aria-hidden="true" />
      </button>
    </div>
  );
};
