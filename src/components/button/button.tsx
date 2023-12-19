import { QRL, component$, useVisibleTask$ } from "@builder.io/qwik";

interface ButtonProps {
  color: string;
  changeColor: QRL<(event: any) => void>;
}

export const ColorPicker = component$<ButtonProps>(({color, changeColor}) => {
  return (
    <button 
      onClick$={changeColor} 
      data-color={color} 
      id="colorPicker" 
      class="rounded-[50%] w-8 h-8 border-black border"
      style={`background-color: ${color};`}  
    />
  )
})
