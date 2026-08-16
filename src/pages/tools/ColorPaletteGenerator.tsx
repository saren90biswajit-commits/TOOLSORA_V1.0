import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Lock, Unlock, Download, Check } from "lucide-react";

interface Color {
  hex: string;
  locked: boolean;
}

const generateRandomHex = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` 
    : "rgb(0, 0, 0)";
};

export function ColorPaletteGenerator() {
  const [colors, setColors] = useState<Color[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const initPalette = () => {
    setColors(Array(5).fill(null).map(() => ({ hex: generateRandomHex(), locked: false })));
  };

  useEffect(() => {
    initPalette();
  }, []);

  const generatePalette = () => {
    setColors(prev => prev.map(color => color.locked ? color : { hex: generateRandomHex(), locked: false }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        generatePalette();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleLock = (index: number) => {
    const newColors = [...colors];
    newColors[index].locked = !newColors[index].locked;
    setColors(newColors);
  };

  const setSpecificColor = (index: number, hex: string) => {
    const newColors = [...colors];
    newColors[index].hex = hex;
    setColors(newColors);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const exportCSS = () => {
    const cssVars = colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join("\n");
    const cssContent = `:root {\n${cssVars}\n}`;
    navigator.clipboard.writeText(cssContent);
    alert("CSS variables copied to clipboard!");
  };

  return (
    <ToolLayout
      title="Color Palette Generator"
      description="Create beautiful brand color combinations for your digital content and websites."
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-900">Controls</h3>
            <p className="text-sm text-slate-500 mb-4">
              Press spacebar or the generate button to create new colors. Lock colors you want to keep.
            </p>
            <Button onClick={generatePalette} size="lg" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Generate Palette
            </Button>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">Export</h3>
            <Button variant="outline" onClick={exportCSS} className="w-full">
              <Download className="mr-2 h-4 w-4" /> Export as CSS Variables
            </Button>
          </div>
        </div>
      }
      results={
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row h-auto md:h-[500px]">
          {colors.map((color, index) => (
            <div 
              key={index} 
              className="flex-1 flex flex-col transition-all duration-300 relative group min-h-[120px]"
              style={{ backgroundColor: color.hex }}
            >
              <div className="mt-auto md:mt-0 md:absolute md:bottom-8 w-full flex flex-col items-center justify-center p-4 bg-black/0 group-hover:bg-black/10 transition-colors">
                
                <div className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-3 w-full max-w-[120px]">
                  
                  <button 
                    onClick={() => toggleLock(index)}
                    className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-slate-900 transition-colors mb-2"
                  >
                    {color.locked ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
                  </button>

                  <div className="w-full relative">
                    <Input 
                      type="color" 
                      value={color.hex} 
                      onChange={(e) => setSpecificColor(index, e.target.value.toUpperCase())}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                    />
                    <div className="bg-white px-3 py-2 rounded-lg font-mono text-sm text-center shadow-sm w-full font-bold cursor-pointer hover:bg-slate-50 flex items-center justify-center">
                      {color.hex}
                    </div>
                  </div>

                  <button 
                    onClick={() => copyToClipboard(color.hex, index)}
                    className="bg-white/90 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm hover:bg-white flex items-center justify-center w-full"
                  >
                    {copiedIndex === index ? (
                      <><Check className="h-3 w-3 mr-1 text-green-600" /> Copied</>
                    ) : (
                      <><Copy className="h-3 w-3 mr-1" /> Copy</>
                    )}
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
}
