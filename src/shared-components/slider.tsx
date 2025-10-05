import { Slider as SliderPrimitive } from './ui/slider'

export function Slider(input: {
  label: string
  max: number
  min: number
  onValueChange: (value: number) => void
  step: number
  value: number
}) {
  const onChange = (value: number[])=> {
    input.onValueChange(value[0])
  }
  return (
    <div className='w-full text-center flex flex-col gap-4'>
      <label className='text-sm font-medium text-gray-700'>
        {input.label}
        <span className='text-xs pl-8 text-gray-500'>{input.value}</span>
      </label>

      <SliderPrimitive
        max={input.max}
        min={input.min}
        onValueChange={onChange}
        step={input.step}
        value={[input.value]}
      />
    </div>
  )
}
