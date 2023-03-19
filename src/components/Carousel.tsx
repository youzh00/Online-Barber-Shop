// components/Carousel.tsx
// import the hook and options type
import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react";
import { PropsWithChildren, useEffect, useState } from "react";

// Define the props
type Props = PropsWithChildren & EmblaOptionsType;

const Carousel = ({ children, ...options }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const canScrollPrev = !!emblaApi?.canScrollPrev();
  const canScrollNext = !!emblaApi?.canScrollNext();

  return (
    <>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>
      <CarouselControls
        canScrollPrev={canScrollPrev}
        canScrollNext={canScrollNext}
        onPrev={() => emblaApi?.scrollPrev()}
        onNext={() => emblaApi?.scrollNext()}
      />
    </>
  );
};
export default Carousel;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type CarouselControlsProps = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrev(): void;
  onNext(): void;
};

const CarouselControls = (props: CarouselControlsProps) => {
  return (
    <div className="flex justify-end gap-2 ">
      <button
        onClick={() => {
          if (props.canScrollPrev) {
            props.onPrev();
          }
        }}
        disabled={!props.canScrollPrev}
        className={classNames(
          "rounded-md px-4 py-2 text-white",
          !props.canScrollPrev ? "bg-indigo-200" : "",
          props.canScrollPrev ? "bg-indigo-400" : ""
        )}
      >
        Prev
      </button>
      <button
        onClick={() => {
          if (props.canScrollNext) {
            props.onNext();
          }
        }}
        disabled={!props.canScrollNext}
        className={classNames(
          "rounded-md px-4 py-2 text-white",
          !props.canScrollNext ? "bg-indigo-200" : "",
          props.canScrollNext ? "bg-indigo-400" : ""
        )}
      >
        Next
      </button>
    </div>
  );
};
