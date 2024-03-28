export default function LoadingDots() {
  return (
    <svg
      version="1.1"
      id="L4"
      x="0px"
      y="0px"
      viewBox="0 0 36 36"
      enableBackground="new 0 0 0 0"
    >
      <circle fill="#fff" stroke="none" cx="10" cy="18" r="2">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"
        />
      </circle>
      <circle fill="#fff" stroke="none" cx="18" cy="18" r="2.5">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
      <circle fill="#fff" stroke="none" cx="26" cy="18" r="2">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
    </svg>
  );
}
