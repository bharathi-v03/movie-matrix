export default function TitleComponent({ title }: { title: string }) {
  return (
    <h2
      className="
        mb-6
        flex items-center
        gap-2
        text-3xl
        font-bold
      "
    >
      <span className="h-8 w-1 rounded-full bg-red-500" />
      {title}
    </h2>
  );
}
