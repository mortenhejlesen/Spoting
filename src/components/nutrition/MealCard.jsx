import React, { useState } from 'react';
import { Clock, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export default function MealCard({ meal, showMacros = false, onComplete }) {
  const [expanded, setExpanded] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { actions } = useApp();

  if (!meal) return null;

  const handleComplete = () => {
    setCompleted(true);
    actions.addNutritionLog({
      date: new Date().toISOString(),
      mealId: meal.id,
      timing: meal.timing,
      completed: true,
    });
    onComplete?.();
  };

  const categoryColors = {
    'pre-training': 'border-accent-violet/30 bg-accent-violet/5',
    'pre-match': 'border-sport-tennis/30 bg-sport-tennis/5',
    'post-training': 'border-accent-teal/30 bg-accent-teal/5',
    'anti-inflammatory': 'border-accent-green/30 bg-accent-green/5',
    'tournament': 'border-accent-orange/30 bg-accent-orange/5',
    'rest-day': 'border-gray-500/30 bg-gray-500/5',
  };

  const borderClass = categoryColors[meal.category] || 'border-white/10 bg-bg-card';

  return (
    <div className={`rounded-card border overflow-hidden ${borderClass} ${completed ? 'opacity-70' : ''}`}>
      <div
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={12} className="text-text-secondary flex-shrink-0" />
              <span className="text-xs text-text-secondary">{meal.timing}</span>
            </div>
            <h3 className="font-semibold text-text-primary text-sm leading-tight">{meal.name}</h3>
            {meal.whyItWorks && (
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">{meal.whyItWorks}</p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {completed && (
              <div className="w-6 h-6 rounded-full bg-accent-green flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
            )}
            {expanded ? <ChevronUp size={16} className="text-text-secondary" /> : <ChevronDown size={16} className="text-text-secondary" />}
          </div>
        </div>

        {showMacros && meal.macros && (
          <div className="flex gap-4 mt-3 pt-3 border-t border-white/5">
            <div className="text-center">
              <div className="text-sm font-bold font-mono text-text-primary">{meal.macros.calories}</div>
              <div className="text-[10px] text-text-secondary">kcal</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold font-mono text-accent-teal">{meal.macros.protein}g</div>
              <div className="text-[10px] text-text-secondary">protein</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold font-mono text-sport-tennis">{meal.macros.carbs}g</div>
              <div className="text-[10px] text-text-secondary">carbs</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold font-mono text-accent-orange">{meal.macros.fat}g</div>
              <div className="text-[10px] text-text-secondary">fat</div>
            </div>
          </div>
        )}
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-3">
          {meal.ingredients?.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Ingredients</h4>
              <ul className="space-y-1">
                {meal.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-violet flex-shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {meal.prepTime && (
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-text-secondary" />
              <span className="text-xs text-text-secondary">Prep time: <span className="text-text-primary">{meal.prepTime}</span></span>
            </div>
          )}

          {meal.dietaryTags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {meal.dietaryTags.map(tag => (
                <span key={tag} className="text-[10px] bg-bg-elevated text-text-secondary px-2 py-0.5 rounded-full capitalize">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {!completed && (
            <button
              onClick={handleComplete}
              className="w-full py-2.5 bg-accent-teal/10 border border-accent-teal/30 text-accent-teal text-sm font-semibold rounded-lg hover:bg-accent-teal/20 transition-colors flex items-center justify-center gap-2"
            >
              <Check size={15} />
              Mark as Eaten
            </button>
          )}
        </div>
      )}
    </div>
  );
}
