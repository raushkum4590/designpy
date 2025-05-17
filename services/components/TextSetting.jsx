import React from 'react'
import { useCanvasHook } from '../../hooks';
import { Textbox } from 'fabric'; // Use Textbox instead of IText for better text wrapping
import TextSettingNavBar from './TextSettingNavBar';

function TextSetting() {
    const { CanvasEditorStore } = useCanvasHook();
    
    // Setup text wrapping functionality with enhanced Canva-like behavior
    const setupTextWrapping = (textObj) => {
        // Use an even smaller width - this is key for forcing wrapping
        const baseMaxWidth = 150; 
        
        // Configure text object for proper multi-line wrapping
        textObj.set({
            width: baseMaxWidth,
            textAlign: 'left',
            splitByGrapheme: false,
            lockScalingX: false,
            cornerSize: 8,
            transparentCorners: false,
            lineHeight: 1.3,
            charSpacing: 0,
            breakWords: true,
            editable: true,
            // Critical properties for wrapping
            wrapText: true,
            fixedWidth: true,
            lockUniScaling: false
        });
        
        // Insert manual line breaks for longer text
        const text = textObj.text;
        if (text.length > 15) {
            const words = text.split(' ');
            let newText = '';
            let lineLength = 0;
            
            words.forEach(word => {
                if (lineLength + word.length > 15) {
                    newText += '\n' + word + ' ';
                    lineLength = word.length + 1;
                } else {
                    newText += word + ' ';
                    lineLength += word.length + 1;
                }
            });
            
            textObj.set({ text: newText.trim() });
        }
        
        return textObj;
    }
    
    const onAddTextClick = (type) => {
        if(CanvasEditorStore){
            if(type === 'Heading'){
                // Use Textbox instead of IText for better wrapping
                const textRef = new Textbox('Add Heading', {
                    fontSize: 30,
                    fontWeight: 'bold',
                    fill: '#000000',
                    fontFamily: 'Arial',
                    width: 150, // Start with a narrow width
                });
                
                setupTextWrapping(textRef);
                CanvasEditorStore.add(textRef);
        
            } else if(type === 'SubHeading'){
                const textRef = new Textbox('Add SubHeading', {
                    fontSize: 20,
                    fontWeight: 400,
                    fill: '#000000',
                    fontFamily: 'Arial',
                    left: 100,
                    top: 100,
                    width: 150, // Start with a narrow width
                });
                setupTextWrapping(textRef);
                CanvasEditorStore.add(textRef);
            } else if(type === 'Paragraph'){
                const textRef = new Textbox('Add Paragraph Text Here. This is a longer text to demonstrate multi-line wrapping.', {
                    fontSize: 13,
                    fontWeight: 'normal',
                    fill: '#000000',
                    fontFamily: 'Arial',
                    left: 100,
                    top: 100,
                    width: 150, // Start with a narrow width
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