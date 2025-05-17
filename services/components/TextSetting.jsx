import React from 'react'
import { useCanvasHook } from '../../hooks';
import { IText } from 'fabric';
import TextSettingNavBar from './TextSettingNavBar';

function TextSetting() {
    const { CanvasEditorStore } = useCanvasHook();
    
    // Setup text wrapping functionality with enhanced Canva-like behavior
    const setupTextWrapping = (textObj) => {
        // Base width for text wrapping - will be adjusted based on font size
        const baseMaxWidth = 300;
        
        // Calculate appropriate width based on font size
        // Larger fonts need more space to remain readable
        const fontSizeMultiplier = Math.max(1, textObj.fontSize / 20); // 20 is considered a base size
        const maxWidth = Math.min(baseMaxWidth * fontSizeMultiplier, 500); // Upper limit to prevent excessive width
        
        // Configure text object for proper multi-line wrapping
        textObj.set({
            width: maxWidth,
            textAlign: 'left',
            splitByGrapheme: false,
            lockScalingX: true,
            cornerSize: 8,
            transparentCorners: false
        });
        
        // Add event listener for font size changes
        textObj.on('modified', function() {
            updateTextWrapBasedOnFontSize(textObj);
            CanvasEditorStore.renderAll();
        });
        
        // Add event listener to maintain proper text wrapping when editing
        textObj.on('changed', function() {
            updateTextWrapBasedOnFontSize(textObj);
            CanvasEditorStore.renderAll();
        });
        
        return textObj;
    }
    
    // Helper function to update text wrapping based on current font size
    const updateTextWrapBasedOnFontSize = (textObj) => {
        const text = textObj.text;
        const fontSize = textObj.fontSize;
        const baseMaxWidth = 300;
        
        // Recalculate width based on current font size
        const updatedFontSizeMultiplier = Math.max(1, fontSize / 20);
        const updatedMaxWidth = Math.min(baseMaxWidth * updatedFontSizeMultiplier, 500);
        
        // If text is short, make width proportional to text length
        const estimatedTextWidth = text.length * fontSize * 0.6; // Rough estimate
        const appropriateWidth = Math.min(updatedMaxWidth, Math.max(100, estimatedTextWidth));
        
        // Apply the calculated width
        textObj.set({
            width: text.length > 15 ? updatedMaxWidth : appropriateWidth
        });
    }
    
    const onAddTextClick = (type) => {
        if(CanvasEditorStore){
            if(type === 'Heading'){
                const textRef = new IText('Add Heading',{
                    fontSize: 30,
                    fontWeight: 'bold',
                    fill: '#000000',
                    fontFamily: 'Arial',
                });
                
                setupTextWrapping(textRef);
                CanvasEditorStore.add(textRef);
        
            }else if(type === 'SubHeading'){
                const textRef = new IText('Add SubHeading',{
                    fontSize: 20,
                    fontWeight: 400,
                    fill: '#000000',
                    fontFamily: 'Arial',
                    left: 100,
                    top: 100,
                });
                setupTextWrapping(textRef);
                CanvasEditorStore.add(textRef);
            }else if(type === 'Paragraph'){
                const textRef = new IText('Add Paragraph',{
                    fontSize: 13,
                    fontWeight: 'normal',
                    fill: '#000000',
                    fontFamily: 'Arial',
                    left: 100,
                    top: 100,
                });
                setupTextWrapping(textRef);
                CanvasEditorStore.add(textRef);
                CanvasEditorStore.renderAll();
            }
        }
    }
    
  return (
    <div className='flex flex-col gap-4'>
        <div className="mb-4">
            <TextSettingNavBar />
        </div>
        <h2 className='font-bold text-2xl p-3 bg-gray-300 rounded-2xl cursor-pointer'
        onClick={()=>onAddTextClick('Heading')}>Add Heading</h2>
        <h2 className='font-bold text-2xl p-3 bg-gray-300 rounded-2xl cursor-pointer mt-3'
        onClick={()=>onAddTextClick('SubHeading')}>Add SubHeading</h2>
        <h2 className='font-bold text-2xl p-3 bg-gray-300 rounded-2xl cursor-pointer mt-3'
        onClick={()=>onAddTextClick('Paragraph')}>Paragraph</h2>
    </div>
  )
}

export default TextSetting