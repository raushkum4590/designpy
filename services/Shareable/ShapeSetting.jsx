import React from "react";
import { shapesSettingsList } from "../option";
import { ShapesIcon, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./../../@/components/ui/popover";
import { useCanvasHook } from '../../hooks/useCanvasHook';

function ShapeSetting() {
    const { CanvasEditorStore } = useCanvasHook();
    const onDelete = () => {
        const activeObject = CanvasEditorStore.getActiveObject();
        if (activeObject) {
            CanvasEditorStore.remove(activeObject);
            CanvasEditorStore.renderAll();
          
        }
    }
  return (
    <div className="flex flex-wrap items-center gap-4 p-3 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
      {shapesSettingsList.map((shape, index) => (
        <div
          key={index}
          className="flex items-center justify-center hover:scale-110 hover:shadow-md transition-all duration-200 cursor-pointer p-2.5 border border-gray-200 rounded-xl bg-white"
        >
          <Popover>
            <PopoverTrigger asChild>
              <div className="text-gray-700 hover:text-blue-600">
                <shape.icon strokeWidth={1.5} size={20} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3 shadow-lg">
              {shape.component}
            </PopoverContent>
          </Popover>
        </div>
      ))}
      <div className="flex items-center justify-center hover:scale-110 hover:shadow-md transition-all duration-200 cursor-pointer p-2.5 border border-red-200 rounded-xl bg-white ml-auto">
        <Trash onClick={onDelete} strokeWidth={1.5} size={20} className="text-red-500 hover:text-red-600" />
      </div>
    </div>
  );
}

export default ShapeSetting;
