import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { RaspberryLogo } from './RaspberryLogo';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Flexbox by Malynivka:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080a0f] text-slate-100 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/30 text-center space-y-5 shadow-2xl">
            <div className="flex justify-center">
              <RaspberryLogo size="lg" />
            </div>

            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Сталася тимчасова помилка</h2>
              <p className="text-xs text-slate-400">
                Додаток зіткнувся з непередбачуваним збоєм у браузері. Натисніть кнопку нижче, щоб оновити сторінку.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-black/50 p-3 rounded-xl border border-white/10 text-left overflow-x-auto text-[11px] font-mono text-rose-300">
                {this.state.error.message || 'Unknown error'}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-lg shadow-rose-500/30 active:scale-95 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Оновити сторінку</span>
              </button>

              <button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium active:scale-95 transition-all"
              >
                <span>Очистити кеш</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
