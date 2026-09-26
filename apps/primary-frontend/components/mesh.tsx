function MeshBackground() {
  const dots = [
    { top: "82%", left: "15%", size: 3 },
    { top: "68%", left: "55%", size: 2 },
    { top: "92%", left: "75%", size: 4 },
    { top: "58%", left: "30%", size: 2 },
    { top: "76%", left: "88%", size: 3 },
    { top: "95%", left: "42%", size: 3 },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black perspective-[700px]">
      <div
        className="absolute left-1/2 bottom-0 w-[200%] h-[80%] -translate-x-1/2 origin-bottom transform-[rotateX(55deg)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to top, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "linear-gradient(to top, black 20%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 90%)",
        }}
      />
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#FF641F]"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            boxShadow: `0 0 ${d.size * 3}px ${d.size}px rgba(255,79,0,0.5)`,
          }}
        />
      ))}
    </div>
  );
}

export default MeshBackground;