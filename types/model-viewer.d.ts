declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        poster?: string;
        alt?: string;
        "auto-rotate"?: boolean;
        "rotation-per-second"?: string;
        "camera-controls"?: boolean;
        loading?: "auto" | "lazy" | "eager";
        exposure?: string;
        "shadow-intensity"?: string;
      },
      HTMLElement
    >;
  }
}
