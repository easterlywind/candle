import React from 'react';

export interface StepItem {
  id: number;
  title: string;
  shortTitle?: string;
}

interface StepIndicatorProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
  className = '',
}) => {
  const progressPercent = steps.length > 1
    ? Math.round(((currentStep - 1) / (steps.length - 1)) * 100)
    : 100;

  const activeStep = steps.find((s) => s.id === currentStep) || steps[0];

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Top Header: Step counter & Active Step Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] uppercase tracking-wider font-bold bg-charcoal text-alabaster px-2.5 py-0.5 rounded-full">
            Bước {currentStep} / {steps.length}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-charcoal truncate">
            {activeStep.title}
          </span>
        </div>
        <span className="text-xs text-muted font-medium hidden sm:inline">
          {progressPercent}% hoàn thành
        </span>
      </div>

      {/* Progress Bar Line */}
      <div className="relative w-full h-1.5 bg-stonewarm/60 rounded-full overflow-hidden">
        <div
          className="h-full bg-charcoal rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step Buttons (Breadcrumb navigation) */}
      <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
        {steps.map((step) => {
          const isDone = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick(step.id)}
              className={`flex items-center space-x-1.5 py-1 px-2 sm:px-2.5 rounded-lg text-xs font-medium transition cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-charcoal text-alabaster shadow-xs'
                  : isDone
                  ? 'bg-oat text-charcoal hover:bg-stonewarm/80'
                  : 'text-muted/70 hover:text-charcoal bg-transparent'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  isActive
                    ? 'bg-alabaster text-charcoal'
                    : isDone
                    ? 'bg-sage/20 text-sage'
                    : 'bg-stonewarm/60 text-muted'
                }`}
              >
                {isDone ? '✓' : step.id}
              </span>
              <span className="hidden md:inline whitespace-nowrap">
                {step.shortTitle || step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
