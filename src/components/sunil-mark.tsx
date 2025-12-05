export function ChanhDaiMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 215 186"
      {...props}
    >
      <rect
        x="18"
        y="18"
        width="66"
        height="18"
        transform="rotate(90 18 18)"
        fill="currentColor"
      />
      <rect x="18" y="84" width="66" height="18" fill="currentColor" />
      <rect
        x="102"
        y="102"
        width="66"
        height="18"
        transform="rotate(90 102 102)"
        fill="currentColor"
      />
      <rect
        x="131"
        y="18"
        width="150"
        height="18"
        transform="rotate(90 131 18)"
        fill="currentColor"
      />
      <rect x="131" width="84" height="18" fill="currentColor" />
      <rect x="131" y="168" width="84" height="18" fill="currentColor" />
      <rect y="168" width="84" height="18" fill="currentColor" />
      <rect x="18" width="84" height="18" fill="currentColor" />
    </svg>
  );
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 215 186"><rect x="18" y="18" width="66" height="18" transform="rotate(90 18 18)" fill="${color}"/><rect x="18" y="84" width="66" height="18" fill="${color}"/><rect x="102" y="102" width="66" height="18" transform="rotate(90 102 102)" fill="${color}"/><rect x="131" y="18" width="150" height="18" transform="rotate(90 131 18)" fill="${color}"/><rect x="131" width="84" height="18" fill="${color}"/><rect x="131" y="168" width="84" height="18" fill="${color}"/><rect y="168" width="84" height="18" fill="${color}"/><rect x="18" width="84" height="18" fill="${color}"/></svg>`;
}
