// ...existing imports...
import { CanvasProvider } from '../../../hooks/useCanvasHook';

export default function DesignLayout({ children }) {
  return (
    <CanvasProvider>
      {children}
    </CanvasProvider>
  );
}
