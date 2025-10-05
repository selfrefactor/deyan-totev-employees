import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { clsx } from './utils'

export function ToggleButton(input: any) {
  return (
    <div className='flex items-center space-x-2' onClick={input.onChange}>
      <Switch id={input.label} />
      <Label
        htmlFor={input.label}
        className={clsx({
          'line-through': !input.checked,
        })}
      >
        {input.label}
      </Label>
    </div>
  )
}
