export function Badge({ value }: { value: string }) {
  return (
    <div className='inline-flex center-text items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-secondary-foreground hover:bg-secondary/80'>
      {value}
    </div>
  )
}
